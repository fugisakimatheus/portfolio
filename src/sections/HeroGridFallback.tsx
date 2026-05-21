export function HeroGridFallback() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          'linear-gradient(var(--accent-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--accent-secondary) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />
  )
}
