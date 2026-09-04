import express from 'express'
import cors from 'cors'
import { getDb } from './db.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Root status route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'GrowthPilot AI Backend SQLite Database Server is running.',
    frontendUrl: 'http://localhost:5173/',
    endpoints: {
      register: 'POST /api/register',
      login: 'POST /api/login',
      users: 'GET /api/users',
    },
  })
})

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, reason: 'Username, email, and password are required.' })
    }

    const cleanUsername = username.trim()
    const cleanEmail = email.trim()

    const db = await getDb()

    // Check existing username (case-insensitive across capital and small letters)
    const existingUser = await db.get(
      `SELECT * FROM users WHERE LOWER(username) = LOWER(?)`,
      [cleanUsername]
    )
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        reason: 'This User Name is already taken (case-insensitive check). Please choose a unique User Name.' 
      })
    }

    // Check existing email (case-insensitive across capital and small letters)
    const existingEmail = await db.get(
      `SELECT * FROM users WHERE LOWER(email) = LOWER(?)`,
      [cleanEmail]
    )
    if (existingEmail) {
      return res.status(400).json({ 
        success: false, 
        reason: 'This Email Address is already registered (case-insensitive check). Please use a different Email.' 
      })
    }

    const joinedDate = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    const result = await db.run(
      `INSERT INTO users (username, fullName, email, password, avatar, role, joinedDate)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [cleanUsername, fullName || cleanUsername, cleanEmail, password, null, 'Pro Growth Member', joinedDate]
    )

    const newUser = {
      id: result.lastID,
      username: cleanUsername,
      fullName: fullName || cleanUsername,
      name: cleanUsername,
      email: cleanEmail,
      password: password,
      avatar: null,
      role: 'Pro Growth Member',
      joinedDate: joinedDate,
    }

    res.json({ success: true, user: newUser })
  } catch (error) {
    console.error('Registration error:', error)
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      if (error.message.includes('users.username')) {
        return res.status(400).json({ success: false, reason: 'This User Name is already taken.' })
      }
      if (error.message.includes('users.email')) {
        return res.status(400).json({ success: false, reason: 'This Email Address is already registered.' })
      }
    }
    res.status(500).json({ success: false, reason: 'Internal server error during registration.' })
  }
})

// Login / Authenticate route
app.post('/api/login', async (req, res) => {
  try {
    const { identifier, password } = req.body

    if (!identifier || !password) {
      return res.status(400).json({ success: false, reason: 'Username/Email and password are required.' })
    }

    const cleanId = identifier.trim()
    const db = await getDb()

    // Find user by EXACT username or EXACT email (case-sensitive letter matching required)
    const user = await db.get(
      `SELECT * FROM users WHERE (username = ? COLLATE BINARY OR email = ? COLLATE BINARY)`,
      [cleanId, cleanId]
    )

    if (!user || (user.username !== cleanId && user.email !== cleanId)) {
      return res.status(401).json({ success: false, reason: 'Authentication Fail !' })
    }

    // Verify password
    if (user.password !== password) {
      return res.status(401).json({ success: false, reason: 'Authentication Fail !' })
    }

    const loggedUser = {
      id: user.id,
      username: user.username,
      fullName: user.fullName || user.username,
      name: user.username,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      role: user.role || 'Pro Growth Member',
      joinedDate: user.joinedDate || 'Jan 2026',
    }

    res.json({ success: true, user: loggedUser })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, reason: 'Internal server error during authentication.' })
  }
})

// Fetch all registered users
app.get('/api/users', async (req, res) => {
  try {
    const db = await getDb()
    const users = await db.all('SELECT id, username, fullName, email, avatar, role, joinedDate FROM users')
    res.json({ success: true, users })
  } catch (error) {
    console.error('Fetch users error:', error)
    res.status(500).json({ success: false, reason: 'Internal server error fetching users.' })
  }
})

// Clear all registered users from database
app.delete('/api/users', async (req, res) => {
  try {
    const db = await getDb()
    await db.run('DELETE FROM users')
    await db.run("DELETE FROM sqlite_sequence WHERE name='users'")
    res.json({ success: true, message: 'All registered users cleared from database.' })
  } catch (error) {
    console.error('Clear users error:', error)
    res.status(500).json({ success: false, reason: 'Internal server error clearing users.' })
  }
})

app.listen(PORT, () => {
  console.log(`Backend SQLite Database Server running at http://localhost:${PORT}`)
})
