export function GradientRingLogo({ className = 'w-8 h-8' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ringGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="30%" stopColor="#1e88e5" />
          <stop offset="65%" stopColor="#9c27b0" />
          <stop offset="100%" stopColor="#ff4081" />
        </linearGradient>
        <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#1e88e5" floodOpacity="0.4" />
        </filter>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="34"
        stroke="url(#ringGradient)"
        strokeWidth="15"
        filter="url(#ringGlow)"
      />
    </svg>
  )
}
