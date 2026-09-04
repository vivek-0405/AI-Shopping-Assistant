import sqlite3
import os
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent.parent / "database.sqlite"

def get_db_connection():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL COLLATE NOCASE,
            fullName TEXT,
            email TEXT UNIQUE NOT NULL COLLATE NOCASE,
            password TEXT NOT NULL,
            avatar TEXT,
            role TEXT DEFAULT 'Pro Growth Member',
            joinedDate TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def register_user(username: str, full_name: str, email: str, password: str) -> dict:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()

    clean_username = username.strip()
    clean_email = email.strip()

    # Check case-insensitive duplicate username
    cursor.execute("SELECT * FROM users WHERE LOWER(username) = LOWER(?)", (clean_username,))
    if cursor.fetchone():
        conn.close()
        return {"success": False, "reason": "This User Name is already taken (case-insensitive check). Please choose a unique User Name."}

    # Check case-insensitive duplicate email
    cursor.execute("SELECT * FROM users WHERE LOWER(email) = LOWER(?)", (clean_email,))
    if cursor.fetchone():
        conn.close()
        return {"success": False, "reason": "This Email Address is already registered (case-insensitive check). Please use a different Email."}

    joined_date = "Sep 2026"
    cursor.execute("""
        INSERT INTO users (username, fullName, email, password, avatar, role, joinedDate)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (clean_username, full_name or clean_username, clean_email, password, None, 'Pro Growth Member', joined_date))

    user_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return {
        "success": True,
        "user": {
            "id": user_id,
            "username": clean_username,
            "fullName": full_name or clean_username,
            "name": clean_username,
            "email": clean_email,
            "password": password,
            "avatar": None,
            "role": "Pro Growth Member",
            "joinedDate": joined_date
        }
    }

def authenticate_user(identifier: str, password: str) -> dict:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()

    clean_id = identifier.strip()

    # Exact case-sensitive binary match for username or email
    cursor.execute("""
        SELECT * FROM users WHERE (username = ? COLLATE BINARY OR email = ? COLLATE BINARY)
    """, (clean_id, clean_id))

    row = cursor.fetchone()
    if not row or (row["username"] != clean_id and row["email"] != clean_id):
        conn.close()
        return {"success": False, "reason": "Authentication Fail !"}

    if row["password"] != password:
        conn.close()
        return {"success": False, "reason": "Authentication Fail !"}

    user_data = {
        "id": row["id"],
        "username": row["username"],
        "fullName": row["fullName"] or row["username"],
        "name": row["username"],
        "email": row["email"],
        "password": row["password"],
        "avatar": row["avatar"],
        "role": row["role"] or "Pro Growth Member",
        "joinedDate": row["joinedDate"] or "Sep 2026"
    }

    conn.close()
    return {"success": True, "user": user_data}

def get_all_users() -> list[dict]:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, username, fullName, email, avatar, role, joinedDate FROM users")
    rows = cursor.fetchall()
    users = [dict(r) for r in rows]
    conn.close()
    return users

def clear_all_users() -> dict:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users")
    conn.commit()
    conn.close()
    return {"success": True, "message": "All registered users cleared."}
