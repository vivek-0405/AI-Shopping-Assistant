export async function registerUserApi(userData) {
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error('API register error:', error)
    return { success: false, reason: 'Failed to connect to authentication database server.' }
  }
}

export async function loginUserApi(identifier, password) {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error('API login error:', error)
    return { success: false, reason: 'Failed to connect to authentication database server.' }
  }
}

export async function fetchUsersApi() {
  try {
    const res = await fetch('/api/users')
    const data = await res.json()
    return data
  } catch (error) {
    console.error('API fetch users error:', error)
    return { success: false, users: [] }
  }
}

export async function clearUsersApi() {
  try {
    const res = await fetch('/api/users', { method: 'DELETE' })
    const data = await res.json()
    return data
  } catch (error) {
    console.error('API clear users error:', error)
    return { success: false, reason: 'Failed to connect to authentication database server.' }
  }
}

