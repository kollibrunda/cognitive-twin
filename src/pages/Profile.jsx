import React, { useState, useEffect } from "react";

const styles = {
  wrap: { padding: "24px", maxWidth: "780px", margin: "0 auto" },
  profileCard: {
    background: "#ffffff", border: "1px solid rgba(124,58,237,0.15)",
    borderRadius: "14px", padding: "20px", marginBottom: "16px",
    display: "flex", alignItems: "center", gap: "16px",
  },
  avatar: {
    width: "64px", height: "64px", borderRadius: "50%",
    background: "#7c3aed", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "22px", fontWeight: 600,
    color: "#fff", flexShrink: 0,
  },
  name: { fontSize: "16px", fontWeight: 600 },
  role: { fontSize: "13px", color: "#6b7280", marginTop: "2px" },
  active: { fontSize: "12px", color: "#7c3aed", marginTop: "4px" },
  tabs: {
    display: "flex", gap: "4px", background: "#f3f4f6",
    padding: "4px", borderRadius: "10px", marginBottom: "20px",
  },
  tabBtn: (active) => ({
    flex: 1, background: active ? "#ffffff" : "none", border: "none",
    padding: "8px", borderRadius: "8px", fontFamily: "'Sora', sans-serif",
    fontSize: "13px", color: active ? "#1a1a2e" : "#6b7280",
    fontWeight: active ? 500 : 400, cursor: "pointer",
    boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
    transition: "all 0.2s",
  }),
  pillWrap: { display: "flex", flexWrap: "wrap", gap: "8px" },
  pill: (color) => ({
    fontSize: "11px", padding: "4px 12px", borderRadius: "20px",
    background: color === "purple" ? "#ede9fe" : color === "green" ? "#d1fae5" : color === "red" ? "#fee2e2" : "#fef3c7",
    color: color === "purple" ? "#7c3aed" : color === "green" ? "#065f46" : color === "red" ? "#991b1b" : "#92400e",
    fontWeight: 500,
  }),
  histItem: {
    display: "flex", alignItems: "center", gap: "14px",
    padding: "12px 0", borderBottom: "1px solid rgba(124,58,237,0.1)",
  },
  histIcon: {
    width: "36px", height: "36px", borderRadius: "10px",
    background: "#ede9fe", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "16px", flexShrink: 0,
  },
  histName: { fontSize: "13px", fontWeight: 500 },
  histDate: { fontSize: "12px", color: "#6b7280", marginTop: "2px" },
  histScore: { fontFamily: "'Space Mono', monospace", fontSize: "13px", fontWeight: 700, color: "#7c3aed", marginLeft: "auto" },
  label: { fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "4px", fontWeight: 500 },
  input: {
    width: "100%", padding: "10px 14px", borderRadius: "10px",
    border: "1px solid rgba(124,58,237,0.15)", fontFamily: "'Sora', sans-serif",
    fontSize: "14px", outline: "none", marginBottom: "12px", color: "#1a1a2e",
  },
  emptyState: { textAlign: "center", padding: "40px 20px", color: "#6b7280", fontSize: "13px" },
};

const ICONS = ["🧠", "🎯", "⚖️", "🔗", "💡"];

function Overview({ results, latestProfile }) {
  const strengthsByProfile = {
    "Visual-Creative Learner": { strengths: ["Creative Thinking", "Visual Memory", "Pattern Recognition", "Intuitive Reasoning", "Fast Learner"], weaknesses: ["Sustained Attention", "Risk Assessment", "Analytical Depth"] },
    "Analytical Thinker": { strengths: ["Logical Thinking", "Problem Solving", "Critical Analysis", "Systematic Approach", "Detail Oriented"], weaknesses: ["Creative Expression", "Risk Taking", "Flexibility"] },
    "Practical Learner": { strengths: ["Hands-on Learning", "Real World Application", "Team Work", "Communication", "Adaptability"], weaknesses: ["Abstract Thinking", "Academic Focus", "Patience"] },
  };

  const data = strengthsByProfile[latestProfile] || strengthsByProfile["Practical Learner"];

  return (
    <>
      <div className="card">
        <div className="section-title" style={{ marginBottom: "14px" }}>Cognitive Strengths</div>
        <div style={styles.pillWrap}>
          {data.strengths.map((s, i) => (
            <span key={s} style={styles.pill(i === data.strengths.length - 1 ? "green" : "purple")}>{s}</span>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="section-title" style={{ marginBottom: "14px" }}>Areas to Improve</div>
        <div style={styles.pillWrap}>
          {data.weaknesses.map((w, i) => (
            <span key={w} style={styles.pill(i === 1 ? "yellow" : "red")}>{w}</span>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="section-title" style={{ marginBottom: "4px" }}>Total Quizzes Taken</div>
        <div style={{ fontSize: "26px", fontWeight: 600, marginTop: "6px" }}>{results.length}</div>
      </div>
    </>
  );
}

function History({ results }) {
  if (results.length === 0) {
    return (
      <div className="card">
        <div style={styles.emptyState}>
          <div style={{ fontSize: "36px", marginBottom: "10px" }}>📭</div>
          No test history yet! Take a quiz to see your history here.
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="section-title" style={{ marginBottom: "14px" }}>Test History</div>
      {results.map((r, i) => (
        <div key={r.id} style={{ ...styles.histItem, borderBottom: i === results.length - 1 ? "none" : undefined }}>
          <div style={styles.histIcon}>{ICONS[i % ICONS.length]}</div>
          <div>
            <div style={styles.histName}>{r.profile}</div>
            <div style={styles.histDate}>Score: {r.score}/5</div>
          </div>
          <div style={styles.histScore}>{r.score}/5</div>
        </div>
      ))}
    </div>
  );
}

function Settings({ user, onLogout }) {
  const [name, setName]   = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");

  return (
    <div className="card">
      <div className="section-title" style={{ marginBottom: "16px" }}>Account Settings</div>
      <label style={styles.label}>Full Name</label>
      <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
      <label style={styles.label}>Email</label>
      <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        <button className="btn-primary" onClick={() => alert("Settings saved!")}>Save Changes</button>
        <button className="btn-outline" onClick={onLogout} style={{ color: "#dc2626", borderColor: "#dc2626" }}>Logout</button>
      </div>
    </div>
  );
}

export default function Profile({ onNavigate, user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [results, setResults]     = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`https://cognitive-twin-s56q.onrender.com/results/user/${user.name}`)
        .then(res => res.json())
        .then(data => {
          setResults(data.results || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  const latestProfile = results.length > 0 ? results[results.length - 1].profile : "Practical Learner";
  const initials = user ? user.name.slice(0, 2).toUpperCase() : "??";

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "history",  label: "History"  },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="page-enter" style={styles.wrap}>

      {/* Avatar Card */}
      <div style={styles.profileCard}>
        <div style={styles.avatar}>{initials}</div>
        <div>
          <div style={styles.name}>{user ? user.name : "User"}</div>
          <div style={styles.role}>{loading ? "Loading..." : latestProfile}</div>
          <div style={styles.active}>● {results.length} quizzes taken</div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={styles.tabs}>
        {TABS.map((t) => (
          <button key={t.id} style={styles.tabBtn(activeTab === t.id)} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>Loading your profile...</div>
      ) : (
        <>
          {activeTab === "overview" && <Overview results={results} latestProfile={latestProfile} />}
          {activeTab === "history"  && <History results={results} />}
          {activeTab === "settings" && <Settings user={user} onLogout={onLogout} />}
        </>
      )}

    </div>
  );
}