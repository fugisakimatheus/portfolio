# Matheus Fugisaki — Portfolio

Personal portfolio site for a senior front-end developer. Single-page layout with smooth scroll, bilingual UI (PT/EN), and content driven from typed data files.

**Live:** [https://matheusfugisaki.site](https://https://matheusfugisaki.site)

## Stack

| Layer | Tools |
| --- | --- |
| UI | React 19, TypeScript, Tailwind CSS v4 |
| Build | Vite 8 |
| Motion | Framer Motion, Lenis (smooth scroll) |
| i18n | i18next, react-i18next |
| Icons | Lucide React, react-icons (Simple Icons) |
| Analytics | Vercel Analytics, Speed Insights |
| Quality | Biome, Vitest, Testing Library |

## Features

- **Hero** — profile, availability badge, CTAs
- **Career** — alternating timeline with expandable descriptions
- **Projects** — bento grid (desktop) and stacked cards (mobile)
- **Skills** — grouped cards (front-end, tools, testing) with brand-colored chips
- **Contact** — email CTA and social channel cards
- **UX** — custom cursor (desktop), scroll progress, scroll-spy nav, reduced-motion support
- **i18n** — Portuguese and English (`locales/`)

## Project structure

```
portfolio/
├── public/                 # Static assets (favicon, profile, project screenshots)
├── locales/
│   ├── pt.json             # UI strings (nav, sections, labels)
│   └── en.json
├── src/
│   ├── App.tsx             # Page shell and section order
│   ├── main.tsx            # Entry + fonts
│   ├── index.css           # Tailwind + global styles
│   ├── styles/
│   │   └── tokens.css      # Design tokens (colors, nav height)
│   ├── content/
│   │   ├── site.ts         # Profile, career, projects, skills, contact
│   │   ├── nav.ts          # Section IDs for navigation
│   │   └── types.ts        # Content TypeScript types
│   ├── i18n/
│   │   └── index.ts        # i18next setup and locale persistence
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx
│   │   ├── Career.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   ├── career/         # Career card + expandable description
│   │   ├── contact/        # Channel cards, copy email
│   │   └── projects/       # Bento, mobile list, project cards
│   ├── components/
│   │   ├── brand/          # Logo
│   │   ├── icons/          # Custom SVG icons (Playwright, Zustand)
│   │   ├── layout/         # Nav, footer, cursor, scroll progress
│   │   ├── motion/         # Scroll animations (Framer Motion)
│   │   ├── providers/      # Lenis smooth scroll
│   │   ├── seo/            # Document head (title, meta)
│   │   └── ui/             # Buttons, cards, tags, sections
│   ├── hooks/              # Locale, scroll spy, reduced motion, etc.
│   ├── lib/                # Utilities (cn, layout, skills icons, project layout)
│   └── test/               # Vitest setup
├── docs/superpowers/       # Design spec and implementation notes
├── biome.json
├── vite.config.ts
└── package.json
```

## Getting started

Requires **Node.js 20+**.

```bash
# install dependencies (pnpm recommended — lockfile present)
pnpm install

# development server
pnpm dev

# production build
pnpm build

# preview production build
pnpm preview
```

npm and yarn work as well (`npm install`, `npm run dev`, etc.).

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Typecheck + production build to `dist/` |
| `pnpm preview` | Serve `dist/` locally |
| `pnpm lint` | Run Biome (lint + format check) |
| `pnpm lint:fix` | Auto-fix with Biome |
| `pnpm format` | Format with Biome |
| `pnpm test` | Run Vitest once |
| `pnpm test:watch` | Vitest in watch mode |

## Editing content

Most copy and lists live in one place:

- **`src/content/site.ts`** — name, bio, career entries, projects, skills, contact links
- **`locales/pt.json`** & **`locales/en.json`** — navigation labels, section titles, UI microcopy

Profile avatar: `public/profile/avatar.jpg`  
Project images: `public/projects/`  
Skill icons: map slugs in `src/lib/skillIcons.tsx` (see `SkillEntry.icon` in `types.ts`).

After changing content, run `pnpm build` to verify types and build output.

## Deployment

Built as a static SPA (`dist/`). `package.json` sets `homepage` for GitHub Pages. Deploy `dist` to your host (GitHub Pages, Vercel, etc.).

## License

Private project — all rights reserved unless stated otherwise.
