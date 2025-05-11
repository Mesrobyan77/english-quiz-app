import React, { useState } from "react";
import styles from "./WordInput.module.scss";
import { nanoid } from "nanoid";

const WordInput = () => {
  const [english, setEnglish] = useState("");
  const [translated, setTranslated] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAdd = () => {
    if (!english.trim() || !translated.trim()) {
      setError("Please enter both English and Armenian words.");
      setSuccess("");
      return;
    }
    setError("");
    const newEntry = { id: nanoid(), english: english.trim(), translated: translated.trim() };
    const existing = JSON.parse(localStorage.getItem("words") || "[]");
    localStorage.setItem("words", JSON.stringify([...existing, newEntry]));
    setSuccess("Word added successfully!");
    setEnglish("");
    setTranslated("");
    setTimeout(() => setSuccess(""), 2000); // Clear success message after 2s
  };

  return (
    <div className={styles.container}>
      <h1>Add New Word</h1>
      <input
        type="text"
        placeholder="English word"
        value={english}
        onChange={(e) => setEnglish(e.target.value)}
        className={styles.input}
        aria-label="English word"
      />
      <input
        type="text"
        placeholder="Armenian translation"
        value={translated}
        onChange={(e) => setTranslated(e.target.value)}
        className={styles.input}
        aria-label="Armenian translation"
      />
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <button onClick={handleAdd} className={styles.button}>
        Add Word
      </button>
    </div>
  );
};

export default WordInput;