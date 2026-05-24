# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (PT/EN), dark premium single-page portfolio with career timeline, rich animations, and JSON-driven content on React 19 + Vite 8.

**Architecture:** Single-page scroll with Lenis, fixed glass nav + scroll spy, sections as isolated components fed by typed `src/content/site.ts`, UI strings in `locales/`. WebGL Hero lazy-loaded; `prefers-reduced-motion` disables heavy effects.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS v4, Framer Motion, Lenis, react-i18next, @react-three/fiber (lazy), Lucide React, Vitest

**Spec:** `docs/superpowers/specs/2026-05-21-portfolio-design.md`

---

## Initial Content — GitHub Source

**Profile URL:** [https://github.com/fugisakimatheus](https://github.com/fugisakimatheus)  
**API (optional refresh):** `GET https://api.github.com/users/fugisakimatheus` and `GET https://api.github.com/users/fugisakimatheus/repos?sort=updated&per_page=20`

| Field | Source | Value |
|-------|--------|-------|
| Name | GitHub API `name` | Matheus Fugisaki |
| Title | GitHub API `bio` + company | Sênior front-end developer @ Nexgy |
| Avatar | GitHub API `avatar_url` | `https://avatars.githubusercontent.com/u/77367287?v=4` |
| Site | GitHub API `blog` | `https://matheusfugisaki.vercel.app` |
| GitHub | Profile | `https://github.com/fugisakimatheus` |
| LinkedIn | Profile README | `https://linkedin.com/in/matheus-fugisaki` |
| Email | Not public on GitHub | `matheusgfmaciel@gmail.com` |

**Projects (from pinned repos + API descriptions):** use repo `description` when present; expand PT/EN copy in `site.ts`; **MOCK** `liveUrl` only where `homepage` exists on API (most repos have `null`).

**Career timeline:** Nexgy entry from GitHub `company` + `bio`; earlier roles are **MOCK** (labeled in commit message) until user supplies real history.

**Project screenshots:** **MOCK** — no screenshots in GitHub API. Use `public/projects/{id}.png` paths; until real assets exist, `ProjectImage` shows initials fallback (spec). Optional Task 19: add placeholder PNGs or capture from deployed demos.

---

## File Map

| Path | Responsibility |
|------|----------------|
| `src/lib/cn.ts` | `clsx` + `tailwind-merge` helper |
| `src/lib/localized.ts` | `getLocalized`, `LocalizedString` resolver |
| `src/content/types.ts` | All content TypeScript types |
| `src/content/site.ts` | User-editable portfolio data (placeholder + real) |
| `src/i18n/index.ts` | i18next init, detector, localStorage override |
| `locales/pt.json` | UI strings (nav, CTAs, section titles) |
| `locales/en.json` | UI strings (English) |
| `src/styles/tokens.css` | CSS custom properties from spec |
| `src/index.css` | Tailwind import + globals |
| `src/hooks/useReducedMotion.ts` | Media query hook |
| `src/hooks/useScrollSpy.ts` | Active section id from scroll |
| `src/components/ui/Button.tsx` | Primary / ghost CTA |
| `src/components/ui/Section.tsx` | Section wrapper + `id` + title |
| `src/components/ui/GlassCard.tsx` | Glass panel card |
| `src/components/ui/Tag.tsx` | Skill / tech pill |
| `src/components/ui/ProjectImage.tsx` | Image with initials fallback |
| `src/components/layout/Nav.tsx` | Fixed nav, anchors, language toggle |
| `src/components/layout/Footer.tsx` | Social links from content |
| `src/components/layout/ScrollProgress.tsx` | Top progress bar |
| `src/components/layout/CustomCursor.tsx` | Desktop cursor (optional mount) |
| `src/components/motion/MotionSection.tsx` | IntersectionObserver + Framer reveal |
| `src/components/motion/variants.ts` | Shared animation variants |
| `src/components/providers/LenisProvider.tsx` | Lenis init (respects reduced motion) |
| `src/sections/Hero.tsx` | Hero + lazy WebGL background |
| `src/sections/HeroScene.tsx` | Three.js grid (lazy) |
| `src/sections/HeroGridFallback.tsx` | CSS grid when no WebGL |
| `src/sections/About.tsx` | Bio + avatar placeholder |
| `src/sections/Career.tsx` | Timeline |
| `src/sections/Projects.tsx` | Project grid |
| `src/sections/Skills.tsx` | Skill tags by category |
| `src/sections/Contact.tsx` | Contact CTAs |
| `src/components/seo/DocumentHead.tsx` | Dynamic meta + JSON-LD |
| `src/App.tsx` | Compose layout + sections |
| `src/main.tsx` | Import i18n before render |
| `src/test/setup.ts` | Vitest jsdom setup |
| `src/lib/cn.test.ts` | cn tests |
| `src/lib/localized.test.ts` | getLocalized tests |
| `src/hooks/useReducedMotion.test.ts` | Hook tests |
| `vite.config.ts` | Tailwind + Vitest |
| `index.html` | Base meta, `#root` full width |

**Remove:** `src/App.css`, Vite boilerplate sections in `App.tsx`, unused `public/icons.svg` references.

---

### Task 1: Dependencies, Tailwind, Vitest, git

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `src/test/setup.ts`
- Modify: `src/index.css`
- Delete: `src/App.css`

- [ ] **Step 1: Install dependencies**

Run:
```bash
cd /Users/fugizap/development/startup/portfolio
pnpm add tailwindcss @tailwindcss/vite framer-motion lenis react-i18next i18next i18next-browser-languagedetector clsx tailwind-merge lucide-react
pnpm add @react-three/fiber three
pnpm add -D @types/three vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @fontsource/syne @fontsource/dm-sans @fontsource/jetbrains-mono
```

- [ ] **Step 2: Add test script to `package.json`**

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 3: Configure Vite + Vitest in `vite.config.ts`**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})
```

- [ ] **Step 4: Create `src/test/setup.ts`**

```typescript
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 5: Replace `src/index.css`**

