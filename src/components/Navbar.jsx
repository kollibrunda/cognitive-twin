// =============================================
//  COGNITIVE TWIN — Navbar with Login Info
// =============================================

import React from "react";

const NAV_LINKS = [
  { id: "home",    label: "Home"    },
  { id: "quiz",    label: "Quiz"    },
  { id: "results", label: "Results" },
  { id: "profile", label: "Profile" },
];

const styles = {
  nav: {
    background: "#1a1a2e",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "56px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "15px",
    color: "#a78bfa",
    letterSpacing: "1px",
  },
  logoSpan: { color: "#ffffff" },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  links: { display: "flex", gap: "4px" },
  btn: (active) => ({
    background: active ? "rgba(124,58,237,0.2)" : "none",
    border: "none",
    color: active ? "#c4b5fd" : "#9ca3af",
    fontFamily: "'Sora', sans-serif",
    fontSize: "13px",
    padding: "6px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
  }),
  userInfo: {
    fontSize: "12px",
    color: "#a78bfa",
    fontFamily: "'Space Mono', monospace",
  },
  logoutBtn: {
    background: "rgba(220,38,38,0.15)",
    border: "none",
    color: "#fca5a5",
    fontFamily: "'Sora', sans-serif",
    fontSize: "12px",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default function Navbar({ currentPage, onNavigate, user, onLogout }) {
  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <div style={styles.logo}>
        <span style={styles.logoSpan}>Cognitive</span>Twin
      </div>

      {/* Right side — links + user info */}
      <div style={styles.right}>
        {/* Navigation Links */}
        <div style={styles.links}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              style={styles.btn(currentPage === link.id)}
              onClick={() => onNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* User name */}
        {user && (
          <div style={styles.userInfo}>
            👤 {user.name}
          </div>
        )}

        {/* Logout button */}
        <button style={styles.logoutBtn} onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}