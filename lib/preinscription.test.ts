import { describe, it, expect } from 'vitest'
import {
  validatePreinscription,
  buildPreinscriptionFields,
  isValidIsoDate,
  PREINSCRIPTION_TYPE,
  type PreinscriptionPayload,
} from '@/lib/preinscription'
import { PREINSCRIPTION_GROUP_VALUES } from '@/content/schedule'

const valid: PreinscriptionPayload = {
  firstName: 'Léa',
  lastName: 'Martin',
  birthDate: '2017-05-12',
  groupeSouhaite: PREINSCRIPTION_GROUP_VALUES[0],
  parentName: 'Sophie Martin',
  phone: '0612345678',
  email: 'sophie@example.com',
  message: 'Déjà fait un an de parkour',
  consent: true,
}

describe('isValidIsoDate', () => {
  it('accepts a real ISO date', () => {
    expect(isValidIsoDate('2017-05-12')).toBe(true)
  })

  it('rejects malformed or impossible dates', () => {
    expect(isValidIsoDate('2017-13-40')).toBe(false)
    expect(isValidIsoDate('12/05/2017')).toBe(false)
    expect(isValidIsoDate('')).toBe(false)
  })
})

describe('validatePreinscription', () => {
  it('accepts a valid payload', () => {
    expect(validatePreinscription(valid)).toBeNull()
  })

  it('requires first and last name', () => {
    expect(validatePreinscription({ ...valid, firstName: '  ' })).toBe('Nom et prénom requis')
  })

  it('rejects an invalid birth date', () => {
    expect(validatePreinscription({ ...valid, birthDate: 'nope' })).toBe(
      'Date de naissance invalide',
    )
  })

  it('rejects a group that is not in the allowed list', () => {
    expect(validatePreinscription({ ...valid, groupeSouhaite: 'Élite secrète' })).toBe(
      'Groupe souhaité invalide',
    )
  })

  it('rejects an invalid email', () => {
    expect(validatePreinscription({ ...valid, email: 'not-an-email' })).toBe('Email invalide')
  })

  it('requires explicit consent', () => {
    expect(validatePreinscription({ ...valid, consent: false })).toBe('Consentement requis')
  })
})

describe('buildPreinscriptionFields', () => {
  it('maps to the season Airtable type and trims values', () => {
    const fields = buildPreinscriptionFields({ ...valid, firstName: '  Léa  ' }, '2026-06-07')
    expect(fields["Type d'inscription"]).toBe(PREINSCRIPTION_TYPE)
    expect(fields['Prénom']).toBe('Léa')
    expect(fields['Nom']).toBe('Martin')
    expect(fields["Date d'inscription"]).toBe('2026-06-07')
    expect(fields['Statut']).toBe('En attente')
  })

  it('encodes the desired group and the optional note in Jours sélectionnés', () => {
    const fields = buildPreinscriptionFields(valid, '2026-06-07')
    const wish = String(fields['Jours sélectionnés'])
    expect(wish).toContain('Groupe souhaité')
    expect(wish).toContain(valid.groupeSouhaite as string)
    expect(wish).toContain('Note')
  })

  it('sets the parent name when provided and omits it otherwise', () => {
    expect(buildPreinscriptionFields(valid, '2026-06-07')['Responsable 1 - Nom']).toBe(
      'Sophie Martin',
    )
    expect(
      buildPreinscriptionFields({ ...valid, parentName: '' }, '2026-06-07')['Responsable 1 - Nom'],
    ).toBeUndefined()
  })
})
