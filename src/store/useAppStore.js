import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import initialRegisteredUsers from '../data/users.json'
import { registerUserApi, loginUserApi, fetchUsersApi, clearUsersApi } from '../services/api'

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      // Active page
      activePage: 'landing',
      setActivePage: (page) => set({ activePage: page }),

      // AI Agent state
      agentState: 'idle', // idle | loading | success | error
      agentError: null,
      setAgentState: (state, error = null) => set({ agentState: state, agentError: error }),

      // Current shopping mission
      currentMission: null,
      setCurrentMission: (mission) => set({ currentMission: mission }),
      clearMission: () => set({ currentMission: null, agentState: 'idle', agentError: null, compareList: [] }),

      // Compared products
      compareList: [],
      addToCompare: (productId) =>
        set((s) => {
          if (s.compareList.includes(productId) || s.compareList.length >= 3) return s
          return { compareList: [...s.compareList, productId] }
        }),
      removeFromCompare: (productId) =>
        set((s) => ({ compareList: s.compareList.filter((id) => id !== productId) })),
      clearCompare: () => set({ compareList: [] }),

      // Saved products
      savedProducts: [],
      saveProduct: (product) =>
        set((s) => {
          if (s.savedProducts.find((p) => p.id === product.id)) return s
          return { savedProducts: [product, ...s.savedProducts] }
        }),
      removeSavedProduct: (productId) =>
        set((s) => ({ savedProducts: s.savedProducts.filter((p) => p.id !== productId) })),
      isProductSaved: (productId) => get().savedProducts.some((p) => p.id === productId),

      // Shopping list
      shoppingList: [],
      addToShoppingList: (item) =>
        set((s) => ({
          shoppingList: [
            ...s.shoppingList,
            { ...item, listId: `item-${Date.now()}`, quantity: 1, purchased: false },
          ],
        })),
      removeFromShoppingList: (listId) =>
        set((s) => ({ shoppingList: s.shoppingList.filter((i) => i.listId !== listId) })),
      updateListItem: (listId, updates) =>
        set((s) => ({
          shoppingList: s.shoppingList.map((i) => (i.listId === listId ? { ...i, ...updates } : i)),
        })),
      togglePurchased: (listId) =>
        set((s) => ({
          shoppingList: s.shoppingList.map((i) =>
            i.listId === listId ? { ...i, purchased: !i.purchased } : i
          ),
        })),
      clearShoppingList: () => set({ shoppingList: [] }),

      // Recent missions
      recentMissions: [],
      addRecentMission: (mission) =>
        set((s) => {
          const existing = s.recentMissions.filter(
            (m) => m.id !== mission.id
          )
          return {
            recentMissions: [
              { ...mission, id: `mission-${Date.now()}`, timestamp: new Date().toISOString() },
              ...existing,
            ].slice(0, 10),
          }
        }),
      removeRecentMission: (id) =>
        set((s) => ({ recentMissions: s.recentMissions.filter((m) => m.id !== id) })),

      // Registered Accounts (Persistent storage + SQLite DB sync)
      registeredUsers: Array.isArray(initialRegisteredUsers) ? initialRegisteredUsers : [],
      fetchUsersFromDb: async () => {
        const res = await fetchUsersApi()
        if (res.success && Array.isArray(res.users)) {
          set({ registeredUsers: res.users })
        }
      },
      clearAllRegisteredUsers: async () => {
        await clearUsersApi()
        set({ registeredUsers: [], user: null })
      },
      isUsernameTaken: (username) => {
        if (!username || !username.trim()) return false
        const clean = username.trim().toLowerCase()
        const users = get().registeredUsers || []
        return users.some((u) => u.username && u.username.trim().toLowerCase() === clean)
      },
      isEmailTaken: (email) => {
        if (!email || !email.trim()) return false
        const clean = email.trim().toLowerCase()
        const users = get().registeredUsers || []
        return users.some((u) => u.email && u.email.trim().toLowerCase() === clean)
      },
      registerNewUser: async (newUser) => {
        const cleanUsername = (newUser.username || '').trim().toLowerCase()
        const cleanEmail = (newUser.email || '').trim().toLowerCase()

        // Check local store state case-insensitively first
        if (get().isUsernameTaken(cleanUsername)) {
          return { success: false, reason: 'This User Name is already taken (case-insensitive check).' }
        }
        if (get().isEmailTaken(cleanEmail)) {
          return { success: false, reason: 'This Email Address is already registered (case-insensitive check).' }
        }

        const apiRes = await registerUserApi(newUser)
        if (apiRes && apiRes.success && apiRes.user) {
          const users = get().registeredUsers || []
          set({
            registeredUsers: [
              ...users.filter(
                (u) =>
                  u.email.toLowerCase() !== apiRes.user.email.toLowerCase() &&
                  u.username.toLowerCase() !== apiRes.user.username.toLowerCase()
              ),
              apiRes.user,
            ],
          })
          return { success: true, user: apiRes.user }
        }

        if (apiRes && apiRes.reason) {
          return { success: false, reason: apiRes.reason }
        }

        // Offline fallback only if server didn't respond
        const users = get().registeredUsers || []
        set((s) => ({ registeredUsers: [...(s.registeredUsers || []), newUser] }))
        return { success: true, user: newUser }
      },
      authenticateUser: async (identifier, inputPassword) => {
        const cleanId = (identifier || '').trim()
        const apiRes = await loginUserApi(cleanId, inputPassword)
        if (apiRes.success && apiRes.user) {
          const users = get().registeredUsers || []
          if (!users.some((u) => u.email.toLowerCase() === apiRes.user.email.toLowerCase())) {
            set({ registeredUsers: [...users, apiRes.user] })
          }
          return { success: true, user: apiRes.user }
        }
        if (apiRes.reason) {
          return { success: false, reason: apiRes.reason }
        }

        const users = get().registeredUsers || []

        // Offline fallback: exact capital/small letter match required for username or email
        const found = users.find(
          (u) =>
            (u.username && u.username.trim() === cleanId) ||
            (u.email && u.email.trim() === cleanId)
        )

        if (!found) {
          return { success: false, reason: 'Authentication Fail !' }
        }

        if (found.password && found.password !== inputPassword) {
          return { success: false, reason: 'Authentication Fail !' }
        }

        return { success: true, user: found }
      },

      // User Auth
      user: null,
      setUser: (userData) =>
        set((state) => {
          const updatedUsers = (state.registeredUsers || []).map((u) =>
            (u.email && userData.email && u.email.toLowerCase() === userData.email.toLowerCase()) ||
            (u.username && userData.name && u.username.toLowerCase() === userData.name.toLowerCase())
              ? { ...u, avatar: userData.avatar }
              : u
          )
          return { user: userData, registeredUsers: updatedUsers }
        }),
      loginUser: (userData) => set({ user: userData, activePage: 'landing' }),
      logoutUser: () => set({ user: null, activePage: 'login' }),

      // User profile / agent memory
      userProfile: {
        preferredBrands: ['Apple', 'Samsung', 'Nike'],
        budgetRange: { min: 5000, max: 50000 },
        favoriteCategories: ['Electronics', 'Footwear'],
        shoppingStyle: 'Value-focused',
        priority: 'Quality > Price',
      },
      updateUserProfile: (updates) =>
        set((s) => ({ userProfile: { ...s.userProfile, ...updates } })),

      // Growth dashboard
      growthData: null,
      growthState: 'idle',
      growthError: null,
      setGrowthData: (data) => set({ growthData: data, growthState: 'success' }),
      setGrowthState: (state, error = null) => set({ growthState: state, growthError: error }),

      // Active experiment actions
      launchedExperiments: [],
      launchExperiment: (expId) =>
        set((s) => ({
          launchedExperiments: [...new Set([...s.launchedExperiments, expId])],
        })),
      toggleExperiment: (expId) =>
        set((s) => ({
          launchedExperiments: s.launchedExperiments.includes(expId)
            ? s.launchedExperiments.filter((id) => id !== expId)
            : [...s.launchedExperiments, expId],
        })),

      // Active agent actions
      agentActions: [],
      addAgentAction: (action) =>
        set((s) => ({
          agentActions: [
            { ...action, id: `action-${Date.now()}`, timestamp: new Date().toISOString() },
            ...s.agentActions,
          ].slice(0, 20),
        })),
    }),
    {
      name: 'growthpilot-store',
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
        savedProducts: state.savedProducts,
        shoppingList: state.shoppingList,
        recentMissions: state.recentMissions,
        userProfile: state.userProfile,
        launchedExperiments: state.launchedExperiments,
        agentActions: state.agentActions,
        registeredUsers: state.registeredUsers,
      }),
    }
  )
)