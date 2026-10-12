import { describe, it, expect } from 'vitest'
import {
  formatDaysSelected,
  formatFormuleLabel,
  formatWeekLabel,
  parseFormuleId,
  validateStageInscription,
  type StageInscriptionPayload,
} from '@/lib/stage-inscription'
import { STAGES, type StageDay } from '@/content/stages'
import { groupDaysByWeek } from '@/lib/stage-pricing'

const TODAY = '2026-10-12'

const valid: StageInscriptionPayload = {
  selectedStage: 'toussaint-2026',
  selectedFormule: 'formule1',
  firstName: 'Léa',
  lastName: 'Martin',
  birthDate: '2015-03-10',
  gender: 'Féminin',
  adhesionType: ['Ancien Adhérent'],
  address: '1 rue du Port',
  postalCode: '33470',
  city: 'Gujan-Mestras',
  phone: '06 12 34 56 78',
  email: 'sophie@example.com',
  legalGuardian1: { firstName: 'Sophie', lastName: 'Martin', phone: '0611223344' },
  legalGuardian2: { firstName: '', lastName: '', phone: '' },
  emergencyContact: { name: 'Marie Martin', phone: '+33 6 98 76 54 32' },
  imageRights: false,
  termsAccepted: true,
  selectedDates: ['2026-10-27', '2026-10-23'],
  signature: 'data:image/png;base64,AAAA',
  signatureDate: '2026-10-12',
}

const messageOf = (payload: StageInscriptionPayload, today = TODAY) => {
  const check = validateStageInscription(payload, today)
  return check.ok ? null : check.message
}

