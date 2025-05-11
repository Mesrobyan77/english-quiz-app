import { useState } from "react";
import { nanoid } from "nanoid";
import styles from "./WordInput.module.scss";

const WordInput = () => {
  const [english, setEnglish] = useState("");
  const [translated, setTranslated] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!english || !translated) {
      setMessage("Please fill in both fields.");
      return;
    }

    const wordPair = { id: nanoid(), english, translated };
    const storedWords = JSON.parse(localStorage.getItem("words") || "[]");
    storedWords.push(wordPair);
    localStorage.setItem("words", JSON.stringify(storedWords));

    setEnglish("");
    setTranslated("");
    setMessage("Word pair saved!");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className={styles.container}>
      <h2 className="text-2xl font-bold mb-4">Add Word Pair</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="English word"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Translated word"
          value={translated}
          onChange={(e) => setTranslated(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Save
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default WordInput;
