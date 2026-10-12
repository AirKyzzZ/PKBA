import { describe, it, expect } from 'vitest'
import {
  validatePreinscription,
  buildPreinscriptionFields,
  MESSAGE_MAX_LEN,
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

const TODAY = '2026-10-12'

describe('validatePreinscription', () => {
  it('accepts a valid payload', () => {
    expect(validatePreinscription(valid, TODAY)).toBeNull()
  })

  it('rejects a non-string message or parent name', () => {
    const bad = { ...valid, message: 42 } as unknown as PreinscriptionPayload
    expect(validatePreinscription(bad, TODAY)).toBe('Requête invalide')
    const badParent = { ...valid, parentName: ['x'] } as unknown as PreinscriptionPayload
    expect(validatePreinscription(badParent, TODAY)).toBe('Requête invalide')
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

  it('rejects a birth date in the future', () => {
    expect(validatePreinscription({ ...valid, birthDate: '2026-10-13' }, TODAY)).toBe(
      'La date de naissance ne peut pas être dans le futur',
    )
  })

  it('requires the child to be at least 3 on 1 September 2026', () => {
    expect(validatePreinscription({ ...valid, birthDate: '2023-09-01' }, TODAY)).toBeNull()
    expect(validatePreinscription({ ...valid, birthDate: '2023-09-02' }, TODAY)).toBe(
      "L'enfant doit avoir au moins 3 ans au 1er septembre 2026",
    )
    expect(validatePreinscription({ ...valid, birthDate: '2025-06-01' }, TODAY)).toBe(
      "L'enfant doit avoir au moins 3 ans au 1er septembre 2026",
    )
  })

  it('rejects an implausibly old birth date', () => {
    expect(validatePreinscription({ ...valid, birthDate: '1900-01-01' }, TODAY)).toBe(
      'Date de naissance invalide',
    )
  })

  it('requires a valid French phone number', () => {
    expect(validatePreinscription({ ...valid, phone: '12' }, TODAY)).toBe(
      'Numéro de téléphone invalide',
    )
    expect(validatePreinscription({ ...valid, phone: '+33 6 12 34 56 78' }, TODAY)).toBeNull()
    expect(validatePreinscription({ ...valid, phone: '06.12.34.56.78' }, TODAY)).toBeNull()
  })

  it('rejects a message over the limit instead of truncating it', () => {
    const atLimit = 'a'.repeat(MESSAGE_MAX_LEN)
    expect(validatePreinscription({ ...valid, message: atLimit }, TODAY)).toBeNull()
    expect(validatePreinscription({ ...valid, message: `${atLimit}b` }, TODAY)).toBe(
      'Message trop long (1000 caractères maximum)',
    )
    const wish = String(buildPreinscriptionFields({ ...valid, message: atLimit }, '2026-06-07')['Jours sélectionnés'])
    expect(wish.endsWith(atLimit)).toBe(true)
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