```css
@import "tailwindcss";
@import "./styles/tokens.css";

@theme {
  --font-display: "Syne", system-ui, sans-serif;
  --font-body: "DM Sans", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

html {
  scroll-behavior: auto; /* Lenis handles smooth scroll */
}

body {
  margin: 0;
  min-height: 100svh;
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
}

#root {
  width: 100%;
  max-width: 100%;
  margin: 0;
  text-align: left;
  min-height: 100svh;
}
```

- [ ] **Step 6: Initialize git (if not present) and commit**

Run:
```bash
git init
git add package.json pnpm-lock.yaml vite.config.ts src/index.css src/test/setup.ts
git commit -m "chore: add portfolio dependencies, tailwind, and vitest"
```

Expected: commit succeeds.

---

### Task 2: Design tokens

**Files:**
- Create: `src/styles/tokens.css`

- [ ] **Step 1: Create `src/styles/tokens.css`**

```css
:root {
  --bg-base: #0a0a0f;
  --bg-elevated: #12121a;
  --surface-glass: rgba(255, 255, 255, 0.04);
  --border-subtle: rgba(255, 255, 255, 0.08);
  --text-primary: #f4f4f5;
  --text-muted: #a1a1aa;
  --accent: #6366f1;
  --accent-glow: #818cf8;
  --accent-secondary: #22d3ee;
  --nav-height: 4rem;
}
```

- [ ] **Step 2: Verify dev server starts**

Run: `pnpm dev`  
Expected: no CSS import errors; page may still show old App until Task 18.

- [ ] **Step 3: Commit**

```bash
git add src/styles/tokens.css src/index.css
git commit -m "feat: add dark premium design tokens"
```

---

### Task 3: `cn` utility + test

**Files:**
- Create: `src/lib/cn.ts`
- Create: `src/lib/cn.test.ts`

- [ ] **Step 1: Write failing test `src/lib/cn.test.ts`**

```typescript
import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('merges tailwind classes and resolves conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'extra')).toBe('base extra')
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

Run: `pnpm test src/lib/cn.test.ts`  
Expected: FAIL — cannot find module `./cn`

- [ ] **Step 3: Implement `src/lib/cn.ts`**

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 4: Run test — expect PASS**

Run: `pnpm test src/lib/cn.test.ts`  
Expected: 2 tests passed

- [ ] **Step 5: Commit**

```bash
git add src/lib/cn.ts src/lib/cn.test.ts
git commit -m "feat: add cn utility with tests"
```

---

### Task 4: Types, `getLocalized`, content scaffold

**Files:**
- Create: `src/content/types.ts`
- Create: `src/lib/localized.ts`
- Create: `src/lib/localized.test.ts`
- Create: `src/content/site.ts`

- [ ] **Step 1: Write failing test `src/lib/localized.test.ts`**

```typescript
import { describe, it, expect } from 'vitest'
import { getLocalized } from './localized'

