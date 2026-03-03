import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockEnv = {
  AIRTABLE_API_KEY: 'test-key',
  AIRTABLE_BASE_ID: 'test-base',
}

vi.stubEnv('AIRTABLE_API_KEY', mockEnv.AIRTABLE_API_KEY)
vi.stubEnv('AIRTABLE_BASE_ID', mockEnv.AIRTABLE_BASE_ID)

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

const mockAirtableResponse = {
  records: [
    {
      id: 'rec1',
      fields: {
        'Prénom': 'Alice',
        'Email': 'alice@secret.com',
        'Téléphone': '0600000000',
        'Type': 'Propose',
        'Ville de départ': 'Bordeaux',
        'Jours disponibles': 'Lundi, Mercredi',
        'Nombre de places': '3',
        'Message': 'Départ 8h',
        'Date': '2026-03-01',
      },
    },
    {
      id: 'rec2',
      fields: {
        'Prénom': 'Bob',
        'Email': 'bob@secret.com',
        'Téléphone': '0611111111',
        'Type': 'Cherche',
        'Ville de départ': 'Arcachon',
        'Jours disponibles': 'Mardi',
        'Nombre de places': '',
        'Message': '',
        'Date': '2026-03-02',
      },
    },
  ],
}

describe('GET /api/get-covoiturage', () => {
  let GET: () => Promise<Response>

  beforeEach(async () => {
    vi.resetModules()
    mockFetch.mockReset()
    vi.stubEnv('AIRTABLE_API_KEY', mockEnv.AIRTABLE_API_KEY)
    vi.stubEnv('AIRTABLE_BASE_ID', mockEnv.AIRTABLE_BASE_ID)
    const mod = await import('@/app/api/get-covoiturage/route')
    GET = mod.GET
  })

  it('returns 500 when Airtable config is missing', async () => {
    vi.stubEnv('AIRTABLE_API_KEY', '')
    vi.stubEnv('AIRTABLE_BASE_ID', '')
    vi.resetModules()
    const mod = await import('@/app/api/get-covoiturage/route')

    const res = await mod.GET()
    expect(res.status).toBe(500)
    const data = await res.json()
    expect(data.message).toBe('Configuration serveur manquante')
  })

  it('returns 200 with correctly mapped annonces', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockAirtableResponse,
    })

    const res = await GET()
    expect(res.status).toBe(200)
    const data = await res.json()

    expect(data.annonces).toHaveLength(2)
    expect(data.annonces[0]).toEqual({
      id: 'rec1',
      prenom: 'Alice',
      type: 'Propose',
      ville: 'Bordeaux',
      jours: 'Lundi, Mercredi',
      places: '3',
      message: 'Départ 8h',
      date: '2026-03-01',
    })
  })

  it('returns 500 when Airtable responds with error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'Airtable error',
    })

    const res = await GET()
    expect(res.status).toBe(500)
    const data = await res.json()
    expect(data.message).toBe('Erreur lors de la récupération des annonces')
  })

  it('does not expose email or phone in returned data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockAirtableResponse,
    })

    const res = await GET()
    const data = await res.json()

    for (const annonce of data.annonces) {
      expect(annonce).not.toHaveProperty('email')
      expect(annonce).not.toHaveProperty('phone')
      expect(annonce).not.toHaveProperty('Email')
      expect(annonce).not.toHaveProperty('Téléphone')
      expect(JSON.stringify(annonce)).not.toContain('@secret.com')
    }
  })
})
