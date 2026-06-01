import React, { useState, useEffect } from "react";

const ROADMAPS = {
  "Visual-Creative Learner": {
    intro: "You think visually and creatively! Here are the best careers for you with full roadmaps.",
    careers: [
      {
        title: "UX/UI Designer", icon: "🎨",
        salary: "₹4L - ₹18L per year", duration: "6-12 months to get job ready",
        steps: [
          { step: 1, title: "Learn Design Basics", desc: "Understand color theory, typography, and layout principles", resources: ["Google UX Design Certificate (Coursera)", "Design for Beginners (YouTube)"], duration: "3 weeks" },
          { step: 2, title: "Learn Figma", desc: "Master the most popular design tool used by companies worldwide", resources: ["Figma.com tutorials (free)", "Figma for Beginners (YouTube)"], duration: "4 weeks" },
          { step: 3, title: "Learn HTML & CSS", desc: "Understand how your designs are built on the web", resources: ["freeCodeCamp.org (free)", "W3Schools.com (free)"], duration: "6 weeks" },
          { step: 4, title: "User Research", desc: "Learn how to understand what users need", resources: ["Nielsen Norman Group articles", "UX Research Basics (YouTube)"], duration: "3 weeks" },
          { step: 5, title: "Build Portfolio", desc: "Create 3-5 case studies showing your design process", resources: ["Behance.net", "Dribbble.com"], duration: "4 weeks" },
          { step: 6, title: "Apply for Jobs", desc: "Apply to internships and junior UX designer roles", resources: ["LinkedIn", "Internshala", "Naukri.com"], duration: "Ongoing" },
        ],
      },
      {
        title: "Data Visualization Analyst", icon: "📊",
        salary: "₹5L - ₹20L per year", duration: "8-12 months to get job ready",
        steps: [
          { step: 1, title: "Learn Excel & Google Sheets", desc: "Master spreadsheets for basic data analysis", resources: ["Excel Easy (excelEasy.com)", "Google Sheets tutorials (YouTube)"], duration: "3 weeks" },
          { step: 2, title: "Learn SQL", desc: "Learn to query and manage databases", resources: ["SQLZoo.net (free)", "Mode SQL Tutorial (free)"], duration: "4 weeks" },
          { step: 3, title: "Learn Python Basics", desc: "Start programming with the most popular data language", resources: ["Python.org beginner guide", "Automate the Boring Stuff (free)"], duration: "6 weeks" },
          { step: 4, title: "Learn Tableau or Power BI", desc: "Master visualization tools used by companies", resources: ["Tableau Public (free)", "Power BI tutorials (Microsoft free)"], duration: "4 weeks" },
          { step: 5, title: "Build Projects", desc: "Create dashboards using real datasets", resources: ["Kaggle.com datasets", "Data.gov datasets"], duration: "4 weeks" },
          { step: 6, title: "Apply for Jobs", desc: "Apply to data analyst and visualization roles", resources: ["LinkedIn", "Naukri.com", "Indeed.com"], duration: "Ongoing" },
        ],
      },
      {
        title: "Graphic Designer", icon: "✏️",
        salary: "₹3L - ₹15L per year", duration: "6-10 months to get job ready",
        steps: [
          { step: 1, title: "Learn Design Fundamentals", desc: "Study color, typography, composition", resources: ["Canva Design School (free)", "Adobe tutorials (free)"], duration: "3 weeks" },
          { step: 2, title: "Learn Adobe Photoshop", desc: "Master photo editing and digital art", resources: ["Adobe Photoshop tutorials (YouTube)", "Adobe free trial"], duration: "5 weeks" },
          { step: 3, title: "Learn Adobe Illustrator", desc: "Create logos, icons, and vector graphics", resources: ["Adobe Illustrator tutorials (YouTube)", "Skillshare free trial"], duration: "5 weeks" },
          { step: 4, title: "Learn Branding", desc: "Understand how to create visual identity for brands", resources: ["The Futur (YouTube channel)", "Brand Identity books"], duration: "3 weeks" },
          { step: 5, title: "Build Portfolio", desc: "Create logos, posters, and brand designs", resources: ["Behance.net", "Adobe Portfolio (free)"], duration: "4 weeks" },
          { step: 6, title: "Apply for Jobs", desc: "Apply to design agencies and startups", resources: ["LinkedIn", "Internshala", "Behance jobs"], duration: "Ongoing" },
        ],
      },
    ],
  },
  "Analytical Thinker": {
    intro: "You think logically and love solving problems! Here are the best careers for you with full roadmaps.",
    careers: [
      {
        title: "Data Scientist", icon: "🔬",
        salary: "₹6L - ₹25L per year", duration: "10-14 months to get job ready",
        steps: [
          { step: 1, title: "Learn Python", desc: "Master Python programming language", resources: ["Python.org", "freeCodeCamp Python (YouTube)"], duration: "6 weeks" },
          { step: 2, title: "Learn Statistics & Math", desc: "Understand probability, statistics, and linear algebra", resources: ["Khan Academy Statistics (free)", "StatQuest (YouTube)"], duration: "6 weeks" },
          { step: 3, title: "Learn Pandas & NumPy", desc: "Master Python libraries for data analysis", resources: ["Pandas documentation", "Kaggle Python course (free)"], duration: "4 weeks" },
          { step: 4, title: "Learn Machine Learning", desc: "Understand ML algorithms and how to apply them", resources: ["Scikit-learn documentation", "Andrew Ng ML Course (Coursera)"], duration: "8 weeks" },
          { step: 5, title: "Build Projects", desc: "Create 3-5 ML projects using real datasets", resources: ["Kaggle.com competitions", "UCI ML Repository"], duration: "6 weeks" },
          { step: 6, title: "Apply for Jobs", desc: "Apply to data science and ML engineer roles", resources: ["LinkedIn", "Naukri.com", "AngelList"], duration: "Ongoing" },
        ],
      },
      {
        title: "Software Engineer", icon: "💻",
        salary: "₹5L - ₹30L per year", duration: "10-14 months to get job ready",
        steps: [
          { step: 1, title: "Learn Programming Basics", desc: "Start with Python or Java fundamentals", resources: ["CS50 Harvard (free)", "freeCodeCamp (free)"], duration: "6 weeks" },
          { step: 2, title: "Learn Data Structures", desc: "Arrays, linked lists, trees, graphs", resources: ["GeeksForGeeks (free)", "LeetCode (free)"], duration: "6 weeks" },
          { step: 3, title: "Learn Web Development", desc: "HTML, CSS, JavaScript, React", resources: ["The Odin Project (free)", "freeCodeCamp (free)"], duration: "8 weeks" },
          { step: 4, title: "Learn Backend Development", desc: "Node.js or Python FastAPI, databases", resources: ["Node.js documentation", "FastAPI documentation"], duration: "6 weeks" },
          { step: 5, title: "Build Projects", desc: "Build 3-5 full stack projects for portfolio", resources: ["GitHub (free)", "Vercel (free hosting)"], duration: "8 weeks" },
          { step: 6, title: "Apply for Jobs", desc: "Apply to software engineer and developer roles", resources: ["LinkedIn", "Naukri.com", "HackerEarth"], duration: "Ongoing" },
        ],
      },
      {
        title: "Research Analyst", icon: "📑",
        salary: "₹4L - ₹15L per year", duration: "6-10 months to get job ready",
        steps: [
          { step: 1, title: "Learn Research Methods", desc: "Qualitative and quantitative research techniques", resources: ["Coursera Research Methods (free audit)", "Google Scholar"], duration: "4 weeks" },
          { step: 2, title: "Learn Excel & Statistics", desc: "Data analysis using spreadsheets and stats", resources: ["Excel Easy (free)", "Khan Academy Statistics"], duration: "4 weeks" },
          { step: 3, title: "Learn Report Writing", desc: "How to write clear and effective research reports", resources: ["Coursera Writing Skills", "Purdue OWL (free)"], duration: "3 weeks" },
          { step: 4, title: "Learn SPSS or R", desc: "Statistical tools used in research", resources: ["SPSS tutorials (YouTube)", "R for beginners (free)"], duration: "5 weeks" },
          { step: 5, title: "Build Research Portfolio", desc: "Complete 2-3 research projects and publish findings", resources: ["ResearchGate.net", "Academia.edu"], duration: "6 weeks" },
          { step: 6, title: "Apply for Jobs", desc: "Apply to research analyst roles", resources: ["LinkedIn", "Naukri.com", "University job portals"], duration: "Ongoing" },
        ],
      },
    ],
  },
  "Practical Learner": {
    intro: "You learn best through real world experience! Here are the best careers for you with full roadmaps.",
    careers: [
      {
        title: "Business Manager", icon: "💼",
        salary: "₹5L - ₹20L per year", duration: "8-12 months to get job ready",
        steps: [
          { step: 1, title: "Learn Business Basics", desc: "Understand how businesses work, finance, and operations", resources: ["Introduction to Business (Coursera free)", "Peter Drucker books"], duration: "4 weeks" },
          { step: 2, title: "Learn Leadership Skills", desc: "How to lead teams and manage people", resources: ["Leadership courses (LinkedIn Learning)", "Simon Sinek (YouTube)"], duration: "4 weeks" },
          { step: 3, title: "Learn Project Management", desc: "Plan and execute projects successfully", resources: ["Google Project Management Certificate (Coursera)", "Asana tutorials"], duration: "6 weeks" },
          { step: 4, title: "Learn Finance Basics", desc: "Budgeting, P&L statements, business finance", resources: ["Khan Academy Finance (free)", "Accounting Stuff (YouTube)"], duration: "4 weeks" },
          { step: 5, title: "Get Real Experience", desc: "Internships, part-time roles, or manage a small project", resources: ["Internshala", "LinkedIn internships"], duration: "8 weeks" },
          { step: 6, title: "Apply for Jobs", desc: "Apply to management trainee and business analyst roles", resources: ["LinkedIn", "Naukri.com", "Campus placements"], duration: "Ongoing" },
        ],
      },
      {
        title: "Entrepreneur", icon: "🚀",
        salary: "Unlimited potential!", duration: "Start anytime!",
        steps: [
          { step: 1, title: "Find Your Idea", desc: "Identify a problem you can solve for people", resources: ["The Lean Startup book", "Y Combinator Startup School (free)"], duration: "2 weeks" },
          { step: 2, title: "Validate Your Idea", desc: "Talk to potential customers and test your idea", resources: ["Mom Test book", "Google Forms for surveys"], duration: "3 weeks" },
          { step: 3, title: "Learn Basic Marketing", desc: "How to reach your customers online and offline", resources: ["Google Digital Marketing (free)", "HubSpot Academy (free)"], duration: "4 weeks" },
          { step: 4, title: "Learn Basic Finance", desc: "Managing money, pricing, and profitability", resources: ["Khan Academy Finance", "QuickBooks tutorials"], duration: "3 weeks" },
          { step: 5, title: "Build MVP", desc: "Create a simple version of your product or service", resources: ["No-code tools: Bubble.io, Webflow", "Canva for branding"], duration: "6 weeks" },
          { step: 6, title: "Launch & Grow", desc: "Get your first customers and keep improving", resources: ["Product Hunt", "IndiaMART", "Social media marketing"], duration: "Ongoing" },
        ],
      },
      {
        title: "Sales & Marketing Manager", icon: "📣",
        salary: "₹4L - ₹18L per year", duration: "6-10 months to get job ready",
        steps: [
          { step: 1, title: "Learn Sales Basics", desc: "Understanding the sales process and customer psychology", resources: ["SPIN Selling book", "HubSpot Sales Training (free)"], duration: "3 weeks" },
          { step: 2, title: "Learn Digital Marketing", desc: "SEO, social media, email marketing, paid ads", resources: ["Google Digital Garage (free)", "HubSpot Academy (free)"], duration: "6 weeks" },
          { step: 3, title: "Learn CRM Tools", desc: "Use tools like HubSpot and Salesforce", resources: ["HubSpot CRM (free)", "Salesforce Trailhead (free)"], duration: "3 weeks" },
          { step: 4, title: "Learn Content Marketing", desc: "Create content that attracts and converts customers", resources: ["Content Marketing Institute (free)", "Canva for design"], duration: "4 weeks" },
          { step: 5, title: "Build Portfolio", desc: "Run a real campaign for a small business", resources: ["Google Ads free credits", "Meta Ads Manager"], duration: "4 weeks" },
          { step: 6, title: "Apply for Jobs", desc: "Apply to sales and marketing roles", resources: ["LinkedIn", "Naukri.com", "Indeed.com"], duration: "Ongoing" },
        ],
      },
    ],
  },
};

