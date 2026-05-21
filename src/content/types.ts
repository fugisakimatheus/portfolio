export type Locale = 'pt' | 'en'

export type LocalizedString = { pt: string; en: string }

export type CareerType = 'job' | 'freelance' | 'internship'

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
