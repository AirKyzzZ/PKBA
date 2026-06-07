import { describe, it, expect } from 'vitest'
import {
  WEEKLY_SCHEDULE,
  SCHEDULE_CATEGORIES,
  PREINSCRIPTION_GROUP_OPTIONS,
  PREINSCRIPTION_GROUP_VALUES,
} from '@/content/schedule'

describe('WEEKLY_SCHEDULE', () => {
  it('covers the six expected days in order', () => {
    expect(WEEKLY_SCHEDULE.map((d) => d.day)).toEqual([
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ])
  })

  it('has at least one slot per day', () => {
    for (const day of WEEKLY_SCHEDULE) {
      expect(day.slots.length).toBeGreaterThan(0)
    }
  })

  it('every slot has a known category, a valid time range and non-empty fields', () => {
    for (const day of WEEKLY_SCHEDULE) {
      for (const slot of day.slots) {
        expect(SCHEDULE_CATEGORIES[slot.category]).toBeDefined()
        expect(slot.time).toMatch(/^\d{1,2}h\d{2} \/ \d{1,2}h\d{2}$/)
        expect(slot.group.trim().length).toBeGreaterThan(0)
        expect(slot.coach.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it('marks the competitive tiers as selection-only and the others as open', () => {
    expect(SCHEDULE_CATEGORIES.prepa.selection).toBe(true)
    expect(SCHEDULE_CATEGORIES.compet.selection).toBe(true)
    expect(SCHEDULE_CATEGORIES.loisir.selection).toBe(false)
    expect(SCHEDULE_CATEGORIES.anniv.selection).toBe(false)
  })
})

describe('PREINSCRIPTION_GROUP_OPTIONS', () => {
  it('exposes values that mirror the option list', () => {
    expect(PREINSCRIPTION_GROUP_VALUES).toEqual(
      PREINSCRIPTION_GROUP_OPTIONS.map((o) => o.value),
    )
  })

  it('has unique values', () => {
    expect(new Set(PREINSCRIPTION_GROUP_VALUES).size).toBe(
      PREINSCRIPTION_GROUP_VALUES.length,
    )
  })
})
