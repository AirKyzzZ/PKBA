const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FRENCH_PHONE_RE = /^(?:0|\+33)[1-9]\d{8}$/

export const isNonEmpty = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0

export const isJsonObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const isValidIsoDate = (value: string): boolean => {
  if (!ISO_DATE_RE.test(value)) return false
  const d = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value
}

export const isValidEmail = (value: string): boolean => EMAIL_RE.test(value.trim())

export const isValidFrenchPhone = (value: string): boolean =>
  FRENCH_PHONE_RE.test(value.replace(/[\s.-]/g, ''))

export const ageOn = (birthIso: string, onIso: string): number => {
  const [birthYear, birthMonth, birthDay] = birthIso.split('-').map(Number)
  const [year, month, day] = onIso.split('-').map(Number)
  const beforeBirthday = month < birthMonth || (month === birthMonth && day < birthDay)
  return year - birthYear - (beforeBirthday ? 1 : 0)
}

export const toLocalIsoDate = (date: Date = new Date()): string =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
