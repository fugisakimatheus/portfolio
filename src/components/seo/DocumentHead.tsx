import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { siteContent } from '../../content/site'
import { getLocalized } from '../../lib/localized'

export function DocumentHead() {
  const { i18n } = useTranslation()
  const locale = i18n.language.startsWith('pt') ? 'pt' : 'en'
  const title = `${siteContent.profile.name} — ${getLocalized(siteContent.profile.title, locale)}`
  const description = getLocalized(siteContent.profile.bio, locale)

  useEffect(() => {
    document.title = title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', description)

    const existing = document.getElementById('jsonld-person')
    existing?.remove()

    const script = document.createElement('script')
    script.id = 'jsonld-person'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: siteContent.profile.name,
      jobTitle: getLocalized(siteContent.profile.title, locale),
      url: window.location.origin,
      sameAs: siteContent.profile.socials.map((s) => s.url),
    })
    document.head.appendChild(script)
  }, [title, description, locale])

  return null
}
