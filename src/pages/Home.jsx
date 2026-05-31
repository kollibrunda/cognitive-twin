// =============================================
//  COGNITIVE TWIN — Home Page (Real Data!)
// =============================================

import React, { useState, useEffect } from "react";
import CogBar from "../components/CogBar";

const styles = {
  wrap: { padding: "24px", maxWidth: "780px", margin: "0 auto" },
  hero: {
    background: "#1a1a2e",
    borderRadius: "14px",
    padding: "40px 32px",
    marginBottom: "24px",
    position: "relative",
    overflow: "hidden",
  },
  heroBefore: {
    position: "absolute",
    width: "300px", height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
    top: "-80px", right: "-60px",
    pointerEvents: "none",
  },
  heroTag: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "11px",
    color: "#a78bfa",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  heroH1: {
    fontSize: "28px",
    fontWeight: 600,
    color: "#fff",
    lineHeight: 1.3,
    marginBottom: "10px",
  },
  heroP: { color: "#9ca3af", fontSize: "14px", lineHeight: 1.6, maxWidth: "420px" },
  heroActions: { display: "flex", gap: "10px", marginTop: "24px", flexWrap: "wrap" },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
    marginBottom: "20px",
  },
  statCard: {
    background: "#ffffff",
    border: "1px solid rgba(124,58,237,0.15)",
    borderRadius: "12px",
    padding: "16px",
  },
  statIcon: {
    width: "32px", height: "32px",
    borderRadius: "8px",
    background: "#ede9fe",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "16px",
    marginBottom: "10px",
  },
  statLabel: { fontSize: "12px", color: "#6b7280", marginBottom: "4px" },
  statNum:   { fontSize: "20px", fontWeight: 600 },
  statSub:   { fontSize: "11px", color: "#059669", marginTop: "2px" },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "14px",
  },
};

export default function Home({ onNavigate, user }) {
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch(`https://cognitive-twin-s56q.onrender.com/results/user/${user.name}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Calculate real stats from results
  const totalTests  = results.length;
  const avgScore    = totalTests > 0
    ? Math.round((results.reduce((sum, r) => sum + r.score, 0) / totalTests / 5) * 100)
    : 0;
  const latest      = results[results.length - 1];
  const profileType = latest ? latest.profile.split(" ")[0] : "None";
  const latestScore = latest ? latest.score : 0;

  const STATS = [
    { icon: "🧠", label: "Tests Taken",  value: totalTests.toString(),  sub: totalTests > 0 ? "Keep going!" : "Take your first test!" },
    { icon: "⚡", label: "Avg Score",    value: `${avgScore}%`,          sub: avgScore > 70 ? "Great job!" : "Keep improving!" },
    { icon: "🎯", label: "Profile Type", value: profileType,             sub: latest ? latest.profile.split(" ").slice(1).join(" ") : "Not yet" },
    { icon: "🔥", label: "Latest Score", value: `${latestScore}/5`,      sub: latest ? latest.profile : "Take a quiz!" },
  ];

  // Cognitive ability scores based on latest result
  const ABILITIES = latest ? [
    { label: "Memory",         score: Math.round(latest.score * 18) },
    { label: "Attention",      score: Math.round(latest.score * 15) },
    { label: "Reasoning",      score: Math.round(latest.score * 16) },
    { label: "Risk Tolerance", score: Math.round(latest.score * 12) },
    { label: "Creativity",     score: Math.round(latest.score * 19) },
  ] : [
    { label: "Memory",         score: 0 },
    { label: "Attention",      score: 0 },
    { label: "Reasoning",      score: 0 },
    { label: "Risk Tolerance", score: 0 },
    { label: "Creativity",     score: 0 },
  ];

  return (
    <div className="page-enter" style={styles.wrap}>

      {/* ── Hero Banner ── */}
      <div style={styles.hero}>
        <div style={styles.heroBefore} />
        <div style={styles.heroTag}>// cognitive analysis system</div>
        <h1 style={styles.heroH1}>
          Welcome back,<br />{user.name}! 👋
        </h1>
        <p style={styles.heroP}>
          {totalTests === 0
            ? "You haven't taken any tests yet. Start your first assessment now!"
            : `You have taken ${totalTests} test${totalTests > 1 ? "s" : ""} so far. Keep going!`}
        </p>
        <div style={styles.heroActions}>
          <button className="btn-primary" onClick={() => onNavigate("quiz")}>
            Start Assessment →
          </button>
          <button className="btn-outline" onClick={() => onNavigate("results")}>
            View Results
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px", color: "#6b7280" }}>
          Loading your data...
        </div>
      ) : (
        <div style={styles.statGrid}>
          {STATS.map((s) => (
            <div key={s.label} style={styles.statCard}>
              <div style={styles.statIcon}>{s.icon}</div>
              <div style={styles.statLabel}>{s.label}</div>
              <div style={styles.statNum}>{s.value}</div>
              <div style={styles.statSub}>{s.sub}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Cognitive Abilities Card ── */}
      <div className="card">
        <div style={styles.sectionHeader}>
          <span className="section-title">Cognitive Abilities</span>
          <span className="badge">
            {latest ? `Last test score: ${latestScore}/5` : "No tests yet"}
          </span>
        </div>
        {ABILITIES.map((a) => (
          <CogBar key={a.label} label={a.label} score={a.score} max={100} />
        ))}
        {totalTests === 0 && (
          <div style={{ textAlign: "center", padding: "20px", color: "#6b7280", fontSize: "13px" }}>
            Take a quiz to see your cognitive abilities! 😊
          </div>
        )}
      </div>

    </div>
  );
}