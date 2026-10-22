import { describe, expect, it } from 'vitest'
import { computeOrderAmount } from './shop-pricing'

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
