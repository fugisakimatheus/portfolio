import type { Locale, LocalizedString } from '../content/types'

export function getLocalized(value: LocalizedString, locale: Locale): string {
  const primary = locale === 'pt' ? value.pt : value.en
  const fallback = locale === 'pt' ? value.en : value.pt
  return primary.trim() ? primary : fallback
}
