import { siteContent } from '../content/site'

export function getMailto(): string {
  return `mailto:${siteContent.contact.email}`
}
