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

  it('lit le premier et le dernier jour du stage de la Toussaint', () => {
    expect(getStageFirstDay(STAGES['toussaint-2026'])).toBe('2026-10-23')
    expect(getStageLastDay(STAGES['toussaint-2026'])).toBe('2026-10-30')
  })
})

describe('getUpcomingStages', () => {
  it('retourne les trois stages avant le début de juillet', () => {
    expect(getUpcomingStages('2026-06-01').map((s) => s.id)).toEqual([
      'juillet-2026',
      'aout-2026',
      'toussaint-2026',
    ])
  })

  it('garde un stage en cours jusqu\'à son dernier jour inclus', () => {
    expect(getUpcomingStages('2026-08-28').map((s) => s.id)).toEqual([
      'aout-2026',
      'toussaint-2026',
    ])
  })

  it('bascule sur la Toussaint une fois le stage d\'août terminé', () => {
    expect(getUpcomingStages('2026-08-29').map((s) => s.id)).toEqual(['toussaint-2026'])
  })

  it('ne retourne rien une fois le dernier stage terminé', () => {
    expect(getUpcomingStages('2026-10-31')).toEqual([])
  })

  it('exclut juillet dès le lendemain de sa fin', () => {
    expect(getUpcomingStages('2026-07-17').map((s) => s.id)).toEqual([
      'aout-2026',
      'toussaint-2026',
    ])
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

describe('stage de la Toussaint 2026', () => {
  const stage = STAGES['toussaint-2026']

  it('tient dans les vacances de la zone A, du 17 octobre au 2 novembre', () => {
    for (const day of stage.days) {
      expect(day.date >= '2026-10-17').toBe(true)
      expect(day.date <= '2026-11-01').toBe(true)
    }
  })

  it('ne propose que le vendredi sur la première semaine, formation animateur du lundi au jeudi', () => {
    const week0 = stage.days.filter((d) => d.weekIndex === 0)
    expect(week0.map((d) => d.date)).toEqual(['2026-10-23'])
  })

  it('propose les cinq jours de la seconde semaine', () => {
    const week1 = stage.days.filter((d) => d.weekIndex === 1)
    expect(week1.map((d) => d.date)).toEqual([
      '2026-10-26',
      '2026-10-27',
      '2026-10-28',
      '2026-10-29',
      '2026-10-30',
    ])
  })

  it('ne tombe que sur des jours de semaine', () => {
    for (const day of stage.days) {
      const dow = new Date(`${day.date}T12:00:00Z`).getUTCDay()
      expect(dow).toBeGreaterThanOrEqual(1)
      expect(dow).toBeLessThanOrEqual(5)
    }
  })
})
