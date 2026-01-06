"use client";

import { useState } from "react";
import styles from "./AiCookingHelper.module.css";

export default function AiCookingHelper({ recipe }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/genai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe, question }),
      });

      const data = await res.json();
      setAnswer(data.answer || "No response from AI.");
    } catch (error) {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🍳 Ask AI Cooking Assistant</h3>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="e.g. Can I use chicken instead of beef?"
        className={styles.input}
      />

      <button
        onClick={askAI}
        className={styles.button}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {loading && <p className={styles.loading}>AI is thinking...</p>}

      {answer && (
        <div className={styles.answerBox}>
          <p className={styles.answerText}>{answer}</p>
        </div>
      )}
    </div>
  );
}
