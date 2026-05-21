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
