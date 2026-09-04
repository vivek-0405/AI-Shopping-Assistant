import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, useEffect } from 'react'
import { Navbar } from '@/components/Layout/Navbar'
import { LandingPage } from '@/components/Landing/LandingPage'
import { AgentPage } from '@/pages/AgentPage'
import { GrowthPage } from '@/pages/GrowthPage'
import { SavedPage } from '@/pages/SavedPage'
import { ShoppingListPage } from '@/pages/ShoppingListPage'
import { MissionsPage } from '@/pages/MissionsPage'
import { LoginPage } from '@/pages/LoginPage'
import ErrorBoundary from '@/components/Common/ErrorBoundary'
import { useAppStore } from '@/store/useAppStore'
import { useTheme } from '@/hooks/useTheme'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

const PAGE_MAP = {
  landing: LandingPage,
  agent: AgentPage,
  growth: GrowthPage,
  saved: SavedPage,
  list: ShoppingListPage,
  missions: MissionsPage,
  login: LoginPage,
}

export default function App() {
  const { activePage, user, setActivePage } = useAppStore()
  useTheme()

  // On initial website load or browser reload:
  useEffect(() => {
    if (user) {
      setActivePage('landing')
    } else {
      setActivePage('login')
    }
  }, [])

  const isLoggedOut = !user
  const isLoginPage = activePage === 'login'
  const ActivePage = isLoggedOut ? LoginPage : (PAGE_MAP[activePage] || LandingPage)

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] transition-colors duration-300">
      {!isLoggedOut && <Navbar />}

      <main className={isLoggedOut || isLoginPage ? 'pt-0' : 'pt-16'}>
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            <PageTransition key={isLoggedOut ? 'login' : activePage}>
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-[60vh]">
                  <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <ActivePage />
              </Suspense>
            </PageTransition>
          </AnimatePresence>
        </ErrorBoundary>
      </main>
    </div>
  )
}