describe('validateStageInscription', () => {
  it('accepte une inscription valide et normalise les jours', () => {
    const check = validateStageInscription(valid, TODAY)
    expect(check).toMatchObject({
      ok: true,
      formuleId: 1,
      selectedDates: ['2026-10-23', '2026-10-27'],
      adhesionTypes: ['Ancien Adhérent'],
      signatureDate: '2026-10-12',
    })
  })

  it("accepte un refus du droit à l'image", () => {
    expect(messageOf({ ...valid, imageRights: false })).toBeNull()
    expect(messageOf({ ...valid, imageRights: true })).toBeNull()
  })

  it('refuse un email mal formé', () => {
    expect(messageOf({ ...valid, email: 'sophie@example' })).toBe('Email invalide')
  })

  it("refuse un téléphone qui n'est pas un numéro français", () => {
    expect(messageOf({ ...valid, phone: '12' })).toBe('Numéro de téléphone invalide')
  })

  it("refuse un téléphone de contact d'urgence invalide", () => {
    expect(
      messageOf({ ...valid, emergencyContact: { name: 'Marie', phone: '123' } }),
    ).toBe("Téléphone du contact d'urgence invalide")
  })

  it("refuse un téléphone de responsable invalide seulement s'il est renseigné", () => {
    expect(
      messageOf({ ...valid, legalGuardian2: { firstName: 'Paul', phone: '0000' } }),
    ).toBe('Téléphone du responsable légal 2 invalide')
    expect(messageOf({ ...valid, legalGuardian2: {} })).toBeNull()
  })

  it('refuse une date de naissance illisible ou dans le futur', () => {
    expect(messageOf({ ...valid, birthDate: '2015-02-30' })).toBe('Date de naissance invalide')
    expect(messageOf({ ...valid, birthDate: '2026-10-13' })).toBe(
      'La date de naissance ne peut pas être dans le futur',
    )
  })

  it("vérifie l'âge minimum de la formule au premier jour choisi", () => {
    const turnsEightOn24 = { ...valid, birthDate: '2018-10-24' }
    expect(messageOf(turnsEightOn24)).toBe('Âge minimum de 8 ans requis pour la Formule 1')
    expect(messageOf({ ...turnsEightOn24, selectedDates: ['2026-10-26'] })).toBeNull()
    expect(messageOf({ ...turnsEightOn24, selectedFormule: 'formule2' })).toBeNull()
    expect(
      messageOf({ ...valid, birthDate: '2021-01-01', selectedFormule: 'formule2' }),
    ).toBe('Âge minimum de 6 ans requis pour la Formule 2')
  })

  it('refuse un stage inconnu ou déjà terminé', () => {
    expect(messageOf({ ...valid, selectedStage: 'noel-2026' })).toBe('Stage invalide ou manquant')
    expect(messageOf({ ...valid, selectedStage: 'toString' })).toBe('Stage invalide ou manquant')
    expect(
      messageOf({ ...valid, selectedStage: 'juillet-2026', selectedDates: ['2026-07-06'] }),
    ).toBe('Ce stage est terminé, les inscriptions sont closes')
    expect(messageOf(valid, '2026-10-30')).toBeNull()
    expect(messageOf(valid, '2026-10-31')).toBe('Ce stage est terminé, les inscriptions sont closes')
  })

  it("refuse des jours qui n'appartiennent pas au stage", () => {
    expect(messageOf({ ...valid, selectedDates: ['2026-10-23', '2026-08-17'] })).toBe(
      'Jours sélectionnés invalides pour ce stage',
    )
    expect(messageOf({ ...valid, selectedDates: [] })).toBe(
      'Au moins une journée doit être sélectionnée',
    )
  })

  it('refuse une formule manquante ou inconnue', () => {
    expect(messageOf({ ...valid, selectedFormule: undefined })).toBe('Formule invalide ou manquante')
    expect(messageOf({ ...valid, selectedFormule: '' })).toBe('Formule invalide ou manquante')
    expect(messageOf({ ...valid, selectedFormule: 'formule3' })).toBe('Formule invalide ou manquante')
  })

  it("exige un type d'adhésion", () => {
    expect(messageOf({ ...valid, adhesionType: [] })).toBe("Type d'adhésion requis")
  })

  it('exige le responsable légal 1 pour un mineur seulement', () => {
    const sansResponsable = { ...valid, legalGuardian1: {} }
    expect(messageOf(sansResponsable)).toBe('Informations du responsable légal 1 incomplètes')
    expect(messageOf({ ...sansResponsable, birthDate: '2008-10-12' })).toBeNull()
    expect(messageOf({ ...sansResponsable, birthDate: '2008-10-13' })).toBe(
      'Informations du responsable légal 1 incomplètes',
    )
  })
})

describe('parseFormuleId', () => {
  it('ne reconnaît que les formules existantes', () => {
    expect(parseFormuleId('formule1')).toBe(1)
    expect(parseFormuleId('formule2')).toBe(2)
    expect(parseFormuleId('formule3')).toBeNull()
    expect(parseFormuleId(1)).toBeNull()
  })
})

describe('formatage', () => {
  it('décrit la formule avec ses horaires', () => {
    expect(formatFormuleLabel(1)).toBe('Formule 1 (10h-16h)')
    expect(formatFormuleLabel(2)).toBe('Formule 2 (16h-17h30)')
  })

  it('liste les jours triés', () => {
    expect(formatDaysSelected(['2026-10-27', '2026-10-23'])).toBe('Ven 23/10, Mar 27/10')
  })

  it("nomme une semaine d'un seul jour par son jour complet", () => {
    const [week1, week2] = groupDaysByWeek(STAGES['toussaint-2026'].days)
    expect(formatWeekLabel(week1)).toBe('Vendredi 23 oct.')
    expect(formatWeekLabel(week2)).toBe('du 26 au 30 oct.')
  })

  it('garde les deux mois quand la semaine change de mois', () => {
    const days: StageDay[] = [
      { date: '2026-09-28', label: 'Lun 28 sept.', weekIndex: 0 },
      { date: '2026-10-02', label: 'Ven 2 oct.', weekIndex: 0 },
    ]
    expect(formatWeekLabel(days)).toBe('du 28 sept. au 2 oct.')
  })
})
