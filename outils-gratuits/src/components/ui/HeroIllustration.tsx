export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 320"
      className="mx-auto h-auto w-full max-w-md text-brand-500 dark:text-brand-400"
      aria-hidden="true"
      fill="none"
    >
      {/* Background panel */}
      <rect x="20" y="30" width="440" height="260" rx="16" className="fill-surface stroke-line dark:fill-surface-dark dark:stroke-line-dark" strokeWidth="2" />

      {/* Top bar dots (window chrome) */}
      <circle cx="48" cy="56" r="5" className="fill-signal" />
      <circle cx="68" cy="56" r="5" className="fill-line dark:fill-line-dark" />
      <circle cx="88" cy="56" r="5" className="fill-line dark:fill-line-dark" />

      {/* Bar chart */}
      <rect x="48" y="150" width="28" height="100" rx="4" className="fill-brand-200 dark:fill-brand-800" />
      <rect x="86" y="120" width="28" height="130" rx="4" className="fill-brand-400 dark:fill-brand-600" />
      <rect x="124" y="90" width="28" height="160" rx="4" className="fill-brand-500" />

      {/* Readout panel */}
      <rect x="180" y="90" width="260" height="70" rx="8" className="fill-ink dark:fill-black/40" />
      <text x="196" y="120" className="fill-signal font-mono text-[13px] font-bold">
        1 247,50 €
      </text>
      <text x="196" y="140" className="fill-white/50 font-mono text-[9px]">
        RÉSULTAT INSTANTANÉ
      </text>

      {/* Circular percentage ring */}
      <circle cx="330" cy="220" r="34" className="stroke-line dark:stroke-line-dark" strokeWidth="8" fill="none" />
      <circle
        cx="330"
        cy="220"
        r="34"
        className="stroke-signal"
        strokeWidth="8"
        fill="none"
        strokeDasharray="213.6"
        strokeDashoffset="64"
        strokeLinecap="round"
        transform="rotate(-90 330 220)"
      />
      <text x="330" y="225" textAnchor="middle" className="fill-ink text-[13px] font-bold dark:fill-ink-dark">
        70%
      </text>

      {/* Small QR-like grid icon */}
      <g transform="translate(400,192)">
        <rect width="56" height="56" rx="6" className="fill-bg dark:fill-bg-dark" />
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={8 + col * 11}
              y={8 + row * 11}
              width="8"
              height="8"
              className={(row + col) % 2 === 0 ? "fill-ink dark:fill-ink-dark" : "fill-transparent"}
            />
          ))
        )}
      </g>
    </svg>
  );
}
