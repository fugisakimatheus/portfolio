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
  /** Width ÷ height — drives card image area and bento slot assignment. */
  imageAspect?: number
  liveUrl?: string
  repoUrl?: string
  tags: string[]
  featured: boolean
}

export type SkillEntry = {
  name: string
  category: 'frontend' | 'tools' | 'testing' | 'other'
  /** Slug for react-icons/si — see src/lib/skillIcons.ts */
  icon: string
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
    instagram: string
  }
}
