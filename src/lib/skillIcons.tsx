import type { IconType } from 'react-icons'
import {
  SiAngular,
  SiBun,
  SiCypress,
  SiDocker,
  SiElectron,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGraphql,
  SiJest,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiNodedotjs,
  SiQuasar,
  SiReact,
  SiReactquery,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVitest,
  SiVuedotjs,
} from 'react-icons/si'
import { PlaywrightIcon } from '../components/icons/PlaywrightIcon'
import { ZustandIcon } from '../components/icons/ZustandIcon'

/** Brand accent used on skill chip hover */
export const skillBrandColors: Record<string, string> = {
  react: '#61dafb',
  typescript: '#3178c6',
  nextdotjs: '#ffffff',
  vue: '#42b883',
  angular: '#dd0031',
  tailwindcss: '#38bdf8',
  sass: '#cd6799',
  zustand: '#8b5cf6',
  reactquery: '#ff4154',
  graphql: '#e10098',
  quasar: '#1976d2',
  vite: '#646cff',
  bun: '#fbf0df',
  nodedotjs: '#339933',
  express: '#a3a3a3',
  docker: '#2496ed',
  firebase: '#dd2c00',
  electron: '#47848f',
  mongodb: '#47a248',
  mongoose: '#880000',
  git: '#f05032',
  vitest: '#6e9f18',
  jest: '#c21325',
  cypress: '#69d3a7',
  playwright: '#2ead33',
}

export function getSkillBrandColor(icon: string): string | undefined {
  return skillBrandColors[icon]
}

const reactIconMap: Record<string, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  nextdotjs: SiNextdotjs,
  angular: SiAngular,
  tailwindcss: SiTailwindcss,
  sass: SiSass,
  vue: SiVuedotjs,
  reactquery: SiReactquery,
  graphql: SiGraphql,
  quasar: SiQuasar,
  vite: SiVite,
  bun: SiBun,
  nodedotjs: SiNodedotjs,
  express: SiExpress,
  docker: SiDocker,
  firebase: SiFirebase,
  electron: SiElectron,
  mongodb: SiMongodb,
  mongoose: SiMongoose,
  git: SiGit,
  vitest: SiVitest,
  jest: SiJest,
  cypress: SiCypress,
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