describe('getLocalized', () => {
  it('returns pt string when locale is pt', () => {
    expect(getLocalized({ pt: 'Olá', en: 'Hello' }, 'pt')).toBe('Olá')
  })

  it('returns en string when locale is en', () => {
    expect(getLocalized({ pt: 'Olá', en: 'Hello' }, 'en')).toBe('Hello')
  })

  it('falls back to en when pt is empty', () => {
    expect(getLocalized({ pt: '', en: 'Hello' }, 'pt')).toBe('Hello')
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

Run: `pnpm test src/lib/localized.test.ts`  
Expected: FAIL

- [ ] **Step 3: Create `src/content/types.ts`**

```typescript
export type Locale = 'pt' | 'en'

export type LocalizedString = { pt: string; en: string }

export type CareerType = 'job' | 'legal' | 'freelance' | 'internship' | 'part-time'

export type CareerEntry = {
  id: string
  company: string
  role: LocalizedString
  period: LocalizedString
  description?: LocalizedString
  technologies?: string[]
  type: CareerType
}

export type ProjectEntry = {
  id: string
  title: LocalizedString
  description: LocalizedString
  image: string
  liveUrl?: string
  repoUrl?: string
  tags: string[]
  featured: boolean
}

export type SkillEntry = {
  name: string
  category: 'frontend' | 'tools' | 'other'
}

export type SocialLink = {
  platform: string
  url: string
}

export type SiteContent = {
  profile: {
    name: string
    title: LocalizedString
    bio: LocalizedString
    avatar?: string
    resumeUrl?: string
    socials: SocialLink[]
  }
  career: CareerEntry[]
  projects: ProjectEntry[]
  skills: SkillEntry[]
  contact: {
    email: string
    calendly?: string
    whatsapp?: string
    github: string
    linkedin: string
  }
}
```

- [ ] **Step 4: Implement `src/lib/localized.ts`**

```typescript
import type { Locale, LocalizedString } from '../content/types'

export function getLocalized(value: LocalizedString, locale: Locale): string {
  const primary = locale === 'pt' ? value.pt : value.en
  const fallback = locale === 'pt' ? value.en : value.pt
  return primary.trim() ? primary : fallback
}
```

- [ ] **Step 5: Create `src/content/site.ts` from GitHub profile**

Seed data from [fugisakimatheus](https://github.com/fugisakimatheus). Fields marked `// MOCK` need user confirmation.

```typescript
import type { SiteContent } from './types'

export const siteContent: SiteContent = {
  profile: {
    name: 'Matheus Fugisaki',
    title: {
      pt: 'Desenvolvedor Front-end Sênior',
      en: 'Senior Front-end Developer',
    },
    bio: {
      pt: 'Desenvolvedor front-end sênior na Nexgy. Construo interfaces modernas com React, TypeScript e Next.js.',
      en: 'Senior front-end developer at Nexgy. I build modern interfaces with React, TypeScript, and Next.js.',
    },
    avatar: 'https://avatars.githubusercontent.com/u/77367287?v=4',
    socials: [
      { platform: 'github', url: 'https://github.com/fugisakimatheus' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/matheus-fugisaki' },
      { platform: 'website', url: 'https://matheusfugisaki.vercel.app' },
    ],
  },
  career: [
    {
      id: 'nexgy',
      company: 'Nexgy',
      role: {
        pt: 'Desenvolvedor Front-end Sênior',
        en: 'Senior Front-end Developer',
      },
      period: { pt: 'Atual', en: 'Present' }, // MOCK: confirm start year
      description: {
        pt: 'Desenvolvimento de interfaces web e produtos digitais com React e TypeScript.',
        en: 'Building web interfaces and digital products with React and TypeScript.',
      },
      technologies: ['React', 'TypeScript', 'Next.js'],
      type: 'job',
    },
    {
      id: 'freelance-mock',
      company: 'Projetos Freelance', // MOCK
      role: {
        pt: 'Desenvolvedor Front-end',
        en: 'Front-end Developer',
      },
      period: { pt: '2021 – 2023', en: '2021 – 2023' }, // MOCK: adjust dates
      description: {
        pt: 'Projetos web para clientes com React, dashboards e landing pages.',
        en: 'Web projects for clients using React, dashboards, and landing pages.',
      },
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      type: 'freelance',
    },
  ],
  projects: [
    {
      id: 'energy-dashboard',
      title: { pt: 'Energy Dashboard', en: 'Energy Dashboard' },
      description: {
        pt: 'Dashboard de dados de energia construído com Next.js e TypeScript.',
        en: 'An energy data dashboard built with Next.js and TypeScript.',
      },
      image: '/projects/energy-dashboard.png', // MOCK screenshot until added
      repoUrl: 'https://github.com/fugisakimatheus/energy-dashboard',
      tags: ['Next.js', 'TypeScript', 'Dashboard'],
      featured: true,
    },
    {
      id: 'code-hero-angular',
      title: { pt: 'Code Hero', en: 'Code Hero' },
      description: {
        pt: 'Catálogo de personagens Marvel consumindo API pública, feito com Angular.',
        en: 'Marvel characters catalog using a public API, built with Angular.',
      },
      image: '/projects/code-hero-angular.png',
      repoUrl: 'https://github.com/fugisakimatheus/code-hero-angular',
      tags: ['Angular', 'TypeScript', 'API'],
      featured: true,
    },
    {
      id: 'currency-converter',
      title: { pt: 'Conversor de Moedas', en: 'Currency Converter' },
      description: {
        pt: 'Aplicativo React para conversão de moedas em tempo real.',
        en: 'React app for real-time currency conversion.',
      },
      image: '/projects/currency-converter.png',
      repoUrl: 'https://github.com/fugisakimatheus/currency-converter',
      tags: ['React', 'TypeScript'],
      featured: true,
    },
    {
      id: 'strategy-pattern-example',
      title: { pt: 'Strategy Pattern', en: 'Strategy Pattern' },
      description: {
        pt: 'Exemplo do padrão Strategy em React com TypeScript.',
        en: 'Strategy design pattern example in React with TypeScript.',
      },
      image: '/projects/strategy-pattern-example.png',
      repoUrl: 'https://github.com/fugisakimatheus/strategy-pattern-example',
      tags: ['React', 'TypeScript', 'Patterns'],
      featured: true,
    },
    {
      id: 'my-rankings',
      title: { pt: 'My Rankings', en: 'My Rankings' },
      description: {
        pt: 'Plataforma de entretenimento para ranking de partidas.',
        en: 'Entertainment platform for match rankings.',
      },
      image: '/projects/my-rankings.png',
      repoUrl: 'https://github.com/fugisakimatheus/my-rankings',
      tags: ['React', 'TypeScript'],
      featured: false,
    },
    {
      id: 'youtube-clone',
      title: { pt: 'YouTube Clone', en: 'YouTube Clone' },
      description: {
        pt: 'Clone da interface do YouTube no front-end.',
        en: 'YouTube front-end UI clone.',
      },
      image: '/projects/youtube-clone.png',
      repoUrl: 'https://github.com/fugisakimatheus/youtube-clone',
      tags: ['React', 'CSS'],
      featured: false,
    },
  ],
  skills: [
    { name: 'React', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'Angular', category: 'frontend' },
    { name: 'Tailwind CSS', category: 'frontend' },
    { name: 'React Native', category: 'frontend' },
    { name: 'Vite', category: 'tools' },
    { name: 'Git', category: 'tools' },
  ],
  contact: {
    email: 'contato@matheusfugisaki.dev', // MOCK — GitHub does not expose email
    github: 'https://github.com/fugisakimatheus',
    linkedin: 'https://linkedin.com/in/matheus-fugisaki',
  },
}
```

- [ ] **Step 6: Create `public/projects/.gitkeep`**

```bash
mkdir -p public/projects
touch public/projects/.gitkeep
```

- [ ] **Step 7: Run tests — expect PASS**

Run: `pnpm test src/lib/localized.test.ts`  
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/content src/lib/localized.ts src/lib/localized.test.ts public/projects
git commit -m "feat: add typed site content and localized string helper"
```

---

### Task 5: i18n setup

**Files:**
- Create: `locales/pt.json`
- Create: `locales/en.json`
- Create: `src/i18n/index.ts`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create `locales/pt.json`**

```json
{
  "nav": {
    "about": "Sobre",
    "career": "Carreira",
    "projects": "Projetos",
    "skills": "Skills",
    "contact": "Contato"
  },
  "cta": {
    "primary": "Vamos conversar",
    "viewProjects": "Ver projetos"
  },
  "sections": {
    "about": "Sobre",
    "career": "Carreira",
    "projects": "Projetos",
    "skills": "Skills",
    "contact": "Contato"
  },
  "career": {
    "job": "CLT",
    "freelance": "Freelance",
    "internship": "Estágio"
  },
  "projects": {
    "live": "Ver ao vivo",
    "repo": "Código"
  },
  "contact": {
    "heading": "Vamos construir algo juntos?",
    "subheading": "Disponível para freelas e projetos front-end."
  },
  "footer": {
    "built": "Feito com React + Vite"
  }
}
```

- [ ] **Step 2: Create `locales/en.json`**

```json
{
  "nav": {
    "about": "About",
    "career": "Career",
    "projects": "Projects",
    "skills": "Skills",
    "contact": "Contact"
  },
  "cta": {
    "primary": "Let's talk",
    "viewProjects": "View projects"
  },
  "sections": {
    "about": "About",
    "career": "Career",
    "projects": "Projects",
    "skills": "Skills",
    "contact": "Contact"
  },
  "career": {
    "job": "Full-time",
    "freelance": "Freelance",
    "internship": "Internship"
  },
  "projects": {
    "live": "Live demo",
    "repo": "Source"
  },
  "contact": {
    "heading": "Let's build something together",
    "subheading": "Available for freelance and front-end projects."
  },
  "footer": {
    "built": "Built with React + Vite"
  }
}
```

- [ ] **Step 3: Create `src/i18n/index.ts`**

```typescript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import pt from '../../locales/pt.json'
import en from '../../locales/en.json'

const STORAGE_KEY = 'portfolio-locale'

const saved = localStorage.getItem(STORAGE_KEY)
if (saved === 'pt' || saved === 'en') {
  i18n.use({
    type: 'languageDetector',
    detect: () => saved,
  })
} else {
  i18n.use(LanguageDetector)
}

void i18n.use(initReactI18next).init({
  resources: { pt: { translation: pt }, en: { translation: en } },
  fallbackLng: 'en',
  supportedLngs: ['pt', 'en'],
  detection: {
    order: ['localStorage', 'navigator'],
    lookupLocalStorage: STORAGE_KEY,
    caches: ['localStorage'],
    convertDetectedLanguage: (lng: string) => (lng.startsWith('pt') ? 'pt' : 'en'),
  },
  interpolation: { escapeValue: false },
})

export function setLocale(locale: 'pt' | 'en') {
  localStorage.setItem(STORAGE_KEY, locale)
  void i18n.changeLanguage(locale)
}

export default i18n
```

- [ ] **Step 4: Update `src/main.tsx`**

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 5: Add fonts in `src/main.tsx` (top of file, before i18n)**

```typescript
import '@fontsource/syne/700.css'
import '@fontsource/syne/800.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/jetbrains-mono/400.css'
```

- [ ] **Step 6: Manual check**

Run: `pnpm dev` — no i18n console errors.

- [ ] **Step 7: Commit**

```bash
git add locales src/i18n src/main.tsx
git commit -m "feat: configure pt/en i18n with browser detection"
```

---

### Task 6: `useReducedMotion` hook + test

**Files:**
- Create: `src/hooks/useReducedMotion.ts`
- Create: `src/hooks/useReducedMotion.test.ts`

- [ ] **Step 1: Write failing test**

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useReducedMotion } from './useReducedMotion'

describe('useReducedMotion', () => {
  let matchMediaListeners: Array<(e: MediaQueryListEvent) => void>

  beforeEach(() => {
    matchMediaListeners = []
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: query.includes('reduce'),
        media: query,
        addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
          matchMediaListeners.push(cb)
        },
        removeEventListener: vi.fn(),
      })),
    )
  })

  afterEach(() => vi.unstubAllGlobals())

  it('returns true when prefers-reduced-motion matches', () => {
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

Run: `pnpm test src/hooks/useReducedMotion.test.ts`

- [ ] **Step 3: Implement hook**

```typescript
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
```

- [ ] **Step 4: Run — expect PASS**

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useReducedMotion.ts src/hooks/useReducedMotion.test.ts
git commit -m "feat: add useReducedMotion hook"
```

---

### Task 7: Motion variants + `MotionSection`

**Files:**
- Create: `src/components/motion/variants.ts`
- Create: `src/components/motion/MotionSection.tsx`

- [ ] **Step 1: Create `src/components/motion/variants.ts`**

```typescript
import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

export const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
}
```

- [ ] **Step 2: Create `src/components/motion/MotionSection.tsx`**

```typescript
import { motion, useReducedMotion as useFramerReduced } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '../../lib/cn'
import { fadeUp, reducedFade } from './variants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Props = {
  children: React.ReactNode
  className?: string
  as?: 'section' | 'div'
}

export function MotionSection({ children, className, as = 'section' }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const framerReduced = useFramerReduced()
  const Component = as === 'section' ? motion.section : motion.div
  const variants = reduced || framerReduced ? reducedFade : fadeUp

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: reduced ? 0.2 : 0.5, ease: 'easeOut' }}
      className={cn(className)}
    >
      {children}
    </Component>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/motion
git commit -m "feat: add MotionSection and shared animation variants"
```

---

### Task 8: UI primitives (Button, Section, GlassCard, Tag, ProjectImage)

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Section.tsx`
- Create: `src/components/ui/GlassCard.tsx`
- Create: `src/components/ui/Tag.tsx`
- Create: `src/components/ui/ProjectImage.tsx`

- [ ] **Step 1: `Button.tsx`**

```typescript
import { cn } from '../../lib/cn'

type Props = React.ComponentProps<'a'> & {
  variant?: 'primary' | 'ghost'
}

export function Button({ variant = 'primary', className, children, ...props }: Props) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition',
        variant === 'primary' &&
          'bg-[var(--accent)] text-white hover:shadow-[0_0_24px_var(--accent-glow)]',
        variant === 'ghost' &&
          'border border-[var(--border-subtle)] bg-[var(--surface-glass)] text-[var(--text-primary)] backdrop-blur-xl hover:border-[var(--accent)]',
        className,
      )}
      {...props}
    />
  )
}
```

- [ ] **Step 2: `Section.tsx`**

```typescript
import { cn } from '../../lib/cn'

type Props = {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, title, children, className }: Props) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-20 px-6 py-24 md:px-12 lg:px-24', className)}
    >
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl">
        {title}
      </h2>
      <div className="mt-12">{children}</div>
    </section>
  )
}
```

- [ ] **Step 3: `GlassCard.tsx`**

```typescript
import { cn } from '../../lib/cn'

