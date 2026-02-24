"use client";

import { useState, useEffect } from "react";
import styles from "./TypingText.module.css";

export default function TypingText({ text, speed = 80, startDelay = 500 }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout;
    let i = 0;

    timeout = setTimeout(function type() {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
        timeout = setTimeout(type, speed);
      } else {
        setDone(true);
      }
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return (
    <span className={styles.wrapper}>
      {displayed}
      <span className={`${styles.cursor} ${done ? styles.cursorBlink : ""}`}>
        |
      </span>
    </span>
  );
}