const styles = {
  wrap: { padding: "24px", maxWidth: "780px", margin: "0 auto" },
  header: { background: "linear-gradient(135deg, #1a1a2e, #312e81)", borderRadius: "14px", padding: "28px", marginBottom: "20px", color: "#fff" },
  headerTag: { fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#a78bfa", letterSpacing: "2px", marginBottom: "8px" },
  headerTitle: { fontSize: "22px", fontWeight: 600, marginBottom: "8px" },
  headerSub: { fontSize: "13px", color: "#9ca3af", lineHeight: 1.6 },
  careerTabs: { display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" },
  careerTab: (active) => ({ background: active ? "#7c3aed" : "#ffffff", color: active ? "#ffffff" : "#6b7280", border: `1px solid ${active ? "#7c3aed" : "rgba(124,58,237,0.15)"}`, borderRadius: "10px", padding: "8px 16px", fontFamily: "'Sora', sans-serif", fontSize: "13px", fontWeight: active ? 600 : 400, cursor: "pointer", transition: "all 0.2s" }),
  careerInfo: { background: "#ffffff", border: "1px solid rgba(124,58,237,0.15)", borderRadius: "14px", padding: "20px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" },
  careerIcon: { fontSize: "36px" },
  careerTitle: { fontSize: "18px", fontWeight: 600, marginBottom: "4px" },
  careerMeta: { fontSize: "13px", color: "#6b7280" },
  careerSalary: { fontSize: "13px", color: "#059669", fontWeight: 500, marginTop: "2px" },
  stepsWrap: { position: "relative" },
  step: { display: "flex", gap: "16px", marginBottom: "16px" },
  stepLeft: { display: "flex", flexDirection: "column", alignItems: "center" },
  stepNum: { width: "32px", height: "32px", borderRadius: "50%", background: "#7c3aed", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 600, flexShrink: 0 },
  stepLine: { width: "2px", flex: 1, background: "rgba(124,58,237,0.2)", margin: "4px 0", minHeight: "20px" },
  stepContent: { background: "#ffffff", border: "1px solid rgba(124,58,237,0.15)", borderRadius: "12px", padding: "16px", flex: 1, marginBottom: "4px" },
  stepTitle: { fontSize: "14px", fontWeight: 600, marginBottom: "4px" },
  stepDesc: { fontSize: "13px", color: "#6b7280", marginBottom: "8px", lineHeight: 1.5 },
  stepDuration: { display: "inline-block", fontSize: "11px", padding: "2px 8px", borderRadius: "20px", background: "#ede9fe", color: "#7c3aed", marginBottom: "8px" },
  resourcesTitle: { fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "4px" },
  resource: { fontSize: "12px", color: "#7c3aed", padding: "2px 0 2px 12px", position: "relative" },
  resourceDot: { position: "absolute", left: 0, color: "#7c3aed" },
  backBtn: { background: "none", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "10px", padding: "8px 16px", fontFamily: "'Sora', sans-serif", fontSize: "13px", color: "#7c3aed", cursor: "pointer", marginBottom: "20px" },
  loadingWrap: { textAlign: "center", padding: "60px 20px" },
};

export default function Roadmap({ onNavigate, user }) {
  const [activeCareer, setActiveCareer] = useState(0);
  const [actualProfile, setActualProfile] = useState("Practical Learner");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`https://cognitive-twin-s56q.onrender.com/results/user/${user.name}`)
        .then(res => res.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            const latest = data.results[data.results.length - 1];
            setActualProfile(latest.profile);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  const roadmapData = ROADMAPS[actualProfile] || ROADMAPS["Practical Learner"];
  const career = roadmapData.careers[activeCareer];

  if (loading) {
    return (
      <div style={styles.loadingWrap}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
        <div style={{ fontSize: "16px", color: "#6b7280" }}>Loading your roadmap...</div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={styles.wrap}>
      <button style={styles.backBtn} onClick={() => onNavigate("results")}>← Back to Results</button>

      <div style={styles.header}>
        <div style={styles.headerTag}>// YOUR CAREER ROADMAP</div>
        <div style={styles.headerTitle}>{actualProfile}</div>
        <div style={styles.headerSub}>{roadmapData.intro}</div>
      </div>

      <div style={styles.careerTabs}>
        {roadmapData.careers.map((c, i) => (
          <button key={i} style={styles.careerTab(activeCareer === i)} onClick={() => setActiveCareer(i)}>
            {c.icon} {c.title}
          </button>
        ))}
      </div>

      <div style={styles.careerInfo}>
        <div style={styles.careerIcon}>{career.icon}</div>
        <div>
          <div style={styles.careerTitle}>{career.title}</div>
          <div style={styles.careerMeta}>⏱ {career.duration}</div>
          <div style={styles.careerSalary}>💰 {career.salary}</div>
        </div>
      </div>

      <div style={styles.stepsWrap}>
        {career.steps.map((s, i) => (
          <div key={i} style={styles.step}>
            <div style={styles.stepLeft}>
              <div style={styles.stepNum}>{s.step}</div>
              {i < career.steps.length - 1 && <div style={styles.stepLine} />}
            </div>
            <div style={styles.stepContent}>
              <div style={styles.stepTitle}>{s.title}</div>
              <div style={styles.stepDesc}>{s.desc}</div>
              <div style={styles.stepDuration}>⏱ {s.duration}</div>
              <div style={styles.resourcesTitle}>📚 Resources:</div>
              {s.resources.map((r, j) => (
                <div key={j} style={styles.resource}>
                  <span style={styles.resourceDot}>→</span>{r}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "8px", flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={() => onNavigate("quiz")}>Retake Quiz</button>
        <button className="btn-outline" onClick={() => onNavigate("results")}>Back to Results</button>
      </div>
    </div>
  );
}