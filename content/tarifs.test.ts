import { describe, it, expect } from 'vitest'
import { SEASON_TARIFS, INCLUDED_FEES, INCLUDED_FEES_TOTAL } from '@/content/tarifs'

describe('SEASON_TARIFS', () => {
  it('lists the six season groups', () => {
    expect(SEASON_TARIFS).toHaveLength(6)
  })

  it('has a positive price and non-empty labels for each group', () => {
    for (const row of SEASON_TARIFS) {
      expect(row.group.trim().length).toBeGreaterThan(0)
      expect(row.duration.trim().length).toBeGreaterThan(0)
      expect(row.price).toBeGreaterThan(0)
    }
  })
})

describe('INCLUDED_FEES', () => {
  it('total equals the rounded sum of the fees', () => {
    const sum = Number(INCLUDED_FEES.reduce((s, f) => s + f.price, 0).toFixed(2))
    expect(INCLUDED_FEES_TOTAL).toBe(sum)
  })

  it('matches the known federation total', () => {
    expect(INCLUDED_FEES_TOTAL).toBe(65.19)
  })
})
