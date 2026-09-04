import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

export function useTheme() {
  const { theme, setTheme, toggleTheme } = useAppStore()

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const stored = localStorage.getItem('growthpilot-store')
    if (!stored) {
      setTheme(mediaQuery.matches ? 'dark' : 'light')
    }
  }, [setTheme])

  return { theme, toggleTheme }
}