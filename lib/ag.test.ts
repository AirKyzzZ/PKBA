import { describe, it, expect } from 'vitest'
import {
  AG_DATE,
  AG_TYPE,
  MESSAGE_MAX_LEN,
  buildAgFields,
  describeAgResponse,
  validateAg,
  type AgPayload,
} from '@/lib/ag'

const present: AgPayload = {
  firstName: 'Sophie',
  lastName: 'Martin',
  email: 'sophie@example.com',
  members: 'Léa Martin, Tom Martin',
  response: 'present',
}

const proxy: AgPayload = { ...present, response: 'pouvoir', proxyName: 'Jean Dupont' }

const TODAY = '2026-10-16'

describe('validateAg', () => {
  it('accepte une présence et un pouvoir complets', () => {
    expect(validateAg(present, TODAY)).toBeNull()
    expect(validateAg(proxy, TODAY)).toBeNull()
    expect(validateAg({ ...present, response: 'absent' }, TODAY)).toBeNull()
  })

  it('exige le nom, un email valide et les adhérents concernés', () => {
    expect(validateAg({ ...present, firstName: ' ' }, TODAY)).toBe('Nom et prénom requis')
    expect(validateAg({ ...present, email: 'nope' }, TODAY)).toBe('Email invalide')
    expect(validateAg({ ...present, members: '' }, TODAY)).toBe(
      'Indiquez le ou les adhérents concernés',
    )
  })

  it('refuse une réponse inconnue', () => {
    expect(validateAg({ ...present, response: 'peut-être' }, TODAY)).toBe(
      'Choisissez une réponse',
    )
  })

  it('exige le nom de la personne qui porte le pouvoir', () => {
    expect(validateAg({ ...proxy, proxyName: '  ' }, TODAY)).toBe(
      'Indiquez qui votera pour vous',
    )
  })

  it('refuse les champs optionnels qui ne sont pas du texte', () => {
    const bad = { ...present, message: 42 } as unknown as AgPayload
    expect(validateAg(bad, TODAY)).toBe('Requête invalide')
    const badProxy = { ...proxy, proxyName: ['x'] } as unknown as AgPayload
    expect(validateAg(badProxy, TODAY)).toBe('Requête invalide')
  })

  it('refuse un message trop long', () => {
    const atLimit = 'a'.repeat(MESSAGE_MAX_LEN)
    expect(validateAg({ ...present, message: atLimit }, TODAY)).toBeNull()
    expect(validateAg({ ...present, message: `${atLimit}b` }, TODAY)).toBe(
      'Message trop long (1000 caractères maximum)',
    )
  })

  it("accepte les réponses jusqu'au jour de l'AG puis les ferme", () => {
    expect(validateAg(present, AG_DATE)).toBeNull()
    expect(validateAg(present, '2026-11-07')).toBe(
      "Les réponses sont closes, l'assemblée générale a eu lieu",
    )
  })
})

describe('describeAgResponse', () => {
  it('résume la réponse en clair', () => {
    expect(describeAgResponse(present)).toBe('Présent')
    expect(describeAgResponse(proxy)).toBe('Pouvoir donné à Jean Dupont')
    expect(describeAgResponse({ ...present, response: 'absent' })).toBe('Absent, sans pouvoir')
  })
})

describe('buildAgFields', () => {
  it("enregistre la réponse dans Airtable sous le type de l'AG", () => {
    const fields = buildAgFields({ ...proxy, firstName: '  Sophie ', message: 'Une question' }, TODAY)
    expect(fields["Type d'inscription"]).toBe(AG_TYPE)
    expect(fields['Prénom']).toBe('Sophie')
    expect(fields['Nom']).toBe('Martin')
    expect(fields['Email']).toBe('sophie@example.com')
    expect(fields["Date d'inscription"]).toBe(TODAY)
    expect(fields['Jours sélectionnés']).toBe(
      'Pouvoir donné à Jean Dupont · Adhérents : Léa Martin, Tom Martin · Message : Une question',
    )
  })

  it("n'ajoute pas de message vide", () => {
    expect(buildAgFields(present, TODAY)['Jours sélectionnés']).toBe(
      'Présent · Adhérents : Léa Martin, Tom Martin',
    )
  })
})
