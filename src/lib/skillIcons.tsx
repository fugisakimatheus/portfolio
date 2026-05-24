import type { IconType } from 'react-icons'
import {
  SiAngular,
  SiBun,
  SiGit,
  SiJest,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVitest,
  SiVuedotjs,
} from 'react-icons/si'
import { PlaywrightIcon } from '../components/icons/PlaywrightIcon'
import { ZustandIcon } from '../components/icons/ZustandIcon'

const reactIconMap: Record<string, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  nextdotjs: SiNextdotjs,
  angular: SiAngular,
  tailwindcss: SiTailwindcss,
  sass: SiSass,
  vue: SiVuedotjs,
  vite: SiVite,
  bun: SiBun,
  nodedotjs: SiNodedotjs,
  git: SiGit,
  vitest: SiVitest,
  jest: SiJest,
}

type SkillIconProps = {
  icon: string
  className?: string
}

export function SkillIcon({ icon, className }: SkillIconProps) {
  if (icon === 'playwright') {
    return <PlaywrightIcon className={className} />
  }

  if (icon === 'zustand') {
    return <ZustandIcon className={className} />
  }

  const ReactIcon = reactIconMap[icon]
  if (ReactIcon) {
    return <ReactIcon className={className} aria-hidden />
  }

  return null
}