export function GlassCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] p-6 backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 4: `Tag.tsx`**

```typescript
import { cn } from '../../lib/cn'

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'rounded-full border border-[var(--border-subtle)] px-3 py-1 font-mono text-xs text-[var(--accent-secondary)]',
        className,
      )}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 5: `ProjectImage.tsx`**

```typescript
import { useState } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  src: string
  alt: string
  fallbackInitials: string
  className?: string
}

export function ProjectImage({ src, alt, fallbackInitials, className }: Props) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={cn(
          'flex aspect-video w-full items-center justify-center rounded-xl bg-[var(--bg-elevated)] text-2xl font-bold text-[var(--accent)]',
          className,
        )}
      >
        {fallbackInitials}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={cn('aspect-video w-full rounded-xl object-cover', className)}
    />
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ui
git commit -m "feat: add UI primitives Button, Section, GlassCard, Tag, ProjectImage"
```

---

### Task 9: Lenis provider + scroll progress + scroll spy

**Files:**
- Create: `src/components/providers/LenisProvider.tsx`
- Create: `src/components/layout/ScrollProgress.tsx`
- Create: `src/hooks/useScrollSpy.ts`

- [ ] **Step 1: `LenisProvider.tsx`**

```typescript
import Lenis from 'lenis'
import { useEffect } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [reduced])

  return <>{children}</>
}
```

- [ ] **Step 2: `ScrollProgress.tsx`**

```typescript
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-[var(--accent)]"
      style={{ scaleX }}
    />
  )
}
```

- [ ] **Step 3: `useScrollSpy.ts`**

```typescript
import { useEffect, useState } from 'react'

