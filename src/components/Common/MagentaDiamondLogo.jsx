export function MagentaDiamondLogo({ className = 'w-7 h-7' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="magentaDiamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e91e63" />
          <stop offset="45%" stopColor="#c2005b" />
          <stop offset="100%" stopColor="#880e4f" />
        </linearGradient>
      </defs>
      <rect
        x="22"
        y="22"
        width="56"
        height="56"
        rx="16"
        transform="rotate(45 50 50)"
        fill="url(#magentaDiamondGrad)"
      />
    </svg>
  )
}
