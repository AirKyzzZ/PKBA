import { describe, it, expect } from 'vitest'
import {
  ageOn,
  isJsonObject,
  isValidEmail,
  isValidFrenchPhone,
  isValidIsoDate,
  toLocalIsoDate,
} from '@/lib/validation'

describe('isValidIsoDate', () => {
  it('accepts a real ISO date', () => {
    expect(isValidIsoDate('2017-05-12')).toBe(true)
  })

  it('rejects malformed or impossible dates', () => {
    expect(isValidIsoDate('2017-13-40')).toBe(false)
    expect(isValidIsoDate('2023-02-29')).toBe(false)
    expect(isValidIsoDate('12/05/2017')).toBe(false)
    expect(isValidIsoDate('')).toBe(false)
  })
})

describe('isValidFrenchPhone', () => {
  it.each(['0612345678', '06 12 34 56 78', '06.12.34.56.78', '06-12-34-56-78', '+33612345678', '+33 6 12 34 56 78', '05 56 00 00 00'])(
    'accepte %s',
    (phone) => {
      expect(isValidFrenchPhone(phone)).toBe(true)
    },
  )

  it.each(['12', '061234567', '06123456789', '6123456789', '+330612345678', '+3361234567', '0012345678', '06 12 34 56 7a', ''])(
    'refuse %s',
    (phone) => {
      expect(isValidFrenchPhone(phone)).toBe(false)
    },
  )
})

describe('isValidEmail', () => {
  it('accepte une adresse classique et refuse le reste', () => {
    expect(isValidEmail(' lea@example.com ')).toBe(true)
    expect(isValidEmail('lea@example')).toBe(false)
    expect(isValidEmail('lea example.com')).toBe(false)
  })
})

describe('ageOn', () => {
  it("compte l'anniversaire au jour près", () => {
    expect(ageOn('2018-10-24', '2026-10-23')).toBe(7)
    expect(ageOn('2018-10-24', '2026-10-24')).toBe(8)
    expect(ageOn('2008-10-13', '2026-10-12')).toBe(17)
    expect(ageOn('2008-10-12', '2026-10-12')).toBe(18)
  })

  it('fait passer un anniversaire du 29 février au 1er mars les années non bissextiles', () => {
    expect(ageOn('2016-02-29', '2026-02-28')).toBe(9)
    expect(ageOn('2016-02-29', '2026-03-01')).toBe(10)
  })
})

describe('isJsonObject', () => {
  it('ne garde que les objets', () => {
    expect(isJsonObject({ a: 1 })).toBe(true)
    expect(isJsonObject(null)).toBe(false)
    expect(isJsonObject([])).toBe(false)
    expect(isJsonObject('texte')).toBe(false)
  })
})

describe('toLocalIsoDate', () => {
  it('formate la date locale en YYYY-MM-DD', () => {
    expect(toLocalIsoDate(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05')
  })
})