const SECTION_IDS = ['about', 'career', 'projects', 'skills', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export function useScrollSpy(): SectionId {
  const [active, setActive] = useState<SectionId>('about')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return active
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/providers src/components/layout/ScrollProgress.tsx src/hooks/useScrollSpy.ts
git commit -m "feat: add Lenis smooth scroll, progress bar, and scroll spy"
```

---

### Task 10: Nav + LanguageToggle + Footer

**Files:**
- Create: `src/components/layout/LanguageToggle.tsx`
- Create: `src/components/layout/Nav.tsx`
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: `LanguageToggle.tsx`**

```typescript
import { useTranslation } from 'react-i18next'
import { setLocale } from '../../i18n'
import { cn } from '../../lib/cn'

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const current = i18n.language.startsWith('pt') ? 'pt' : 'en'

  return (
    <div className="flex gap-1 rounded-full border border-[var(--border-subtle)] p-1 text-xs">
      {(['pt', 'en'] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => setLocale(lng)}
          className={cn(
            'rounded-full px-2 py-1 uppercase transition',
            current === lng
              ? 'bg-[var(--accent)] text-white'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
          )}
        >
          {lng}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: `Nav.tsx`**

```typescript
import { useTranslation } from 'react-i18next'
import { cn } from '../../lib/cn'
import { useScrollSpy, type SectionId } from '../../hooks/useScrollSpy'
import { LanguageToggle } from './LanguageToggle'
import { siteContent } from '../../content/site'

const LINKS: { id: SectionId; key: string }[] = [
  { id: 'about', key: 'nav.about' },
  { id: 'career', key: 'nav.career' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'contact', key: 'nav.contact' },
]

export function Nav() {
  const { t } = useTranslation()
  const active = useScrollSpy()
  const mailto = `mailto:${siteContent.contact.email}`

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="font-[family-name:var(--font-display)] font-bold text-[var(--text-primary)]">
          {siteContent.profile.name.split(' ')[0]}
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {LINKS.map(({ id, key }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  'text-sm transition',
                  active === id
                    ? 'text-[var(--accent-glow)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                )}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a href={mailto} className="hidden rounded-full bg-[var(--accent)] px-4 py-2 text-sm text-white md:inline-flex">
            {t('cta.primary')}
          </a>
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 3: `Footer.tsx`**

```typescript
import { useTranslation } from 'react-i18next'
import { siteContent } from '../../content/site'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border-subtle)] px-6 py-8 text-center text-sm text-[var(--text-muted)]">
      <p>
        © {year} {siteContent.profile.name}. {t('footer.built')}
      </p>
      <div className="mt-4 flex justify-center gap-4">
        {siteContent.profile.socials.map((s) => (
          <a
            key={s.platform}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="capitalize hover:text-[var(--accent-glow)]"
          >
            {s.platform}
          </a>
        ))}
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout
git commit -m "feat: add Nav, LanguageToggle, and Footer"
```

---

### Task 11: Hero — CSS fallback + motion + lazy WebGL

**Files:**
- Create: `src/sections/HeroGridFallback.tsx`
- Create: `src/sections/HeroScene.tsx`
- Create: `src/sections/Hero.tsx`

- [ ] **Step 1: `HeroGridFallback.tsx`**

```typescript
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
```

- [ ] **Step 2: `HeroScene.tsx` (minimal rotating grid)**

```typescript
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

function GridPlane() {
  const ref = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.05
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.5, 0, 0]}>
      <planeGeometry args={[12, 12, 24, 24]} />
      <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.15} />
    </mesh>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <GridPlane />
      </Canvas>
    </div>
  )
}
```

- [ ] **Step 3: `Hero.tsx`**

```typescript
import { lazy, Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { siteContent } from '../content/site'
import { getLocalized } from '../lib/localized'
import { Button } from '../components/ui/Button'
import { HeroGridFallback } from './HeroGridFallback'
import { useReducedMotion } from '../hooks/useReducedMotion'

const HeroScene = lazy(() =>
  import('./HeroScene').then((m) => ({ default: m.HeroScene })),
)

export function Hero() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language.startsWith('pt') ? 'pt' : 'en'
  const reduced = useReducedMotion()
  const [webgl, setWebgl] = useState(false)

  useEffect(() => {
    if (reduced) return
    try {
      const canvas = document.createElement('canvas')
      setWebgl(!!canvas.getContext('webgl'))
    } catch {
      setWebgl(false)
    }
  }, [reduced])

  const { profile, contact } = siteContent
  const mailto = `mailto:${contact.email}`

  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center"
    >
      {webgl ? (
        <Suspense fallback={<HeroGridFallback />}>
          <HeroScene />
        </Suspense>
      ) : (
        <HeroGridFallback />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.2 : 0.6 }}
        className="relative z-10 max-w-3xl"
      >
        <p className="font-mono text-sm text-[var(--accent-secondary)]">
          {getLocalized(profile.title, locale)}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-tight md:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-6 text-lg text-[var(--text-muted)]">
          {getLocalized(profile.bio, locale)}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={mailto}>{t('cta.primary')}</Button>
          <Button variant="ghost" href="#projects">
            {t('cta.viewProjects')}
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Manual check**

Run: `pnpm dev` — Hero renders, WebGL or fallback grid visible, CTAs work.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Hero.tsx src/sections/HeroScene.tsx src/sections/HeroGridFallback.tsx
git commit -m "feat: add Hero with lazy WebGL and CSS fallback"
```

---

### Task 12: About section

**Files:**
- Create: `src/sections/About.tsx`

- [ ] **Step 1: Implement `About.tsx`**

```typescript
import { useTranslation } from 'react-i18next'
import { siteContent } from '../content/site'
import { getLocalized } from '../lib/localized'
import { Section } from '../components/ui/Section'
import { MotionSection } from '../components/motion/MotionSection'
import { GlassCard } from '../components/ui/GlassCard'

function Avatar({ name, src }: { name: string; src?: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="h-32 w-32 rounded-2xl object-cover"
      />
    )
  }

  return (
    <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-[var(--bg-elevated)] text-3xl font-bold text-[var(--accent)]">
      {initials}
    </div>
  )
}

