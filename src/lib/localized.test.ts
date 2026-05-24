import { describe, expect, it } from 'vitest'
import { getLocalized } from './localized'

describe('getLocalized', () => {
  it('returns pt string when locale is pt', () => {
    expect(getLocalized({ pt: 'Olá', en: 'Hello' }, 'pt')).toBe('Olá')
  })

  it('returns en string when locale is en', () => {
    expect(getLocalized({ pt: 'Olá', en: 'Hello' }, 'en')).toBe('Hello')
  })

  it('falls back to en when pt is empty', () => {
    expect(getLocalized({ pt: '', en: 'Hello' }, 'pt')).toBe('Hello')
  })
})
