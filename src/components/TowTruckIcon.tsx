export default function TowTruckIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Truck cab */}
      <path d="M1 14h6V8a1 1 0 0 1 1-1h3l2.5 3H17a1 1 0 0 1 1 1v3" />
      {/* Flatbed */}
      <path d="M1 14v2a1 1 0 0 0 1 1h1" />
      <path d="M11 17h3" />
      <path d="M18 14v2a1 1 0 0 0 1 1h1" />
      {/* Wheels */}
      <circle cx="6" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      {/* Tow boom/hook */}
      <path d="M18 10l4-5" />
      <path d="M22 5l-1 2.5" />
      <path d="M21 7.5c0 .5-.5 1-1 1s-1-.5-1-1" />
    </svg>
  )
}
