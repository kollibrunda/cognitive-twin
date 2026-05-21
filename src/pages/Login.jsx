// =============================================
//  COGNITIVE TWIN — Login Page
// =============================================

import React, { useState } from "react";

const styles = {
  wrap: {
    padding: "24px",
    maxWidth: "420px",
    margin: "40px auto",
  },
  card: {
    background: "#ffffff",
    border: "1px solid rgba(124,58,237,0.15)",
    borderRadius: "14px",
    padding: "32px",
  },
  logo: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "8px",
    color: "#1a1a2e",
  },
  logoAccent: { color: "#7c3aed" },
  sub: {
    textAlign: "center",
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "28px",
  },
  label: {
    fontSize: "12px",
    color: "#6b7280",
    display: "block",
    marginBottom: "4px",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(124,58,237,0.2)",
    fontFamily: "'Sora', sans-serif",
    fontSize: "14px",
    outline: "none",
    marginBottom: "16px",
    color: "#1a1a2e",
  },
  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "13px",
    marginBottom: "16px",
  },
  success: {
    background: "#d1fae5",
    color: "#065f46",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "13px",
    marginBottom: "16px",
  },
  bottom: {
    textAlign: "center",
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "16px",
  },
  link: {
    color: "#7c3aed",
    cursor: "pointer",
    fontWeight: 500,
    background: "none",
    border: "none",
    fontFamily: "'Sora', sans-serif",
    fontSize: "13px",
  },
};

export default function Login({ onNavigate, onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      setError("Please fill in all fields!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail);
        setLoading(false);
        return;
      }

      // Save user info and navigate to home
      onLogin(data);
      onNavigate("home");

    } catch (err) {
      setError("Cannot connect to server. Is backend running?");
      setLoading(false);
    }
  }

  return (
    <div className="page-enter" style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.logo}>
          Cognitive<span style={styles.logoAccent}>Twin</span>
        </div>
        <div style={styles.sub}>Login to see your cognitive profile</div>

        {error && <div style={styles.error}>{error}</div>}

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          placeholder="your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn-primary"
          style={{ width: "100%", padding: "12px" }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login →"}
        </button>

        <div style={styles.bottom}>
          Don't have an account?{" "}
          <button style={styles.link} onClick={() => onNavigate("register")}>
            Register here
          </button>
        </div>
      </div>
    </div>
  );
}