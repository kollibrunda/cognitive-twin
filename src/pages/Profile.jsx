// =============================================
//  COGNITIVE TWIN — Profile Page
//  3 tabs: Overview, History, Settings
// =============================================

import React, { useState } from "react";

// Past test records shown in History tab
const HISTORY = [
  { icon: "🧠", name: "Memory Assessment",  date: "April 23, 2025", score: "82%" },
  { icon: "🎯", name: "Attention & Focus",  date: "April 18, 2025", score: "67%" },
  { icon: "⚖️", name: "Risk Evaluation",   date: "April 12, 2025", score: "58%" },
];

// Strengths shown in Overview tab
const STRENGTHS = ["Creative Thinking", "Visual Memory", "Pattern Recognition", "Intuitive Reasoning", "Fast Learner"];
const WEAKNESSES = ["Sustained Attention", "Risk Assessment", "Analytical Depth"];

const styles = {
  wrap: { padding: "24px", maxWidth: "780px", margin: "0 auto" },

  // Avatar + name card at top
  profileCard: {
    background: "#ffffff",
    border: "1px solid rgba(124,58,237,0.15)",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  avatar: {
    width: "64px", height: "64px",
    borderRadius: "50%",
    background: "#7c3aed",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "22px",
    fontWeight: 600,
    color: "#fff",
    flexShrink: 0,
  },
  name: { fontSize: "16px", fontWeight: 600 },
  role: { fontSize: "13px", color: "#6b7280", marginTop: "2px" },
  active: { fontSize: "12px", color: "#7c3aed", marginTop: "4px" },

  // Tab switcher
  tabs: {
    display: "flex",
    gap: "4px",
    background: "#f3f4f6",
    padding: "4px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  tabBtn: (active) => ({
    flex: 1,
    background: active ? "#ffffff" : "none",
    border: "none",
    padding: "8px",
    borderRadius: "8px",
    fontFamily: "'Sora', sans-serif",
    fontSize: "13px",
    color: active ? "#1a1a2e" : "#6b7280",
    fontWeight: active ? 500 : 400,
    cursor: "pointer",
    boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
    transition: "all 0.2s",
  }),

  // Strength / weakness pill badges
  pillWrap: { display: "flex", flexWrap: "wrap", gap: "8px" },
  pillStrength: {
    fontSize: "11px", padding: "4px 12px", borderRadius: "20px",
    background: "#ede9fe", color: "#7c3aed", fontWeight: 500,
  },
  pillSuccess: {
    fontSize: "11px", padding: "4px 12px", borderRadius: "20px",
    background: "#d1fae5", color: "#065f46", fontWeight: 500,
  },
  pillDanger: {
    fontSize: "11px", padding: "4px 12px", borderRadius: "20px",
    background: "#fee2e2", color: "#991b1b", fontWeight: 500,
  },
  pillWarning: {
    fontSize: "11px", padding: "4px 12px", borderRadius: "20px",
    background: "#fef3c7", color: "#92400e", fontWeight: 500,
  },

  // History list item
  histItem: {
    display: "flex", alignItems: "center", gap: "14px",
    padding: "12px 0",
    borderBottom: "1px solid rgba(124,58,237,0.1)",
  },
  histIcon: {
    width: "36px", height: "36px", borderRadius: "10px",
    background: "#ede9fe",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "16px", flexShrink: 0,
  },
  histName: { fontSize: "13px", fontWeight: 500 },
  histDate: { fontSize: "12px", color: "#6b7280", marginTop: "2px" },
  histScore: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "13px", fontWeight: 700, color: "#7c3aed",
    marginLeft: "auto",
  },

  // Settings form
  label: { fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "4px" },
  input: {
    width: "100%", padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(124,58,237,0.15)",
    fontFamily: "'Sora', sans-serif",
    fontSize: "14px",
    outline: "none",
    marginBottom: "12px",
    color: "#1a1a2e",
  },
};

// ── Tab: Overview ──
function Overview() {
  return (
    <>
      <div className="card">
        <div className="section-title" style={{ marginBottom: "14px" }}>Cognitive Strengths</div>
        <div style={styles.pillWrap}>
          {STRENGTHS.map((s, i) => (
            <span key={s} style={i === STRENGTHS.length - 1 ? styles.pillSuccess : styles.pillStrength}>
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="section-title" style={{ marginBottom: "14px" }}>Areas to Improve</div>
        <div style={styles.pillWrap}>
          {WEAKNESSES.map((w, i) => (
            <span key={w} style={i === 1 ? styles.pillWarning : styles.pillDanger}>{w}</span>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="section-title" style={{ marginBottom: "4px" }}>Total Quizzes Taken</div>
        <div style={{ fontSize: "26px", fontWeight: 600, marginTop: "6px" }}>3</div>
      </div>
    </>
  );
}

// ── Tab: History ──
function History() {
  return (
    <div className="card">
      <div className="section-title" style={{ marginBottom: "14px" }}>Test History</div>
      {HISTORY.map((h, i) => (
        <div key={h.name} style={{ ...styles.histItem, borderBottom: i === HISTORY.length - 1 ? "none" : undefined }}>
          <div style={styles.histIcon}>{h.icon}</div>
          <div>
            <div style={styles.histName}>{h.name}</div>
            <div style={styles.histDate}>{h.date}</div>
          </div>
          <div style={styles.histScore}>{h.score}</div>
        </div>
      ))}
    </div>
  );
}

// ── Tab: Settings ──
function Settings() {
  // useState lets us store what the user types
  const [name,  setName]  = useState("Student Raju");
  const [email, setEmail] = useState("student@example.com");
  const [roll,  setRoll]  = useState("24D21A6702");

  function handleSave() {
    alert("Changes saved! (Connect to backend to persist these.)");
  }

  return (
    <div className="card">
      <div className="section-title" style={{ marginBottom: "16px" }}>Account Settings</div>

      <label style={styles.label}>Full Name</label>
      <input style={styles.input} value={name}  onChange={(e) => setName(e.target.value)} />

      <label style={styles.label}>Email</label>
      <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label style={styles.label}>Roll Number</label>
      <input style={styles.input} value={roll}  onChange={(e) => setRoll(e.target.value)} />

      <button className="btn-primary" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}

// ── Main Profile Component ──
export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");

  const TABS = [
    { id: "overview",  label: "Overview"  },
    { id: "history",   label: "History"   },
    { id: "settings",  label: "Settings"  },
  ];

  return (
    <div className="page-enter" style={styles.wrap}>

      {/* Avatar Card */}
      <div style={styles.profileCard}>
        <div style={styles.avatar}>SR</div>
        <div>
          <div style={styles.name}>Student Raju</div>
          <div style={styles.role}>Visual-Creative Learner</div>
          <div style={styles.active}>● Active since April 2025</div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.id}
            style={styles.tabBtn(activeTab === t.id)}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview"  && <Overview />}
      {activeTab === "history"   && <History />}
      {activeTab === "settings"  && <Settings />}

    </div>
  );
}
