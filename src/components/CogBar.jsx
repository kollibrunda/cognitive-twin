// =============================================
//  COGNITIVE TWIN — CogBar (Progress Bar)
//  Reusable bar that shows a cognitive score
// =============================================

import React from "react";

export default function CogBar({ label, score, max = 100 }) {
  const percent = Math.round((score / max) * 100);

  return (
    <div className="cog-bar">
      <div className="cog-bar-top">
        <span className="cog-bar-label">{label}</span>
        <span className="cog-bar-score">
          {score}/{max}
        </span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
