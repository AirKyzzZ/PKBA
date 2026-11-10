export const INSCRIPTION_STATUSES = ['En attente', 'Validée', 'Refusée', 'Nouvelle inscription'] as const
export const MEDICAL_STATUSES = ['En attente', 'Vérifié', 'Manquant', 'Non vérifié'] as const

const RECORD_ID = /^rec[A-Za-z0-9]{14}$/

export const isRecordId = (value: unknown): value is string =>
  typeof value === 'string' && RECORD_ID.test(value)

export const isOneOf = <T extends string>(allowed: readonly T[], value: unknown): value is T =>
  typeof value === 'string' && (allowed as readonly string[]).includes(value)

export const ADMIN_SESSION_EXPIRED = 'pkba-admin-session-expired'
