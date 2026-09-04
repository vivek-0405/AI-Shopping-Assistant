import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  KeyRound, 
  UserPlus, 
  ShieldCheck,
  Camera,
  Upload,
  User as UserIcon,
  RotateCcw,
  Trash2
} from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { GradientRingLogo } from '@/components/Common/GradientRingLogo'
import toast from 'react-hot-toast'

export function LoginPage() {
  const { user, loginUser, logoutUser, setUser, setActivePage, isUsernameTaken, registerNewUser, authenticateUser, clearAllRegisteredUsers, fetchUsersFromDb } = useAppStore()

  useEffect(() => {
    if (fetchUsersFromDb) {
      fetchUsersFromDb()
    }
  }, [])
  const [viewMode, setViewMode] = useState('login') // 'login' | 'register' | 'forgot'
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [authError, setAuthError] = useState('')

  const fileInputRef = useRef(null)

  // Input states
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        const photoUrl = reader.result
        setUser ? setUser({ ...user, avatar: photoUrl }) : loginUser({ ...user, avatar: photoUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = (e) => {
    if (e) e.stopPropagation()
    if (user) {
      setUser ? setUser({ ...user, avatar: null }) : loginUser({ ...user, avatar: null })
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setAuthError('')
    const input = userId.trim()
    if (!input || !password) {
      return
    }

    setIsLoading(true)
    const authRes = authenticateUser ? await authenticateUser(input, password) : { success: true }
    setIsLoading(false)

    if (!authRes.success) {
      setAuthError(authRes.reason || 'Authentication Fail !')
      return
    }

    const matchedUser = authRes.user
    const loggedUser = matchedUser
      ? {
          name: matchedUser.username,
          email: matchedUser.email,
          avatar: matchedUser.avatar || null,
          role: matchedUser.role || 'Pro Growth Member',
          joinedDate: matchedUser.joinedDate || 'Jan 2026',
        }
      : {
          name: input.includes('@') ? input.split('@')[0] : input,
          email: input.includes('@') ? input : `${input.toLowerCase()}@gmail.com`,
          avatar: null,
          role: 'Pro Growth Member',
          joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        }

    setUserId('')
    setEmail('')
    setPassword('')
    setAuthError('')
    loginUser(loggedUser)
    setActivePage('landing')
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setUsernameError('')
    setEmailError('')
    setPasswordError('')
    setAuthError('')

    if (!fullName.trim() || !userId.trim() || !email.trim() || !password) {
      setAuthError('All fields are required for registration.')
      return
    }

    const usernameInput = userId.trim()
    const emailInput = email.trim()

    // Validate User Name uniqueness (case-insensitive across capital and small letters)
    if (isUsernameTaken && isUsernameTaken(usernameInput)) {
      setUsernameError('This User Name is already taken (case-insensitive check). Please choose a unique User Name.')
      return
    }

    // Validate Email uniqueness (case-insensitive across capital and small letters)
    const storeState = useAppStore.getState()
    if (storeState.isEmailTaken && storeState.isEmailTaken(emailInput)) {
      setEmailError('This Email Address is already registered (case-insensitive check). Please use a different Email.')
      return
    }

    // Validate Passwords match (case-sensitive exact match)
    if (password !== confirmPassword) {
      setPasswordError('Password and Confirm Password do not match.')
      return
    }

    setIsLoading(true)
    const newUser = {
      username: usernameInput,
      fullName: fullName.trim(),
      name: usernameInput,
      email: emailInput,
      password: password,
      avatar: null,
      role: 'Pro Growth Member',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    }

    const regRes = registerNewUser ? await registerNewUser(newUser) : { success: true }
    setIsLoading(false)

    if (regRes && !regRes.success) {
      const reason = regRes.reason || 'Registration failed.'
      if (reason.toLowerCase().includes('user name')) {
        setUsernameError(reason)
      } else if (reason.toLowerCase().includes('email')) {
        setEmailError(reason)
      } else {
        setAuthError(reason)
      }
      return
    }

    setUserId('')
    setEmail('')
    setPassword('')
    setFullName('')
    setConfirmPassword('')
    setUsernameError('')
    setEmailError('')
    setPasswordError('')
    setAuthError('')
    loginUser(newUser)
    setActivePage('landing')
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    if (!resetEmail.trim() && !userId.trim()) {
      return
    }
    setViewMode('login')
    setResetEmail('')
  }

  const handleLogout = () => {
    setUserId('')
    setEmail('')
    setPassword('')
    setFullName('')
    setConfirmPassword('')
    setUsernameError('')
    setEmailError('')
    setAuthError('')
    logoutUser()
  }

  // Profile Card if logged in
  if (user) {
    return (
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-[#080912] overflow-hidden select-none">
        <div 
          className="absolute inset-0 bg-cover bg-bottom opacity-25 filter blur-[1px] pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080912]/90 via-[#080912]/70 to-[#080912]/95 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 glass rounded-3xl p-8 max-w-md w-full text-center space-y-6 border border-white/20 shadow-2xl"
        >
          {/* Avatar Ring Section */}
          <div className="relative inline-block group">
            {user.avatar && !user.avatar.includes('unsplash.com') ? (
              <>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-violet-500/40 shadow-xl"
                />

                {/* Hover overlay with Change Photo & Remove Photo */}
                <div className="absolute inset-0 rounded-full bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 backdrop-blur-xs p-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 text-[11px] font-semibold text-violet-300 hover:text-white transition-colors cursor-pointer bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full w-[85%] justify-center"
                    title="Change Photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="flex items-center gap-1 text-[11px] font-semibold text-rose-300 hover:text-rose-100 transition-colors cursor-pointer bg-rose-500/20 hover:bg-rose-500/30 px-2.5 py-1 rounded-full w-[85%] justify-center"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-24 h-24 rounded-full mx-auto bg-slate-800/90 border-2 border-slate-700/80 flex items-center justify-center ring-4 ring-violet-500/30 shadow-xl">
                  <UserIcon className="w-12 h-12 text-slate-300" />
                </div>

                {/* Hover overlay with ONLY Upload Photo */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 rounded-full bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-semibold transition-all duration-200 backdrop-blur-xs cursor-pointer"
                  title="Upload Profile Photo"
                >
                  <Camera className="w-6 h-6 mb-1 text-violet-300" />
                  <span>Upload Photo</span>
                </button>
              </>
            )}

            <div className="absolute bottom-0 right-0 w-7 h-7 bg-emerald-500 border-2 border-slate-900 rounded-full flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />

          {/* User Name & Email Header */}
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">{user.name}</h2>
            <p className="text-sm text-slate-300 mt-1 font-medium">{user.email}</p>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={() => setActivePage('landing')}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 font-bold text-sm rounded-xl shadow-lg shadow-violet-500/30 text-white flex items-center justify-center gap-2 transition-all transform active:scale-98"
            >
              Go to Home Page
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-4 py-8 bg-[#080a14] overflow-hidden select-none">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom opacity-30 pointer-events-none transition-opacity duration-700"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80')`
        }}
      />
      
      {/* Dark Ambient Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080a14]/90 via-[#080a14]/75 to-[#080a14]/95 pointer-events-none" />

      {/* Main Centered Login Box Container */}
      <div className="relative z-10 w-full max-w-md my-auto pt-4 pb-6">
        
        {/* Header: Logo, Title & Lock Icon */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white shadow-lg shadow-white/10 flex items-center justify-center ring-2 ring-white/40 border border-white/60 p-1">
              <GradientRingLogo className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-1.5">
                GrowthPilot <span className="text-violet-400">AI</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">Intelligent Agentic Shopping System</p>
            </div>
          </div>

          {/* Large Lock Icon */}
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shadow-inner">
            <Lock className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Dynamic Form Views */}
        <AnimatePresence mode="wait">
          {viewMode === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <form onSubmit={handleSignIn} className="space-y-3">
                {/* Input 1: User Name / Email */}
                <div>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value)
                      setAuthError('')
                    }}
                    placeholder="User Name / Email"
                    required
                    className="w-full bg-slate-900/90 text-white placeholder-slate-400 text-sm font-medium px-4 py-3.5 rounded-lg border border-slate-700/70 shadow-md focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 focus:outline-none transition-all"
                  />
                </div>

                {/* Input 3: Password */}
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setAuthError('')
                    }}
                    placeholder="Password"
                    required
                    className="w-full bg-slate-900/90 text-white placeholder-slate-400 text-sm font-medium px-4 py-3.5 pr-11 rounded-lg border border-slate-700/70 shadow-md focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {authError && (
                  <div className="p-3 bg-red-500/15 border border-red-500/40 rounded-lg text-red-300 text-xs font-semibold flex items-center justify-center gap-2">
                    <span>⚠️</span>
                    <span>{authError}</span>
                  </div>
                )}

                {/* Primary Large Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 active:scale-[0.99] text-white font-black text-base rounded-lg shadow-lg shadow-violet-500/30 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              {/* Stacked Action Buttons */}
              <div className="pt-3 space-y-2.5">
                {/* Button 1: Forgot/ Change Password */}
                <button
                  type="button"
                  onClick={() => setViewMode('forgot')}
                  className="w-full py-3 px-4 bg-slate-800/90 hover:bg-slate-700/90 text-indigo-200 font-semibold text-sm rounded-lg border border-indigo-500/30 shadow-md flex items-center justify-between transition-all"
                >
                  <span>Forgot/ Change Password</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Button 2: Create New User ( New Registration ) */}
                <button
                  type="button"
                  onClick={() => setViewMode('register')}
                  className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-sm rounded-lg shadow-md shadow-emerald-500/20 flex items-center justify-between transition-all"
                >
                  <span>Create New User ( New Registration )</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {viewMode === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <form onSubmit={handleRegister} className="space-y-3">
                {/* Input 1: Full Name */}
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full bg-slate-900/90 text-white placeholder-slate-400 text-sm font-medium px-4 py-3 rounded-lg border border-slate-700/70 shadow-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
                />

                {/* Input 2: User Name */}
                <div>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value)
                      setUsernameError('')
                    }}
                    placeholder="User Name"
                    required
                    className={`w-full bg-slate-900/90 text-white placeholder-slate-400 text-sm font-medium px-4 py-3 rounded-lg border shadow-md focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all ${
                      usernameError ? 'border-red-500 ring-2 ring-red-500/30' : 'border-slate-700/70'
                    }`}
                  />
                  {usernameError && (
                    <p className="text-xs text-red-400 font-semibold px-1 mt-1 flex items-center gap-1">
                      ⚠️ {usernameError}
                    </p>
                  )}
                </div>

                {/* Input 3: Email Address */}
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailError('')
                    }}
                    placeholder="Email Address"
                    required
                    className={`w-full bg-slate-900/90 text-white placeholder-slate-400 text-sm font-medium px-4 py-3 rounded-lg border shadow-md focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all ${
                      emailError ? 'border-red-500 ring-2 ring-red-500/30' : 'border-slate-700/70'
                    }`}
                  />
                  {emailError && (
                    <p className="text-xs text-red-400 font-semibold px-1 mt-1 flex items-center gap-1">
                      ⚠️ {emailError}
                    </p>
                  )}
                </div>

                {/* Input 4: Password */}
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordError('')
                    }}
                    placeholder="Password"
                    required
                    className={`w-full bg-slate-900/90 text-white placeholder-slate-400 text-sm font-medium px-4 py-3 rounded-lg border shadow-md focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all ${
                      passwordError ? 'border-red-500 ring-2 ring-red-500/30' : 'border-slate-700/70'
                    }`}
                  />
                </div>

                {/* Input 5: Confirm Password */}
                <div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      setPasswordError('')
                    }}
                    placeholder="Confirm Password"
                    required
                    className={`w-full bg-slate-900/90 text-white placeholder-slate-400 text-sm font-medium px-4 py-3 rounded-lg border shadow-md focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all ${
                      passwordError ? 'border-red-500 ring-2 ring-red-500/30' : 'border-slate-700/70'
                    }`}
                  />
                  {passwordError && (
                    <p className="text-xs text-red-400 font-semibold px-1 mt-1 flex items-center gap-1">
                      ⚠️ {passwordError}
                    </p>
                  )}
                </div>

                {authError && (
                  <div className="p-3 bg-red-500/15 border border-red-500/40 rounded-lg text-red-300 text-xs font-semibold flex items-center justify-center gap-2">
                    <span>⚠️</span>
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-black text-base rounded-lg shadow-lg shadow-violet-500/30 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>

              <button
                type="button"
                onClick={() => setViewMode('login')}
                className="w-full py-3 px-4 bg-slate-800/90 hover:bg-slate-700/90 text-indigo-200 font-semibold text-sm rounded-lg border border-indigo-500/30 shadow-md flex items-center justify-between transition-all"
              >
                <span>Already have an Account? ( Return to Sign In )</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {viewMode === 'forgot' && (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <form onSubmit={handleResetPassword} className="space-y-3">
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="User Name"
                  className="w-full bg-slate-900/90 text-white placeholder-slate-400 text-sm font-medium px-4 py-3.5 rounded-lg border border-slate-700/70 shadow-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
                />

                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Registered Email Address"
                  className="w-full bg-slate-900/90 text-white placeholder-slate-400 text-sm font-medium px-4 py-3.5 rounded-lg border border-slate-700/70 shadow-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
                />

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-black text-base rounded-lg shadow-lg shadow-violet-500/30 transition-all flex items-center justify-center gap-2"
                >
                  Send Reset Link
                </button>
              </form>

              <button
                type="button"
                onClick={() => setViewMode('login')}
                className="w-full py-3 px-4 bg-slate-800/90 hover:bg-slate-700/90 text-indigo-200 font-semibold text-sm rounded-lg border border-indigo-500/30 shadow-md flex items-center justify-between transition-all"
              >
                <span>Return to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 text-center pb-2">
        <p className="text-xs text-slate-400 font-medium">
          GrowthPilot AI System &bull; Intelligent Agentic Commerce Engine &copy; 2026
        </p>
      </div>
    </div>
  )
}
