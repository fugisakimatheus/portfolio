import { useTranslation } from 'react-i18next'
import { MotionSection } from '../motion/MotionSection'
import { Section } from './Section'

type Props = {
  id: string
  titleKey: string
  children: React.ReactNode
  className?: string
}

/** Standard page section: entrance animation + titled block. */
export function SectionPage({ id, titleKey, children, className }: Props) {
  const { t } = useTranslation()

  return (
    <MotionSection>
      <Section id={id} title={t(titleKey)} className={className}>
        {children}
      </Section>
    </MotionSection>
  )
}
