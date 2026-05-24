import { describe, expect, it } from 'vitest'
import { getFirstName, splitName } from './names'

describe('names', () => {
  it('splitName splits first and last', () => {
    expect(splitName('Matheus Fugisaki')).toEqual({
      first: 'Matheus',
      last: 'Fugisaki',
    })
  })

  it('getFirstName returns first token', () => {
    expect(getFirstName('Matheus Fugisaki')).toBe('Matheus')
    expect(getFirstName('Madonna')).toBe('Madonna')
  })
})
