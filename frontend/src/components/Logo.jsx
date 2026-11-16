export default function Logo({ className = 'h-11 w-11' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Logotipo: porción de pastel"
    >
      {/* Plato */}
      <rect x="3" y="41" width="42" height="3" rx="1.5" fill="#d6d3d1" />

      {/* Bizcocho inferior */}
      <rect x="6" y="31" width="36" height="10" rx="2" fill="#c68642" />
      {/* Crema */}
      <rect x="6" y="27" width="36" height="4" fill="#fff8dc" />
      {/* Bizcocho superior */}
      <rect x="6" y="18" width="36" height="9" fill="#d9a05b" />

      {/* Glaseado con gotas */}
      <path
        d="M6 18 V15 a3 3 0 0 1 3 -3 H39 a3 3 0 0 1 3 3 V18
           v3 a2 2 0 0 1 -4 0 v-1 a2 2 0 0 1 -4 0 v2 a2 2 0 0 1 -4 0 v-2
           a2 2 0 0 1 -4 0 v1 a2 2 0 0 1 -4 0 v-1 a2 2 0 0 1 -4 0 v2
           a2 2 0 0 1 -4 0 v-2 a2 2 0 0 1 -4 0 v1 a2 2 0 0 1 -4 0 z"
        fill="#fde047"
      />

      {/* Cereza */}
      <path d="M24 9 q2 -5 6 -6" stroke="#4d7c0f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="24" cy="10" r="4" fill="#dc2626" />
      <circle cx="22.8" cy="8.8" r="1.1" fill="#fecaca" />
    </svg>
  )
}