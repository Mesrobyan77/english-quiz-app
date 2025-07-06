import { useState, useEffect } from "react";
import styles from "./Quiz.module.scss";
import confetti from "canvas-confetti";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Quiz = () => {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [direction, setDirection] = useState("en-hy");
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState("");
  const [isVoiceLoaded, setIsVoiceLoaded] = useState(false);

  useEffect(() => {
    const storedWords = JSON.parse(localStorage.getItem("words") || "[]");
    const storedRate = parseFloat(localStorage.getItem("speechRate")) || 1;
    const storedVoiceURI = localStorage.getItem("selectedVoiceURI") || "";

    setWords(storedWords);
    setRate(storedRate);
    setSelectedVoiceURI(storedVoiceURI);

    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);

      if (storedVoiceURI === "") {
        const defaultVoice = availableVoices.find(
          (voice) => voice.name === "Google UK English Male"
        );
        if (defaultVoice) {
          setSelectedVoiceURI(defaultVoice.voiceURI);
        } else if (availableVoices.length > 0) {
          setSelectedVoiceURI(availableVoices[0].voiceURI);
        }
      }
      setIsVoiceLoaded(true);
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    loadVoices();

    if (storedWords.length > 0) {
      selectRandomWord(storedWords, null);
    }
  }, []);

  const selectRandomWord = (wordList, previousWord) => {
    if (wordList.length === 0) return;

    let newWord;
    do {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      newWord = wordList[randomIndex];
    } while (
      previousWord &&
      wordList.length > 1 &&
      newWord.id === previousWord.id
    );

    setCurrentWord(newWord);
    setUserInput("");
    setFeedback("");
    setIsCorrect(false);
  };

  const speakWord = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(
      direction === "en-hy" ? currentWord.english : currentWord.translated
    );
    utterance.lang = direction === "en-hy" ? "en-US" : "hy-AM";
    utterance.rate = rate;

    const voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
    if (voice) {
      utterance.voice = voice;
    }

    synth.speak(utterance);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentWord) return;

    const correctAnswer =
      direction === "en-hy"
        ? currentWord.translated.toLowerCase()
        : currentWord.english.toLowerCase();

    const isAnswerCorrect = userInput.trim().toLowerCase() === correctAnswer;
    setFeedback(isAnswerCorrect ? "Congratulations!" : "Incorrect. Try again!");
    setIsCorrect(isAnswerCorrect);

    const audio = new Audio(
      isAnswerCorrect ? "/sounds/correct.mp3" : "/sounds/incorrect.mp3"
    );
    audio.play();

    if (isAnswerCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setRate(newRate);
    localStorage.setItem("speechRate", newRate);
  };

  const handleVoiceChange = (e) => {
    const newVoiceURI = e.target.value;
    setSelectedVoiceURI(newVoiceURI);
    localStorage.setItem("selectedVoiceURI", newVoiceURI);
  };

  const handleWordClick = () => {
    setDirection((prev) => (prev === "en-hy" ? "hy-en" : "en-hy"));
  };

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesOptions = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    detectRetina: true,
  };

  if (words.length === 0) {
    return (
      <p className={styles.noWords}>
        No words available. Please add some words first.
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <Particles
        className={styles.particles}
        init={particlesInit}
        options={particlesOptions}
      />
      <h2 className="text-2xl font-bold mb-4">Translation Quiz</h2>

      <div className={styles.directionSelector}>
        <label>Direction: </label>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className={styles.select}
        >
          <option value="en-hy">English ➜ Armenian</option>
          <option value="hy-en">Armenian ➜ English</option>
        </select>
      </div>

      <div className={styles.rateSelector}>
        <label>Speech Rate: </label>
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
          className={styles.rangeInput}
        />
        <span>{rate.toFixed(1)}</span>
      </div>

      {isVoiceLoaded && (
        <div className={styles.voiceSelector}>
          <label>Voice: </label>
          <select
            value={selectedVoiceURI}
            onChange={handleVoiceChange}
            className={styles.select}
          >
            {voices.map((voice) => (
              <option
                key={`${voice.name}-${voice.voiceURI}`}
                value={voice.voiceURI}
              >
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      )}

      {currentWord && (
        <>
          <div className={styles.wordContainer}>
            <p
              className={styles.word}
              onClick={handleWordClick}
              title="Click to switch language direction"
            >
              {direction === "en-hy"
                ? `English: ${currentWord.english}`
                : `Armenian: ${currentWord.translated}`}
            </p>

            {direction === "hy-en" ? null : (
              <i
                className={`fas fa-volume-up ${styles.speakerIcon}`}
                onClick={speakWord}
                aria-label="Listen to word"
                title="Listen to word"
              ></i>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder={
                direction === "en-hy"
                  ? "Enter Armenian translation"
                  : "Enter English translation"
              }
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className={`${styles.input} ${isCorrect ? styles.correct : ""}`}
            />
            <button type="submit" className={styles.button}>
              Check
            </button>
          </form>

          {feedback && (
            <p
              className={`${styles.feedback} ${
                isCorrect ? styles.congratulations : ""
              }`}
            >
              {feedback}
            </p>
          )}

          <button
            onClick={() => selectRandomWord(words, currentWord)}
            className={styles.nextButton}
          >
            Next Word
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
