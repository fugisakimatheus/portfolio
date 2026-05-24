import { useTranslation } from 'react-i18next'
import { AnimatedInView, AnimatedItem } from '../components/motion/AnimatedInView'
import { AvailabilityBadge } from '../components/ui/AvailabilityBadge'
import { Button } from '../components/ui/Button'
import { ExternalLink } from '../components/ui/ExternalLink'
import { GlassCard } from '../components/ui/GlassCard'
import { SectionPage } from '../components/ui/SectionPage'
import { siteContent } from '../content/site'
import { cn } from '../lib/cn'
import { getMailto } from '../lib/contact'
import { surfaceCardHover } from '../lib/surface'
import { buildContactChannels } from './contact/buildChannels'
import { ChannelCard } from './contact/ChannelCard'
import { CopyEmailButton } from './contact/CopyEmailButton'

const channelsLabelClass =
  'shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-(--text-muted)'

export function Contact() {
  const { t } = useTranslation()
  const { contact } = siteContent
  const mailto = getMailto()
  const channels = buildContactChannels(t)

  return (
    <SectionPage id="contact" titleKey="sections.contact">
      <AnimatedInView
        viewportMargin="-60px"
        className={cn(
          'grid w-full gap-5',
          'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-stretch lg:gap-x-10 lg:gap-y-0',
        )}
      >
        <AnimatedItem className="flex min-h-0 flex-col lg:h-full lg:self-stretch">
          <GlassCard
            className={cn(surfaceCardHover, 'flex min-h-0 flex-col p-5 sm:p-8 md:p-10 lg:h-full')}
          >
            <div className="flex flex-col">
              <AvailabilityBadge className="bg-(--bg-base)">
                {t('contact.availability')}
              </AvailabilityBadge>

              <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-(--text-primary) sm:mt-6 sm:text-2xl">
                {t('contact.heading')}
              </h3>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-(--text-muted) sm:text-base">
                {t('contact.subheading')}
              </p>

              <p className="mt-3 text-sm text-(--text-muted)">{t('contact.response')}</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 lg:mt-auto">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={mailto}>{t('cta.primary')}</Button>
                <CopyEmailButton />
              </div>

              {(contact.whatsapp || contact.calendly) && (
                <div className="flex flex-wrap gap-4 border-t border-(--border-subtle) pt-6 text-sm text-(--text-muted)">
                  {contact.whatsapp && (
                    <ExternalLink href={contact.whatsapp}>WhatsApp</ExternalLink>
                  )}
                  {contact.calendly && (
                    <ExternalLink href={contact.calendly}>Calendly</ExternalLink>
                  )}
                </div>
              )}
            </div>
          </GlassCard>
        </AnimatedItem>

        <AnimatedItem className="flex min-h-0 flex-col">
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className={channelsLabelClass}>{t('contact.channels')}</p>

            <ul className="flex list-none flex-col gap-2.5 sm:gap-3">
              {channels.map((channel) => (
                <li key={channel.id}>
                  <ChannelCard channel={channel} />
                </li>
              ))}
            </ul>
          </div>
        </AnimatedItem>
      </AnimatedInView>
    </SectionPage>
  )
}
