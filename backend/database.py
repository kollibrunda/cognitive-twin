# =============================================
#  COGNITIVE TWIN — Database Connection
# =============================================

import sqlite3

def get_connection():
    conn = sqlite3.connect("cognitive_twin.db")
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    conn = get_connection()
    cursor = conn.cursor()

    # Users table — stores login info
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            name     TEXT NOT NULL,
            email    TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')

    # Results table — stores quiz results
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS results (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            name     TEXT NOT NULL,
            email    TEXT,
            score    INTEGER NOT NULL,
            profile  TEXT NOT NULL
        )
    ''')

    conn.commit()
    conn.close()