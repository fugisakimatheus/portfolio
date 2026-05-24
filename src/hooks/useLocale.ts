import { useTranslation } from 'react-i18next'
import type { Locale } from '../content/types'

export function useLocale(): Locale {
  const { i18n } = useTranslation()
  return i18n.language.startsWith('pt') ? 'pt' : 'en'
}