export function About() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language.startsWith('pt') ? 'pt' : 'en'
  const { profile } = siteContent

  return (
    <MotionSection>
      <Section id="about" title={t('sections.about')}>
        <GlassCard className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <Avatar name={profile.name} src={profile.avatar} />
          <div className="text-[var(--text-muted)] leading-relaxed">
            <p className="text-lg text-[var(--text-primary)]">{profile.name}</p>
            <p className="mt-4">{getLocalized(profile.bio, locale)}</p>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-[var(--accent-glow)] hover:underline"
              >
                Resume / CV
              </a>
            )}
          </div>
        </GlassCard>
      </Section>
    </MotionSection>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/About.tsx
git commit -m "feat: add About section with avatar fallback"
```

---

### Task 13: Career timeline

**Files:**
- Create: `src/sections/Career.tsx`

- [ ] **Step 1: Implement `Career.tsx`**

```typescript
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Briefcase, Building2, GraduationCap } from 'lucide-react'
import { siteContent } from '../content/site'
import { getLocalized } from '../lib/localized'
import type { CareerType } from '../content/types'
import { Section } from '../components/ui/Section'
import { MotionSection } from '../components/motion/MotionSection'
import { GlassCard } from '../components/ui/GlassCard'
import { Tag } from '../components/ui/Tag'
import { staggerContainer, fadeUp } from '../components/motion/variants'
import { useReducedMotion } from '../hooks/useReducedMotion'

const icons: Record<CareerType, typeof Briefcase> = {
  job: Briefcase,
  freelance: Building2,
  internship: GraduationCap,
}

export function Career() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language.startsWith('pt') ? 'pt' : 'en'
  const reduced = useReducedMotion()
  const { career } = siteContent

  return (
    <MotionSection>
      <Section id="career" title={t('sections.career')}>
        <div className="relative mx-auto max-w-3xl">
          <div
            aria-hidden
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent md:left-1/2 md:-translate-x-px"
          />
          <motion.ol
            variants={reduced ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-12"
          >
            {career.map((entry, index) => {
              const Icon = icons[entry.type]
              const isLeft = index % 2 === 0
              return (
                <motion.li
                  key={entry.id}
                  variants={reduced ? undefined : fadeUp}
                  className={`relative flex md:w-1/2 ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12 md:translate-x-full'}`}
                >
                  <span className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--bg-base)] shadow-[0_0_12px_var(--accent-glow)] md:left-auto md:right-0 md:translate-x-1/2">
                    <Icon className="h-4 w-4 text-[var(--accent)]" />
                  </span>
                  <GlassCard className="ml-12 md:ml-0">
                    <p className="font-mono text-xs text-[var(--accent-secondary)]">
                      {getLocalized(entry.period, locale)}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                      {entry.company}
                    </h3>
                    <p className="text-[var(--text-muted)]">
                      {getLocalized(entry.role, locale)} · {t(`career.${entry.type}`)}
                    </p>
                    {entry.description && (
                      <p className="mt-3 text-sm text-[var(--text-muted)]">
                        {getLocalized(entry.description, locale)}
                      </p>
                    )}
                    {entry.technologies && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {entry.technologies.map((tech) => (
                          <Tag key={tech}>{tech}</Tag>
                        ))}
                      </div>
                    )}
                  </GlassCard>
                </motion.li>
              )
            })}
          </motion.ol>
        </div>
      </Section>
    </MotionSection>
  )
}
```

- [ ] **Step 2: Manual check** — timeline alternates on desktop, readable on mobile.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Career.tsx
git commit -m "feat: add Career timeline section"
```

---

### Task 14: Projects grid

