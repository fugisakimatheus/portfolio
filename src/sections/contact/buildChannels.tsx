import { Mail } from 'lucide-react'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { SiGithub } from 'react-icons/si'
import { siteContent } from '../../content/site'
import { getMailto } from '../../lib/contact'
import type { ContactChannel } from './ChannelCard'

function stripUrlPrefix(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '')
}

type ChannelDef = {
  id: string
  labelKey: string
  href: string
  display: string
  external?: boolean
  icon: React.ReactNode
}

export function buildContactChannels(t: (key: string) => string): ContactChannel[] {
  const { contact } = siteContent
  const mailto = getMailto()

  const defs: ChannelDef[] = [
    {
      id: 'email',
      labelKey: 'contact.email',
      href: mailto,
      display: contact.email,
      icon: <Mail className="h-4 w-4" aria-hidden />,
    },
    {
      id: 'github',
      labelKey: 'contact.github',
      href: contact.github,
      display: stripUrlPrefix(contact.github),
      external: true,
      icon: <SiGithub className="h-4 w-4" aria-hidden />,
    },
    {
      id: 'linkedin',
      labelKey: 'contact.linkedin',
      href: contact.linkedin,
      display: stripUrlPrefix(contact.linkedin),
      external: true,
      icon: <FaLinkedin className="h-4 w-4" aria-hidden />,
    },
    {
      id: 'instagram',
      labelKey: 'contact.instagram',
      href: contact.instagram,
      display: stripUrlPrefix(contact.instagram),
      external: true,
      icon: <FaInstagram className="h-4 w-4" aria-hidden />,
    },
  ]

  return defs.map(({ labelKey, ...rest }) => ({
    ...rest,
    label: t(labelKey),
  }))
}
