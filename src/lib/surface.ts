/** Shared surface styles for cards and panels (minimal theme). */
export const surfaceCard = 'rounded-2xl border border-(--border-subtle) bg-(--bg-elevated)'

export const surfaceCardHover =
  'transition duration-200 hover:border-(--text-muted)/25 hover:bg-white/2'

export const surfacePanel = `${surfaceCard} ${surfaceCardHover}`

export const badgeMuted =
  'rounded-full border border-(--border-subtle) bg-(--bg-elevated) px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-(--text-muted)'

export const badgeType =
  'rounded-full border border-(--border-subtle) bg-(--bg-base) px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-(--text-muted)'