**Files:**
- Create: `src/sections/Projects.tsx`

- [ ] **Step 1: Implement `Projects.tsx`**

```typescript
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ExternalLink, Github } from 'lucide-react'
import { siteContent } from '../content/site'
import { getLocalized } from '../lib/localized'
import { Section } from '../components/ui/Section'
import { MotionSection } from '../components/motion/MotionSection'
import { GlassCard } from '../components/ui/GlassCard'
import { ProjectImage } from '../components/ui/ProjectImage'
import { Tag } from '../components/ui/Tag'
import { staggerContainer, fadeUp } from '../components/motion/variants'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Projects() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language.startsWith('pt') ? 'pt' : 'en'
  const reduced = useReducedMotion()
  const featured = siteContent.projects.filter((p) => p.featured)

  return (
    <MotionSection>
      <Section id="projects" title={t('sections.projects')}>
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((project) => {
            const title = getLocalized(project.title, locale)
            const initials = title.slice(0, 2).toUpperCase()
            return (
              <motion.div key={project.id} variants={reduced ? undefined : fadeUp}>
                <GlassCard className="group overflow-hidden p-0">
                  <div className="relative overflow-hidden">
                    <ProjectImage
                      src={project.image}
                      alt={title}
                      fallbackInitials={initials}
                      className="rounded-none transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 transition group-hover:opacity-100">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-white"
                        >
                          <ExternalLink className="h-4 w-4" /> {t('projects.live')}
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-white"
                        >
                          <Github className="h-4 w-4" /> {t('projects.repo')}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      {getLocalized(project.description, locale)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>
    </MotionSection>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sections/Projects.tsx
git commit -m "feat: add Projects grid with hover overlay"
```

---

### Task 15: Skills + Contact sections

**Files:**
- Create: `src/sections/Skills.tsx`
- Create: `src/sections/Contact.tsx`

- [ ] **Step 1: `Skills.tsx`**

```typescript
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { siteContent } from '../content/site'
import { Section } from '../components/ui/Section'
import { MotionSection } from '../components/motion/MotionSection'
import { Tag } from '../components/ui/Tag'
import { staggerContainer, fadeUp } from '../components/motion/variants'
import { useReducedMotion } from '../hooks/useReducedMotion'

const categories = ['frontend', 'tools', 'other'] as const

export function Skills() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()

  return (
    <MotionSection>
      <Section id="skills" title={t('sections.skills')}>
        <motion.div
          className="flex flex-wrap gap-3"
          variants={reduced ? undefined : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {siteContent.skills.map((skill) => (
            <motion.div key={skill.name} variants={reduced ? undefined : fadeUp}>
              <Tag className="text-sm transition hover:border-[var(--accent)] hover:shadow-[0_0_12px_var(--accent-glow)]">
                {skill.name}
              </Tag>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </MotionSection>
  )
}
```

- [ ] **Step 2: `Contact.tsx`**

```typescript
import { useTranslation } from 'react-i18next'
import { Mail, Github, Linkedin } from 'lucide-react'
import { siteContent } from '../content/site'
import { Section } from '../components/ui/Section'
import { MotionSection } from '../components/motion/MotionSection'
import { GlassCard } from '../components/ui/GlassCard'
import { Button } from '../components/ui/Button'

export function Contact() {
  const { t } = useTranslation()
  const { contact } = siteContent
  const mailto = `mailto:${contact.email}`

  return (
    <MotionSection>
      <Section id="contact" title={t('sections.contact')}>
        <GlassCard className="mx-auto max-w-xl text-center">
          <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
            {t('contact.heading')}
          </h3>
          <p className="mt-4 text-[var(--text-muted)]">{t('contact.subheading')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={mailto}>
              <Mail className="mr-2 inline h-4 w-4" />
              {t('cta.primary')}
            </Button>
            <Button variant="ghost" href={contact.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 inline h-4 w-4" /> GitHub
            </Button>
            <Button variant="ghost" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 inline h-4 w-4" /> LinkedIn
            </Button>
          </div>
          {contact.whatsapp && (
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm text-[var(--accent-secondary)] hover:underline"
            >
              WhatsApp
            </a>
          )}
          {contact.calendly && (
            <a
              href={contact.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-[var(--accent-secondary)] hover:underline"
            >
              Calendly
            </a>
          )}
        </GlassCard>
      </Section>
    </MotionSection>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/Skills.tsx src/sections/Contact.tsx
git commit -m "feat: add Skills and Contact sections"
```

---

### Task 16: Custom cursor (desktop)

**Files:**
- Create: `src/components/layout/CustomCursor.tsx`

- [ ] **Step 1: Implement `CustomCursor.tsx`**

```typescript
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CustomCursor() {
  const reduced = useReducedMotion()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [follower, setFollower] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)

    let raf = 0
    const loop = () => {
      setFollower((f) => ({
        x: f.x + (pos.x - f.x) * 0.15,
        y: f.y + (pos.y - f.y) * 0.15,
      }))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const interactives = document.querySelectorAll('a, button')
    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [reduced, pos.x, pos.y])

  if (reduced || typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  const size = hovering ? 40 : 8

  return (
    <>
      <div
        className="pointer-events-none fixed z-[100] rounded-full bg-[var(--accent)] mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          left: pos.x - 4,
          top: pos.y - 4,
        }}
      />
      <div
        className="pointer-events-none fixed z-[99] rounded-full border border-[var(--accent-glow)] transition-[width,height] duration-200"
        style={{
          width: size,
          height: size,
          left: follower.x - size / 2,
          top: follower.y - size / 2,
        }}
      />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/CustomCursor.tsx
git commit -m "feat: add custom cursor for desktop"
```

---

### Task 17: SEO `DocumentHead` + `index.html`

**Files:**
- Create: `src/components/seo/DocumentHead.tsx`
- Modify: `index.html`

- [ ] **Step 1: `DocumentHead.tsx`**

