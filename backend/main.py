# =============================================
#  COGNITIVE TWIN — Backend API with Login
# =============================================

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import QuizSubmission, UserRegister, UserLogin
from database import get_connection, create_tables
import hashlib

app = FastAPI()
create_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hash password so it's safe in database
def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

# ── Test route
@app.get("/")
def home():
    return {"message": "Cognitive Twin Backend is running!"}

# ── Register new user
@app.post("/register")
def register(data: UserRegister):
    conn = get_connection()
    cursor = conn.cursor()

    # Check if email already exists
    cursor.execute("SELECT * FROM users WHERE email = ?", (data.email,))
    existing = cursor.fetchone()
    if existing:
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered!")

    # Save new user
    cursor.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        (data.name, data.email, hash_password(data.password))
    )
    conn.commit()
    conn.close()
    return {"message": "Account created successfully!", "name": data.name, "email": data.email}

# ── Login user
@app.post("/login")
def login(data: UserLogin):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = ?", (data.email,))
    user = cursor.fetchone()
    conn.close()

    if not user:
        raise HTTPException(status_code=400, detail="Email not found!")

    if user["password"] != hash_password(data.password):
        raise HTTPException(status_code=400, detail="Wrong password!")

    return {
        "message": "Login successful!",
        "name": user["name"],
        "email": user["email"]
    }

# ── Submit quiz
@app.post("/quiz/submit")
def submit_quiz(data: QuizSubmission):
    total = len(data.answers)
    score = sum(data.answers)

    if score > total:
        score = total

    percentage = (score / total) * 100 if total > 0 else 0

    if percentage >= 70:
        profile = "Visual-Creative Learner"
        careers = ["UX Design", "Architecture", "Data Visualization"]
        study   = ["Mind mapping", "Color-coded notes", "Diagrams"]
    elif percentage >= 40:
        profile = "Analytical Thinker"
        careers = ["Data Science", "Engineering", "Research"]
        study   = ["Practice problems", "Step by step notes", "Flashcards"]
    else:
        profile = "Practical Learner"
        careers = ["Management", "Entrepreneurship", "Sales"]
        study   = ["Real world examples", "Group study", "Videos"]

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO results (name, score, profile) VALUES (?, ?, ?)",
        (data.name, score, profile)
    )
    conn.commit()
    conn.close()

    return {
        "profile": profile,
        "score":   score,
        "careers": careers,
        "study":   study,
    }

# ── Get all results
@app.get("/results")
def get_results():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM results")
    rows = cursor.fetchall()
    conn.close()
    return {"results": [dict(row) for row in rows]}

# ── Get profile by name
@app.get("/profile/{name}")
def get_profile(name: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM results WHERE name = ?", (name,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict(row)
    return {"message": "Profile not found"}