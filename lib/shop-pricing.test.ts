import { describe, expect, it } from 'vitest'
import { computeOrderAmount, formatEuros, roundEuros } from './shop-pricing'

const plainSpaces = (text: string) => text.replace(/\s/g, ' ')

describe('roundEuros', () => {
  it('rounds a float cart total to the cent', () => {
    const total = roundEuros(19.99 + 5 + 4.99)
    expect(total).toBe(29.98)
    expect(total.toFixed(2)).toBe('29.98')
    expect(JSON.stringify({ total })).toBe('{"total":29.98}')
  })

  it('keeps exact amounts unchanged', () => {
    expect(roundEuros(64.97)).toBe(64.97)
    expect(roundEuros(30)).toBe(30)
  })
})

describe('formatEuros', () => {
  it('formats amounts the French way', () => {
    expect(plainSpaces(formatEuros(19.99 + 5 + 4.99))).toBe('29,98 €')
    expect(plainSpaces(formatEuros(4.99))).toBe('4,99 €')
    expect(plainSpaces(formatEuros(30))).toBe('30,00 €')
    expect(plainSpaces(formatEuros(1234.5))).toBe('1 234,50 €')
  })
})

describe('computeOrderAmount', () => {
  it('prices a hoodie with shipping', () => {
    expect(computeOrderAmount([{ name: 'Sweat à capuche PKBA', quantity: 1 }])).toBe(5498)
  })

  it('adds the customization fee per t-shirt', () => {
    expect(
      computeOrderAmount([{ name: 'T-shirt Officiel PKBA', quantity: 2, customization: 'NEO' }]),
    ).toBe(499 + 2 * 2499)
  })

  it('ignores any client price', () => {
    expect(computeOrderAmount([{ name: 'Short athlétique PKBA', quantity: 1, price: 0.01 }])).toBe(3998)
  })

  it('rejects unknown products, bad quantities and empty carts', () => {
    expect(computeOrderAmount([{ name: 'Sweat gratuit', quantity: 1 }])).toBeNull()
    expect(computeOrderAmount([{ name: 'Sweat à capuche PKBA', quantity: 0 }])).toBeNull()
    expect(computeOrderAmount([{ name: 'Sweat à capuche PKBA', quantity: 1.5 }])).toBeNull()
    expect(computeOrderAmount([])).toBeNull()
    expect(computeOrderAmount('nope')).toBeNull()
  })
})
