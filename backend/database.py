import sqlite3
import os
from datetime import datetime

DB_PATH = "scans.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS scan_telemetry
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  timestamp TEXT,
                  class_name TEXT,
                  confidence REAL,
                  latitude REAL,
                  longitude REAL,
                  status TEXT)''')
    conn.commit()
    conn.close()

def log_scan(class_name, confidence, latitude=None, longitude=None, status="success"):
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("INSERT INTO scan_telemetry (timestamp, class_name, confidence, latitude, longitude, status) VALUES (?, ?, ?, ?, ?, ?)",
                  (datetime.now().isoformat(), class_name, confidence, latitude, longitude, status))
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Database Error: {e}")
        return False

def get_recent_scans(limit=100):
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        # Filter for rows that have GPS data
        c.execute("SELECT timestamp, class_name, latitude, longitude FROM scan_telemetry WHERE latitude IS NOT NULL AND longitude IS NOT NULL ORDER BY id DESC LIMIT ?", (limit,))
        data = c.fetchall()
        conn.close()
        return [{"time": row[0], "class": row[1], "lat": row[2], "lng": row[3]} for row in data]
    except Exception as e:
        print(f"Database Read Error: {e}")
        return []

if __name__ == "__main__":
    init_db()
    print("Database Initialized.")
