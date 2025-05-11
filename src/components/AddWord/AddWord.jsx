import React, { useState } from "react";
import styles from "./AddWord.module.scss";
import { nanoid } from "nanoid";

const AddWord = () => {
  const [english, setEnglish] = useState("");
  const [translated, setTranslated] = useState("");

  const handleAdd = () => {
    if (!english || !translated) return;
    const newEntry = { id: nanoid(), english, translated };
    const existing = JSON.parse(localStorage.getItem("words")) || [];
    localStorage.setItem("words", JSON.stringify([...existing, newEntry]));
    setEnglish("");
    setTranslated("");
  };

  return (
    <div className={styles.container}>
      <h1>Add Word</h1>
      <input
        type="text"
        placeholder="English"
        value={english}
        onChange={(e) => setEnglish(e.target.value)}
      />
      <input
        type="text"
        placeholder="Translation"
        value={translated}
        onChange={(e) => setTranslated(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddWord;
