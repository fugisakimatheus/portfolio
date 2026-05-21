import { useTranslation } from 'react-i18next'
import { Mail, GitBranch, Link } from 'lucide-react'
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
              <GitBranch className="mr-2 inline h-4 w-4" /> GitHub
            </Button>
            <Button variant="ghost" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              <Link className="mr-2 inline h-4 w-4" /> LinkedIn
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
