import { describe, it, expect } from 'vitest'
import {
  STAGES,
  getStageFirstDay,
  getStageLastDay,
  getUpcomingStages,
  getStageById,
} from '@/content/stages'

describe('bornes de dates', () => {
  it('lit le premier et le dernier jour du stage de juillet', () => {
    expect(getStageFirstDay(STAGES['juillet-2026'])).toBe('2026-07-06')
    expect(getStageLastDay(STAGES['juillet-2026'])).toBe('2026-07-16')
  })

  it('lit le premier et le dernier jour du stage d\'août', () => {
    expect(getStageFirstDay(STAGES['aout-2026'])).toBe('2026-08-17')
    expect(getStageLastDay(STAGES['aout-2026'])).toBe('2026-08-28')
  })
})

describe('getUpcomingStages', () => {
  it('retourne les deux stages avant le début de juillet', () => {
    expect(getUpcomingStages('2026-06-01').map((s) => s.id)).toEqual([
      'juillet-2026',
      'aout-2026',
    ])
  })

  it('garde un stage en cours jusqu\'à son dernier jour inclus', () => {
    expect(getUpcomingStages('2026-08-28').map((s) => s.id)).toEqual(['aout-2026'])
  })

  it('ne retourne rien une fois le dernier stage terminé', () => {
    expect(getUpcomingStages('2026-08-29')).toEqual([])
  })

  it('exclut juillet dès le lendemain de sa fin', () => {
    expect(getUpcomingStages('2026-07-17').map((s) => s.id)).toEqual(['aout-2026'])
  })
})

describe('getStageById', () => {
  it('retourne le stage demandé quand il existe', () => {
    expect(getStageById('aout-2026').id).toBe('aout-2026')
  })

  it('ne renvoie jamais undefined sur un identifiant inconnu', () => {
    expect(getStageById('inexistant')).toBeDefined()
    expect(getStageById(null)).toBeDefined()
  })
})
