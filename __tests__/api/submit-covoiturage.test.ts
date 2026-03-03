import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock env vars before importing route
const mockEnv = {
  AIRTABLE_API_KEY: 'test-key',
  AIRTABLE_BASE_ID: 'test-base',
}

vi.stubEnv('AIRTABLE_API_KEY', mockEnv.AIRTABLE_API_KEY)
vi.stubEnv('AIRTABLE_BASE_ID', mockEnv.AIRTABLE_BASE_ID)

// Mock global fetch
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

function makeRequest(body: Record<string, unknown>) {
  return new Request('http://localhost/api/submit-covoiturage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

const validBody = {
  prenom: 'Jean',
  email: 'jean@test.com',
  phone: '0612345678',
  type: 'Propose',
  ville: 'Bordeaux',
  jours: 'Lundi, Mercredi',
  places: '3',
  message: 'Test message',
}

describe('POST /api/submit-covoiturage', () => {
  let POST: (req: Request) => Promise<Response>

  beforeEach(async () => {
    vi.resetModules()
    mockFetch.mockReset()
    vi.stubEnv('AIRTABLE_API_KEY', mockEnv.AIRTABLE_API_KEY)
    vi.stubEnv('AIRTABLE_BASE_ID', mockEnv.AIRTABLE_BASE_ID)
    const mod = await import('@/app/api/submit-covoiturage/route')
    POST = mod.POST as (req: Request) => Promise<Response>
  })

  it('returns 400 when a required field is missing', async () => {
    const { prenom: _, ...body } = validBody
    const res = await POST(makeRequest(body))
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.message).toBe('Champs obligatoires manquants')
  })

  it('returns 400 when a required field is empty/whitespace', async () => {
    const res = await POST(makeRequest({ ...validBody, prenom: '   ' }))
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.message).toBe('Champs obligatoires incomplets')
  })

  it('returns 400 when type value is invalid', async () => {
    const res = await POST(makeRequest({ ...validBody, type: 'Invalid' }))
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.message).toBe("Type d'annonce invalide")
  })

  it('returns 500 when Airtable config is missing', async () => {
    vi.stubEnv('AIRTABLE_API_KEY', '')
    vi.stubEnv('AIRTABLE_BASE_ID', '')
    vi.resetModules()
    const mod = await import('@/app/api/submit-covoiturage/route')
    const freshPOST = mod.POST as (req: Request) => Promise<Response>

    const res = await freshPOST(makeRequest(validBody))
    expect(res.status).toBe(500)
    const data = await res.json()
    expect(data.message).toBe('Configuration serveur manquante')
  })

  it('returns 200 on successful submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'rec123', fields: {} }),
    })

    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.message).toBe('Annonce publiée avec succès')

    expect(mockFetch).toHaveBeenCalledOnce()
    const [url, opts] = mockFetch.mock.calls[0]
    expect(url).toContain('api.airtable.com')
    expect(opts.method).toBe('POST')
  })

  it('returns 500 when Airtable responds with error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: { type: 'INVALID_REQUEST' } }),
    })

    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(500)
    const data = await res.json()
    expect(data.message).toBe("Erreur lors de l'enregistrement de l'annonce")
  })

  it('returns 200 when optional fields are missing', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'rec456', fields: {} }),
    })

    const { places: _, message: __, ...requiredOnly } = validBody
    const res = await POST(makeRequest(requiredOnly))
    expect(res.status).toBe(200)
  })
})
