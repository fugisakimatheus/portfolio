import type { Locale, ProjectEntry } from '../content/types'
import { getTitleInitials } from './initials'
import { getLocalized } from './localized'

export function getProjectCopy(project: ProjectEntry, locale: Locale) {
  const title = getLocalized(project.title, locale)
  const description = getLocalized(project.description, locale)
  const initials = getTitleInitials(title)

  return { title, description, initials }
}
