import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'
import fs from 'fs'

let dbPromise = null

export async function getDb() {
  if (!dbPromise) {
    const dbPath = path.resolve(process.cwd(), 'database.sqlite')
    dbPromise = open({
      filename: dbPath,
      driver: sqlite3.Database,
    }).then(async (db) => {
      // Create users table if not exists
      await db.exec(`
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
      `)

      // Seed initial user from users.json if database table is empty
      const userCount = await db.get('SELECT COUNT(*) as count FROM users')
      if (userCount && userCount.count === 0) {
        try {
          const jsonPath = path.resolve(process.cwd(), 'src/data/users.json')
          if (fs.existsSync(jsonPath)) {
            const raw = fs.readFileSync(jsonPath, 'utf-8')
            const initialUsers = JSON.parse(raw)
            for (const u of initialUsers) {
              await db.run(
                `INSERT OR IGNORE INTO users (username, fullName, email, password, avatar, role, joinedDate)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                  u.username,
                  u.fullName || u.username,
                  u.email,
                  u.password,
                  u.avatar || null,
                  u.role || 'Pro Growth Member',
                  u.joinedDate || 'Jan 2026',
                ]
              )
            }
          }
        } catch (err) {
          console.error('Error seeding initial user database:', err)
        }
      }
      return db
    })
  }
  return dbPromise
}
