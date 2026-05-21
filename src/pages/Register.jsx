// =============================================
//  COGNITIVE TWIN — Register Page
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

export default function Register({ onNavigate }) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) {
      setError("Please fill in all fields!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail);
        setLoading(false);
        return;
      }

      setSuccess("Account created! Redirecting to login...");
      setLoading(false);

      // Go to login page after 2 seconds
      setTimeout(() => {
        onNavigate("login");
      }, 2000);

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
        <div style={styles.sub}>Create your account</div>

        {error   && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <label style={styles.label}>Full Name</label>
        <input
          style={styles.input}
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          placeholder="minimum 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn-primary"
          style={{ width: "100%", padding: "12px" }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account →"}
        </button>

        <div style={styles.bottom}>
          Already have an account?{" "}
          <button style={styles.link} onClick={() => onNavigate("login")}>
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}