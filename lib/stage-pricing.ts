import { FORMULES, type StageConfig, type StageDay } from '@/content/stages'

export const FULL_WEEK_LENGTH = 5

export type StageTotals = { f1: number; f2: number }

export const groupDaysByWeek = (days: StageDay[]): StageDay[][] => {
  const weeks: Record<number, StageDay[]> = {}
  for (const day of days) {
    if (!weeks[day.weekIndex]) weeks[day.weekIndex] = []
    weeks[day.weekIndex].push(day)
  }
  return Object.values(weeks)
}

export const isFullWeekEligible = (weekDays: StageDay[], selectedDates: string[]): boolean =>
  weekDays.length === FULL_WEEK_LENGTH &&
  weekDays.every((d) => selectedDates.includes(d.date))

export function computeStageTotals(
  stage: StageConfig,
  selectedDates: string[],
): StageTotals {
  if (selectedDates.length === 0) return { f1: 0, f2: 0 }

  let f1 = 0
  if (stage.weekDiscount) {
    for (const weekDays of groupDaysByWeek(stage.days)) {
      const selectedInWeek = weekDays.filter((d) => selectedDates.includes(d.date))
      f1 += isFullWeekEligible(weekDays, selectedDates)
        ? (FORMULES[1].priceWeek ?? selectedInWeek.length * FORMULES[1].pricePerDay)
        : selectedInWeek.length * FORMULES[1].pricePerDay
    }
  } else {
    f1 = selectedDates.length * FORMULES[1].pricePerDay
  }

  return { f1, f2: selectedDates.length * FORMULES[2].pricePerDay }
}
