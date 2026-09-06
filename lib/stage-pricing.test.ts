import { describe, it, expect } from 'vitest'
import { computeStageTotals, groupDaysByWeek, isFullWeekEligible } from '@/lib/stage-pricing'
import { STAGES, FORMULES } from '@/content/stages'

const toussaint = STAGES['toussaint-2026']
const aout = STAGES['aout-2026']
const juillet = STAGES['juillet-2026']

describe('computeStageTotals', () => {
  it('ne facture rien sans jour sélectionné', () => {
    expect(computeStageTotals(toussaint, [])).toEqual({ f1: 0, f2: 0 })
  })

  it('facture le vendredi isolé de la Toussaint au tarif journée, pas au tarif semaine', () => {
    const totals = computeStageTotals(toussaint, ['2026-10-23'])
    expect(totals.f1).toBe(FORMULES[1].pricePerDay)
    expect(totals.f2).toBe(FORMULES[2].pricePerDay)
  })

  it('applique le tarif semaine sur la semaine complète du 26 octobre', () => {
    const week2 = ['2026-10-26', '2026-10-27', '2026-10-28', '2026-10-29', '2026-10-30']
    expect(computeStageTotals(toussaint, week2).f1).toBe(FORMULES[1].priceWeek)
  })

  it('additionne le vendredi isolé et la semaine complète', () => {
    const all = toussaint.days.map((d) => d.date)
    expect(computeStageTotals(toussaint, all).f1).toBe(
      FORMULES[1].priceWeek! + FORMULES[1].pricePerDay,
    )
  })

  it('facture une semaine partielle au tarif journée', () => {
    const partial = ['2026-10-26', '2026-10-27']
    expect(computeStageTotals(toussaint, partial).f1).toBe(2 * FORMULES[1].pricePerDay)
  })

  it('garde le tarif semaine sur les deux semaines pleines du stage d\'août', () => {
    const all = aout.days.map((d) => d.date)
    expect(computeStageTotals(aout, all).f1).toBe(2 * FORMULES[1].priceWeek!)
  })

  it('facture juillet à la journée, sans tarif semaine', () => {
    const all = juillet.days.map((d) => d.date)
    expect(computeStageTotals(juillet, all).f1).toBe(all.length * FORMULES[1].pricePerDay)
  })

  it('facture la formule 2 toujours à la journée', () => {
    const all = aout.days.map((d) => d.date)
    expect(computeStageTotals(aout, all).f2).toBe(all.length * FORMULES[2].pricePerDay)
  })
})

describe('isFullWeekEligible', () => {
  it('refuse une semaine de moins de cinq jours même entièrement sélectionnée', () => {
    const week0 = groupDaysByWeek(toussaint.days)[0]
    expect(week0).toHaveLength(1)
    expect(isFullWeekEligible(week0, ['2026-10-23'])).toBe(false)
  })

  it('accepte une semaine de cinq jours entièrement sélectionnée', () => {
    const week1 = groupDaysByWeek(toussaint.days)[1]
    expect(isFullWeekEligible(week1, week1.map((d) => d.date))).toBe(true)
  })
})
