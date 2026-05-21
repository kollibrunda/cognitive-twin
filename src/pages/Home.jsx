// =============================================
//  COGNITIVE TWIN — Home Page
// =============================================

import React from "react";
import CogBar from "../components/CogBar";

// The 4 summary cards at the top
const STATS = [
  { icon: "🧠", label: "Tests Taken",  value: "3",       sub: "+1 this week"  },
  { icon: "⚡", label: "Avg Score",    value: "74%",      sub: "+12% growth"   },
  { icon: "🎯", label: "Profile Type", value: "Visual",   sub: "Learner"       },
  { icon: "🔥", label: "Streak",       value: "5",        sub: "days active"   },
];

// The cognitive ability bars shown on the home page
const ABILITIES = [
  { label: "Memory",         score: 82 },
  { label: "Attention",      score: 67 },
  { label: "Reasoning",      score: 75 },
  { label: "Risk Tolerance", score: 58 },
  { label: "Creativity",     score: 90 },
];

const styles = {
  wrap: { padding: "24px", maxWidth: "780px", margin: "0 auto" },

  // Hero banner at the top
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

  // 4-column stat grid
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

  // Section header inside the card
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "14px",
  },
};

export default function Home({ onNavigate }) {
  return (
    <div className="page-enter" style={styles.wrap}>

      {/* ── Hero Banner ── */}
      <div style={styles.hero}>
        <div style={styles.heroBefore} />
        <div style={styles.heroTag}>// cognitive analysis system</div>
        <h1 style={styles.heroH1}>
          Discover Your<br />Learning Profile
        </h1>
        <p style={styles.heroP}>
          Take interactive cognitive tests to understand your memory, reasoning,
          and decision-making patterns.
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

      {/* ── Cognitive Abilities Card ── */}
      <div className="card">
        <div style={styles.sectionHeader}>
          <span className="section-title">Cognitive Abilities</span>
          <span className="badge">Last test: 2 days ago</span>
        </div>
        {ABILITIES.map((a) => (
          <CogBar key={a.label} label={a.label} score={a.score} />
        ))}
      </div>

    </div>
  );
}
