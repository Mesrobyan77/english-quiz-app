import { useEffect, useState } from "react";
import styles from "./WordList.module.scss";

const WordList = () => {
  const [words, setWords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedEnglish, setEditedEnglish] = useState("");
  const [editedTranslated, setEditedTranslated] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("words") || "[]");
    setWords(stored);
  }, []);

  const deleteWord = (id) => {
    const filtered = words.filter((word) => word.id !== id);
    setWords(filtered);
    localStorage.setItem("words", JSON.stringify(filtered));
  };

  const startEdit = (word) => {
    setEditingId(word.id);
    setEditedEnglish(word.english);
    setEditedTranslated(word.translated);
  };

  const saveEdit = (id) => {
    const updated = words.map((word) =>
      word.id === id
        ? { ...word, english: editedEnglish, translated: editedTranslated }
        : word,
    );
    setWords(updated);
    localStorage.setItem("words", JSON.stringify(updated));
    setEditingId(null);
  };

  return (
    <div className={styles.container}>
      <h2>Your Words</h2>
      {words.length === 0 ? (
        <p>No words added yet.</p>
      ) : (
        <ul className={styles.wordList}>
          {words.map((word) => (
            <li key={word.id} className={styles.wordItem}>
              {editingId === word.id ? (
                <>
                  <input
                    type="text"
                    value={editedEnglish}
                    onChange={(e) => setEditedEnglish(e.target.value)}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    value={editedTranslated}
                    onChange={(e) => setEditedTranslated(e.target.value)}
                    className={styles.input}
                  />
                  <button
                    onClick={() => saveEdit(word.id)}
                    className={styles.saveBtn}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>
                    <strong>{word.english}</strong> — {word.translated}
                  </span>
                  <div className={styles.actions}>
                    <button
                      onClick={() => startEdit(word)}
                      className={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteWord(word.id)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WordList;
