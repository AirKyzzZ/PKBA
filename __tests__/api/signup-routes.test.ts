import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const notifyMock = vi.hoisted(() => vi.fn())
vi.mock('@/lib/notifications', () => ({ notifySignup: notifyMock }))

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

type Handler = (req: Request) => Promise<Response>

const rawRequest = (url: string, body: string) =>
  new Request(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })

const stageBody = {
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
  emergencyContact: { name: 'Marie Martin', phone: '0698765432' },
  imageRights: false,
  termsAccepted: true,
  selectedDates: ['2026-10-26', '2026-10-27', '2026-10-28', '2026-10-29', '2026-10-30', '2026-10-23'],
  signature: 'data:image/png;base64,AAAA',
  signatureDate: '2026-10-12',
}

const preinscriptionBody = {
  firstName: 'Léa',
  lastName: 'Martin',
  birthDate: '2017-05-12',
  groupeSouhaite: 'Loisir 6-8 ans vendredi',
  phone: '0612345678',
  email: 'sophie@example.com',
  consent: true,
}

const routes: Array<[string, string, () => Promise<{ POST: unknown }>]> = [
  ['submit-inscription', 'http://localhost/api/submit-inscription', () => import('@/app/api/submit-inscription/route')],
  ['submit-preinscription', 'http://localhost/api/submit-preinscription', () => import('@/app/api/submit-preinscription/route')],
]

beforeEach(() => {
  vi.resetModules()
  mockFetch.mockReset()
  notifyMock.mockReset()
  vi.stubEnv('AIRTABLE_API_KEY', 'test-key')
  vi.stubEnv('AIRTABLE_BASE_ID', 'test-base')
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-10-12T10:00:00Z'))
})

afterEach(() => {
  vi.useRealTimers()
})

describe.each(routes)('POST /api/%s', (_name, url, load) => {
  it.each([
    ['un corps vide', ''],
    ['du JSON mal formé', '{"firstName":'],
    ['null', 'null'],
    ['un tableau', '[]'],
  ])('répond 400 Requête invalide pour %s', async (_label, raw) => {
    const POST = (await load()).POST as Handler
    const res = await POST(rawRequest(url, raw))
    expect(res.status).toBe(400)
    expect((await res.json()).message).toBe('Requête invalide')
    expect(mockFetch).not.toHaveBeenCalled()
  })
})

describe('notifications dans la réponse', () => {
  it.each([
    ['submit-inscription', stageBody],
    ['submit-preinscription', preinscriptionBody],
  ] as const)('%s renvoie le résultat des envois sans échouer', async (name, body) => {
    mockFetch.mockResolvedValue(new Response(JSON.stringify({ id: 'recTest' }), { status: 200 }))
    notifyMock.mockResolvedValue({ club: 'failed', family: 'sent' })
    const [, url, load] = routes.find(([n]) => n === name)!
    const POST = (await load()).POST as Handler
    const res = await POST(rawRequest(url, JSON.stringify(body)))
    expect(res.status).toBe(200)
    expect(await res.json()).toMatchObject({
      success: true,
      id: 'recTest',
      notifications: { club: 'failed', family: 'sent' },
    })
  })
})

describe('POST /api/submit-inscription, formule', () => {
  it('enregistre la formule dans Jours sélectionnés et la met dans le mail avec le total', async () => {
    mockFetch.mockResolvedValue(new Response(JSON.stringify({ id: 'recTest' }), { status: 200 }))
    notifyMock.mockResolvedValue({ club: 'sent', family: 'sent' })
    const { POST } = await import('@/app/api/submit-inscription/route')
    const res = await (POST as unknown as Handler)(
      rawRequest('http://localhost/api/submit-inscription', JSON.stringify(stageBody)),
    )
    expect(res.status).toBe(200)

    const sent = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(sent.fields['Jours sélectionnés']).toBe(
      'Formule 1 (10h-16h) · Ven 23/10, Lun 26/10, Mar 27/10, Mer 28/10, Jeu 29/10, Ven 30/10',
    )
    expect(sent.fields['Nombre de séances']).toBe(6)

    const lines = notifyMock.mock.calls[0][0].lines
    expect(lines).toContainEqual(['Formule', 'Formule 1 (10h-16h)'])
    expect(lines).toContainEqual(['Total', '125€'])
  })

  it('refuse une formule absente avant tout appel à Airtable', async () => {
    const { POST } = await import('@/app/api/submit-inscription/route')
    const res = await (POST as unknown as Handler)(
      rawRequest(
        'http://localhost/api/submit-inscription',
        JSON.stringify({ ...stageBody, selectedFormule: '' }),
      ),
    )
    expect(res.status).toBe(400)
    expect((await res.json()).message).toBe('Formule invalide ou manquante')
    expect(mockFetch).not.toHaveBeenCalled()
  })
})
