import { motion } from 'framer-motion'
import { Sun, Moon, Sparkles, ShoppingBag, BarChart3, Heart, List, Clock, Menu, X, User, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useAppStore } from '@/store/useAppStore'
import { cn } from '@/utils/cn'
import { GradientRingLogo } from '@/components/Common/GradientRingLogo'
import { OrangeGlossyOrb } from '@/components/Common/OrangeGlossyOrb'

const navItems = [
  { id: 'agent', label: 'AI Agent', icon: OrangeGlossyOrb },
  { id: 'growth', label: 'Growth', icon: BarChart3 },
  { id: 'saved', label: 'Saved', icon: Heart },
  { id: 'list', label: 'Shopping List', icon: List },
  { id: 'missions', label: 'Missions', icon: Clock },
]

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { activePage, setActivePage, user, logoutUser } = useAppStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  if (activePage === 'login' || !user) return null

  return (
    <header className={cn(
      'fixed top-0 inset-x-0 z-50 transition-transform duration-300',
      visible ? 'translate-y-0' : '-translate-y-full'
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setActivePage('landing')}
          className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white"
        >
          <GradientRingLogo className="w-8 h-8" />
          <span className="text-base font-extrabold tracking-tight">GrowthPilot AI</span>
        </button>

        {/* Desktop Nav */}
        {activePage !== 'landing' && (
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActivePage(id)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  activePage === id
                    ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            aria-label="Toggle theme"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.div>
          </button>

          {/* User Auth / Login Button */}
          {user ? (
            <button
              onClick={() => setActivePage('login')}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full glass hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-brand-500/20 cursor-pointer"
              title="View Profile & Upload Photo"
            >
              {user.avatar && !user.avatar.includes('unsplash.com') ? (
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-slate-300" />
                </div>
              )}
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[90px] truncate">
                {user.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setActivePage('login')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm',
                activePage === 'login'
                  ? 'bg-brand-500 text-white'
                  : 'btn-primary'
              )}
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile menu */}
          {activePage !== 'landing' && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {activePage !== 'landing' && mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass border-t border-white/10 dark:border-white/5 px-4 py-3 space-y-1"
        >
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActivePage(id); setMobileOpen(false) }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                activePage === id
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </motion.div>
      )}
    </header>
  )
}