```typescript
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { siteContent } from '../../content/site'
import { getLocalized } from '../../lib/localized'

export function DocumentHead() {
  const { i18n } = useTranslation()
  const locale = i18n.language.startsWith('pt') ? 'pt' : 'en'
  const title = `${siteContent.profile.name} — ${getLocalized(siteContent.profile.title, locale)}`
  const description = getLocalized(siteContent.profile.bio, locale)

  useEffect(() => {
    document.title = title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', description)

    const existing = document.getElementById('jsonld-person')
    existing?.remove()

    const script = document.createElement('script')
    script.id = 'jsonld-person'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: siteContent.profile.name,
      jobTitle: getLocalized(siteContent.profile.title, locale),
      url: window.location.origin,
      sameAs: siteContent.profile.socials.map((s) => s.url),
    })
    document.head.appendChild(script)
  }, [title, description, locale])

  return null
}
```

- [ ] **Step 2: Update `index.html` `<head>`**

```html
<meta name="description" content="Front-end developer portfolio" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Portfolio" />
<meta property="og:description" content="Front-end developer portfolio" />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/seo/DocumentHead.tsx index.html
git commit -m "feat: add dynamic DocumentHead and base meta tags"
```

---

### Task 18: Compose `App.tsx` and remove boilerplate

**Files:**
- Modify: `src/App.tsx`
- Delete: `src/App.css`

- [ ] **Step 1: Replace `src/App.tsx`**

```typescript
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { CustomCursor } from './components/layout/CustomCursor'
import { LenisProvider } from './components/providers/LenisProvider'
import { DocumentHead } from './components/seo/DocumentHead'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Career } from './sections/Career'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Contact } from './sections/Contact'

export default function App() {
  return (
    <LenisProvider>
      <DocumentHead />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Career />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </LenisProvider>
  )
}
```

- [ ] **Step 2: Delete `src/App.css`**

```bash
rm src/App.css
```

- [ ] **Step 3: Run full verification**

Run:
```bash
pnpm test
pnpm lint
pnpm build
```

Expected: all tests pass, lint clean, build succeeds.

- [ ] **Step 4: Manual test checklist**

- [ ] Scroll through all sections; nav highlights correct section
- [ ] Toggle PT/EN; content and UI strings update
- [ ] Reload page; locale persists if manually set
- [ ] `prefers-reduced-motion`: no Lenis, no WebGL, no custom cursor
- [ ] Project image 404 shows initials placeholder
- [ ] External links open in new tab with `noopener`
- [ ] Career timeline readable on mobile

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git rm src/App.css 2>/dev/null || true
git commit -m "feat: compose portfolio single-page app"
```

---

### Task 19: Content refinement — GitHub sync + mock assets

**Files:**
- Modify: `src/content/site.ts`
- Add: `public/projects/*.png` (mock or real screenshots)
- Optional: `scripts/sync-github-content.ts`

**GitHub refresh (optional):**

```bash
curl -s https://api.github.com/users/fugisakimatheus | jq '{name, bio, company, blog, avatar_url}'
curl -s "https://api.github.com/users/fugisakimatheus/repos?sort=updated&per_page=20" | jq '[.[] | {name, description, html_url, homepage, language}]'
```

Merge any changed `description` / `homepage` into `site.ts` projects.

- [ ] **Step 1: Confirm or fix MOCK fields in `site.ts`**
  - `contact.email` — replace mock with real email
  - `career[1]` (freelance-mock) — replace with real employers/dates or remove
  - `career[0].period` — add real start year at Nexgy
  - Add `resumeUrl`, `calendly`, `whatsapp` if available

- [ ] **Step 2: Project screenshots (mock until real)**

Option A — initials fallback only (no files; `ProjectImage` handles 404).

Option B — add simple mock PNGs per project id:

```bash
# Example: copy a neutral placeholder for each project id
for id in energy-dashboard code-hero-angular currency-converter strategy-pattern-example; do
  cp public/projects/.gitkeep "public/projects/${id}.png" 2>/dev/null || true
done
```

Option C — screenshot deployed demos (`matheusfugisaki.vercel.app`, repo homepages) and save as `public/projects/{id}.png`.

- [ ] **Step 3: Verify avatar loads** — external URL `avatars.githubusercontent.com` works in `<img>` (no CORS issue for display).

- [ ] **Step 4: Run `pnpm build`** — expect success.

- [ ] **Step 5: Commit**

```bash
git add src/content/site.ts public/
git commit -m "content: refine portfolio data from GitHub profile and mock assets"
```

---

## Spec Coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Single-page sections order | Task 18 |
| Career timeline | Task 13 |
| Dark premium tokens | Task 2 |
| i18n PT/EN + detector + toggle | Task 5, 10 |
| JSON content model (GitHub-seeded) | Task 4, 19 |
| Lenis + scroll spy + progress | Task 9, 10 |
| Hero WebGL + fallback | Task 11 |
| Section animations | Tasks 7, 12–15 |
| Custom cursor | Task 16 |
| `prefers-reduced-motion` | Tasks 6, 9, 11, 16 |
| Project image fallback | Task 8 |
| SEO + JSON-LD | Task 17 |
| Contact mailto + social | Task 15 |
| Out of scope (API form, light theme, E2E) | Not included |

**Placeholder scan:** No TBD steps. MOCK fields documented in GitHub Source table and Task 19; initial `site.ts` uses Matheus Fugisaki data from GitHub API.

**Type consistency:** `Locale`, `LocalizedString`, `getLocalized`, `siteContent` used consistently across sections.

---

## Deploy (post-implementation)

```bash
pnpm build
# Vercel: vercel --prod
# Netlify: netlify deploy --prod --dir=dist
```

---

**Plan complete and saved to `docs/superpowers/plans/2026-05-21-portfolio.md`. Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks, fast iteration  
2. **Inline Execution** — run tasks in this session using executing-plans, batch execution with checkpoints  

**Which approach?**
