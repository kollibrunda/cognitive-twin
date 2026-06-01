// =============================================
//  COGNITIVE TWIN — App.jsx with Roadmap
// =============================================

import React, { useState } from "react";
import "./index.css";

import Navbar    from "./components/Navbar";
import Home      from "./pages/Home";
import Quiz      from "./pages/Quiz";
import Results   from "./pages/Results";
import Profile   from "./pages/Profile";
import Login     from "./pages/Login";
import Register  from "./pages/Register";
import Roadmap   from "./pages/Roadmap";

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [user, setUser]               = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [latestProfile, setLatestProfile] = useState("Practical Learner");

  function navigate(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLogin(userData) {
    setUser(userData);
    setCurrentPage("home");
  }

  function handleLogout() {
    setUser(null);
    setUserProfile(null);
    setCurrentPage("login");
  }

  function handleQuizDone(profile) {
    setUserProfile(profile);
    setLatestProfile(profile);
  }

  function renderPage() {
    if (!user) {
      if (currentPage === "register") {
        return <Register onNavigate={navigate} />;
      }
      return <Login onNavigate={navigate} onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case "home":    return <Home    onNavigate={navigate} user={user} />;
      case "quiz":    return <Quiz    onNavigate={navigate} user={user} onQuizDone={handleQuizDone} />;
      case "results": return <Results onNavigate={navigate} user={user} profile={userProfile} onProfileUpdate={(p) => { setLatestProfile(p); handleQuizDone(p); }} />;
      case "profile": return <Profile onNavigate={navigate} user={user} onLogout={handleLogout} />;
      case "roadmap": return <Roadmap onNavigate={navigate} profile={latestProfile} />;
      default:        return <Home    onNavigate={navigate} user={user} />;
    }
  }

  return (
    <div>
      {user && (
        <Navbar
          currentPage={currentPage}
          onNavigate={navigate}
          user={user}
          onLogout={handleLogout}
        />
      )}
      {renderPage()}
    </div>
  );
}