import React, { useState } from "react";
import { getRandomQuestions } from "../data/questions";

const LETTERS = ["A", "B", "C", "D"];

const styles = {
  wrap:    { padding: "24px", maxWidth: "780px", margin: "0 auto" },
  header:  { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" },
  headerLabel: { fontSize: "13px", fontWeight: 500 },
  progressTrack: {
    flex: 1, height: "6px", background: "#ede9fe",
    borderRadius: "10px", margin: "0 16px", overflow: "hidden",
  },
  progressFill: (pct) => ({
    height: "100%", background: "#7c3aed",
    borderRadius: "10px", width: `${pct}%`, transition: "width 0.4s ease",
  }),
  counter: { fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#6b7280", whiteSpace: "nowrap" },
  typeBadge: {
    display: "inline-block", fontSize: "11px", padding: "4px 12px",
    borderRadius: "20px", background: "#ede9fe", color: "#7c3aed", marginBottom: "12px",
  },
  question: { fontSize: "17px", fontWeight: 500, lineHeight: 1.5, marginBottom: "24px", color: "#1a1a2e" },
  options: { display: "flex", flexDirection: "column", gap: "10px" },
  option: (state) => ({
    background: state === "correct" ? "#d1fae5" : state === "wrong" ? "#fee2e2" : state === "selected" ? "#ede9fe" : "#ffffff",
    border: state === "correct" ? "1.5px solid #059669" : state === "wrong" ? "1.5px solid #dc2626" : state === "selected" ? "1.5px solid #7c3aed" : "1.5px solid rgba(124,58,237,0.15)",
    borderRadius: "12px", padding: "14px 18px", cursor: "pointer",
    fontFamily: "'Sora', sans-serif", fontSize: "14px",
    color: state === "correct" ? "#065f46" : state === "wrong" ? "#991b1b" : state === "selected" ? "#7c3aed" : "#1a1a2e",
    textAlign: "left", display: "flex", alignItems: "center", gap: "12px", transition: "all 0.2s",
  }),
  letter: (state) => ({
    width: "26px", height: "26px", borderRadius: "50%",
    background: state === "selected" ? "#7c3aed" : "#ede9fe",
    color: state === "selected" ? "#ffffff" : "#7c3aed",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", fontWeight: 600, flexShrink: 0, transition: "all 0.2s",
  }),
  actions: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px" },
  skipBtn: {
    background: "none", border: "none", color: "#6b7280",
    fontFamily: "'Sora', sans-serif", fontSize: "13px",
    cursor: "pointer", padding: "8px 12px", borderRadius: "8px",
  },
  nameInput: {
    width: "100%", padding: "10px 14px", borderRadius: "10px",
    border: "1px solid rgba(124,58,237,0.15)",
    fontFamily: "'Sora', sans-serif", fontSize: "14px",
    marginBottom: "16px", outline: "none",
  },
  doneWrap: { textAlign: "center", padding: "40px 20px" },
  doneEmoji: { fontSize: "48px", marginBottom: "16px" },
  doneTitle: { fontSize: "18px", fontWeight: 600, marginBottom: "8px" },
  doneSub:   { fontSize: "14px", color: "#6b7280", marginBottom: "24px" },
  loadingWrap: { textAlign: "center", padding: "40px 20px" },
};

export default function Quiz({ onNavigate, user, onQuizDone }) {
  const [questions]     = useState(() => getRandomQuestions(5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected]         = useState(null);
  const [answers, setAnswers]           = useState([]);
  const [finished, setFinished]         = useState(false);
  const [loading, setLoading]           = useState(false);
  const [name, setName]                 = useState(user ? user.name : "");
  const [nameEntered, setNameEntered]   = useState(user ? true : false);

  const q        = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  function handleSelect(idx) {
    if (selected !== null) return;
    setSelected(idx);
  }

  async function submitToBackend(finalAnswers) {
    setLoading(true);
    try {
      const response = await fetch("https://cognitive-twin-s56q.onrender.com/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: user ? user.name : name, answers: finalAnswers }),
      });
      const data = await response.json();
      if (onQuizDone) onQuizDone(data.profile);
      setLoading(false);
      setFinished(true);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
      setFinished(true);
    }
  }

  function handleNext() {
    const isCorrect  = selected === q.correct ? 1 : 0;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    if (currentIndex + 1 >= questions.length) {
      submitToBackend(newAnswers);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelected(null);
  }

  function optionState(idx) {
    if (selected === null) return "default";
    if (idx === q.correct) return "correct";
    if (idx === selected)  return "wrong";
    return "default";
  }

  if (!nameEntered) {
    return (
      <div className="page-enter" style={styles.wrap}>
        <div className="card" style={{ marginTop: "40px" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>👋</div>
          <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>What is your name?</div>
          <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>We will save your results!</div>
          <input
            style={styles.nameInput}
            placeholder="Type your name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="btn-primary"
            onClick={() => { if (name.trim()) setNameEntered(true); }}
            disabled={!name.trim()}
            style={{ opacity: name.trim() ? 1 : 0.4 }}
          >
            Start Quiz →
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-enter" style={styles.loadingWrap}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
        <div style={{ fontSize: "18px", fontWeight: 600 }}>Analyzing your profile...</div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="page-enter" style={styles.wrap}>
        <div style={styles.doneWrap}>
          <div style={styles.doneEmoji}>✅</div>
          <div style={styles.doneTitle}>Quiz Complete, {name}!</div>
          <div style={styles.doneSub}>Your cognitive profile has been saved!</div>
          <button className="btn-primary" onClick={() => onNavigate("results")}>
            See My Results →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={styles.wrap}>
      <div style={styles.header}>
        <span style={styles.headerLabel}>Hey {name}!</span>
        <div style={styles.progressTrack}>
          <div style={styles.progressFill(progress)} />
        </div>
        <span style={styles.counter}>{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className="card" style={{ marginBottom: 0 }}>
        <div style={styles.typeBadge}>{q.type}</div>
        <div style={styles.question}>{q.question}</div>

        <div style={styles.options}>
          {q.options.map((opt, idx) => {
            const state = selected !== null ? optionState(idx) : "default";
            return (
              <button
                key={idx}
                style={styles.option(selected !== null ? state : selected === idx ? "selected" : "default")}
                onClick={() => handleSelect(idx)}
              >
                <div style={styles.letter(selected === idx ? "selected" : "default")}>
                  {LETTERS[idx]}
                </div>
                {opt}
              </button>
            );
          })}
        </div>

        <div style={styles.actions}>
          <button style={styles.skipBtn} onClick={handleNext}>Skip →</button>
          <button
            className="btn-primary"
            onClick={handleNext}
            disabled={selected === null}
            style={{ opacity: selected === null ? 0.4 : 1 }}
          >
            {currentIndex + 1 === questions.length ? "Finish Quiz ✓" : "Next Question →"}
          </button>
        </div>
      </div>
    </div>
  );
}