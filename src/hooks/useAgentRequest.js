import { useRef, useCallback } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { generateShoppingMission } from '@/services/ai'

export function useAgentRequest() {
  const abortRef = useRef(null)
  const requestIdRef = useRef(0)
  const { setAgentState, setCurrentMission, addRecentMission, clearCompare, addToCompare } = useAppStore()

  const execute = useCallback(
    async (userInput) => {
      if (abortRef.current) {
        abortRef.current.abort()
      }

      const controller = new AbortController()
      abortRef.current = controller
      const currentRequestId = ++requestIdRef.current

      clearCompare()
      setAgentState('loading')

      const timeoutId = setTimeout(() => {
        if (requestIdRef.current === currentRequestId) {
          controller.abort()
          setAgentState('error', 'The AI agent is taking too long. Please try again.')
        }
      }, 30000)

      try {
        const result = await generateShoppingMission(userInput, controller.signal)

        if (requestIdRef.current !== currentRequestId) return

        clearTimeout(timeoutId)
        setCurrentMission(result)

        // Only open comparison automatically if the user explicitly asked to compare
        const isCompareRequested = /compare|comparison|\bvs\b|versus|difference\b/i.test(userInput)
        if (isCompareRequested && result.recommendations?.length >= 2) {
          result.recommendations.slice(0, 3).forEach((p) => addToCompare(p.id))
        }

        setAgentState('success')
        addRecentMission({
          title: result.mission.title,
          budget: result.mission.budget,
          currency: result.mission.currency,
          matchScore: result.recommendations[0]?.matchScore || 0,
          productCount: result.recommendations.length,
        })
      } catch (err) {
        clearTimeout(timeoutId)

        if (requestIdRef.current !== currentRequestId) return

        if (err.name === 'AbortError' || err.message === 'Request aborted') return

        const errorMessage = err.message || 'Something went wrong. Please try again.'

        setAgentState('error', errorMessage)
      } finally {
        abortRef.current = null
      }
    },
    [setAgentState, setCurrentMission, addRecentMission]
  )

  const cancel = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
    }
    setAgentState('idle')
  }, [setAgentState])

  return { execute, cancel }
}