import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/ui/Button'
import { siteContent } from '../../content/site'
import { getMailto } from '../../lib/contact'

type Props = {
  email?: string
}

export function CopyEmailButton({ email = siteContent.contact.email }: Props) {
  const { t } = useTranslation()
  const mailto = getMailto()
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = mailto
    }
  }

  return (
    <Button as="button" variant="ghost" onClick={copyEmail}>
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-400" aria-hidden />
          {t('contact.copied')}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" aria-hidden />
          {t('contact.copyEmail')}
        </>
      )}
    </Button>
  )
}
