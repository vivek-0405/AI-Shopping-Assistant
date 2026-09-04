import { useState, useEffect, useRef } from 'react'

export function useCountAnimation(target, duration = 2000, startOnMount = true) {
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!startOnMount || startedRef.current) return
    startedRef.current = true

    const startTime = Date.now()
    const startValue = 0

    const update = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(Math.round(startValue + (target - startValue) * eased))

      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }, [target, duration, startOnMount])

  return count
}