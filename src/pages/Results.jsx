import React, { useState, useEffect } from "react";
import CogBar from "../components/CogBar";

const styles = {
  wrap: { padding: "24px", maxWidth: "780px", margin: "0 auto" },
  header: { textAlign: "center", padding: "32px 24px 24px" },
  emoji: { fontSize: "48px", marginBottom: "12px" },
  title: { fontSize: "22px", fontWeight: 600, marginBottom: "8px" },
  sub:   { color: "#6b7280", fontSize: "14px", lineHeight: 1.6 },
  profileCard: {
    background: "linear-gradient(135deg, #1a1a2e, #312e81)",
    color: "#fff",
    borderRadius: "14px",
    padding: "24px",
    textAlign: "center",
    marginBottom: "16px",
  },
  profileLabel: {
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#a78bfa",
    marginBottom: "8px",
    fontFamily: "'Space Mono', monospace",
  },
  profileName: { fontSize: "24px", fontWeight: 600, marginBottom: "8px" },
  profileDesc: { fontSize: "13px", color: "#9ca3af", lineHeight: 1.5 },
  recoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "16px",
  },
  recoCard: {
    background: "#ffffff",
    border: "1px solid rgba(124,58,237,0.15)",
    borderRadius: "12px",
    padding: "16px",
  },
  recoIcon:  { fontSize: "20px", marginBottom: "8px" },
  recoTitle: { fontSize: "13px", fontWeight: 600, marginBottom: "8px" },
  recoList:  { listStyle: "none" },
  recoItem:  {
    fontSize: "12px",
    color: "#6b7280",
    padding: "3px 0 3px 16px",
    position: "relative",
  },
  arrow: { position: "absolute", left: 0, color: "#7c3aed", fontSize: "11px" },
  loadingWrap: { textAlign: "center", padding: "60px 20px" },
  noDataWrap: { textAlign: "center", padding: "60px 20px" },
  resultRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid rgba(124,58,237,0.1)",
  },
  resultName: { fontSize: "14px", fontWeight: 500 },
  resultProfile: { fontSize: "12px", color: "#6b7280", marginTop: "2px" },
  resultScore: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "14px",
    fontWeight: 700,
    color: "#7c3aed",
  },
  actions: { display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "4px" },
};

export default function Results({ onNavigate, user }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://cognitive-twin-s56q.onrender.com/results")
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingWrap}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
        <div style={{ fontSize: "16px", color: "#6b7280" }}>Loading results...</div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div style={styles.noDataWrap}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
        <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>No results yet!</div>
        <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
          Take the quiz first to see your results here!
        </div>
        <button className="btn-primary" onClick={() => onNavigate("quiz")}>
          Take Quiz →
        </button>
      </div>
    );
  }

  const latest = results[results.length - 1];

  return (
    <div className="page-enter" style={styles.wrap}>

      <div style={styles.header}>
        <div style={styles.emoji}>🎉</div>
        <div style={styles.title}>Your Cognitive Profile</div>
        <div style={styles.sub}>
          Based on your quiz results, here is your personalized analysis!
        </div>
      </div>

      <div style={styles.profileCard}>
        <div style={styles.profileLabel}>// LATEST RESULT</div>
        <div style={styles.profileName}>{latest.profile}</div>
        <div style={styles.profileDesc}>
          Hello {latest.name}! Your score is {latest.score} out of 5.
        </div>
      </div>

      <div style={styles.recoGrid} className="reco-grid">
        <div style={styles.recoCard}>
          <div style={styles.recoIcon}>📚</div>
          <div style={styles.recoTitle}>Study Methods</div>
          <ul style={styles.recoList}>
            {latest.profile === "Visual-Creative Learner" ? (
              <>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Mind mapping</li>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Color-coded notes</li>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Visual flashcards</li>
              </>
            ) : latest.profile === "Analytical Thinker" ? (
              <>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Practice problems</li>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Step by step notes</li>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Flashcards</li>
              </>
            ) : (
              <>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Real world examples</li>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Group study</li>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Videos</li>
              </>
            )}
          </ul>
        </div>

        <div style={styles.recoCard}>
          <div style={styles.recoIcon}>💼</div>
          <div style={styles.recoTitle}>Career Paths</div>
          <ul style={styles.recoList}>
            {latest.profile === "Visual-Creative Learner" ? (
              <>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>UX Design</li>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Architecture</li>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Data Visualization</li>
              </>
            ) : latest.profile === "Analytical Thinker" ? (
              <>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Data Science</li>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Engineering</li>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Research</li>
              </>
            ) : (
              <>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Management</li>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Entrepreneurship</li>
                <li style={styles.recoItem}><span style={styles.arrow}>→</span>Sales</li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="section-title" style={{ marginBottom: "16px" }}>Score Breakdown</div>
        <CogBar label="Overall Score" score={latest.score} max={5} />
      </div>

      <div className="card">
        <div className="section-title" style={{ marginBottom: "16px" }}>All Results from Database 🗄️</div>
        {results.map((r, i) => (
          <div key={r.id} style={{
            ...styles.resultRow,
            borderBottom: i === results.length - 1 ? "none" : undefined,
          }}>
            <div>
              <div style={styles.resultName}>{r.name}</div>
              <div style={styles.resultProfile}>{r.profile}</div>
            </div>
            <div style={styles.resultScore}>{r.score}/5</div>
          </div>
        ))}
      </div>

      <div style={styles.actions}>
        <button
          className="btn-primary"
          onClick={() => onNavigate("roadmap")}
          style={{ fontSize: "15px", padding: "14px 28px" }}
        >
          🗺️ See My Career Roadmap →
        </button>
        <button className="btn-outline" onClick={() => onNavigate("quiz")}>
          Retake Quiz
        </button>
      </div>

    </div>
  );
}