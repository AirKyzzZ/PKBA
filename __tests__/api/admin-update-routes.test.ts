import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { ADMIN_COOKIE, sessionToken } from '@/lib/admin-auth'

const PASSWORD = 'test-password'
const RECORD = 'recAAAAAAAAAAAAAA'
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

const request = (path: string, body: string, authed = true) =>
  new NextRequest(`http://localhost/api/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(authed ? { Cookie: `${ADMIN_COOKIE}=${sessionToken(PASSWORD)}` } : {}),
    },
    body,
  })

const routes = [
  { path: 'update-inscription-status', key: 'status', valid: 'Nouvelle inscription', field: 'Statut' },
  { path: 'update-inscription-medical', key: 'medicalStatus', valid: 'Manquant', field: 'Certificat médical' },
] as const

describe.each(routes)('POST /api/$path', ({ path, key, valid, field }) => {
  let POST: (req: NextRequest) => Promise<Response>

  beforeEach(async () => {
    vi.resetModules()
    mockFetch.mockReset()
    vi.stubEnv('ADMIN_PASSWORD', PASSWORD)
    vi.stubEnv('AIRTABLE_API_KEY', 'key')
    vi.stubEnv('AIRTABLE_BASE_ID', 'base')
    POST = (await import(`@/app/api/${path}/route`)).POST
  })

  it('refuse sans session admin', async () => {
    const res = await POST(request(path, JSON.stringify({ id: RECORD, [key]: valid }), false))
    expect(res.status).toBe(401)
  })

  it('renvoie 400 sur un JSON invalide', async () => {
    expect((await POST(request(path, '{bad'))).status).toBe(400)
  })

  it('refuse une valeur hors liste sans appeler Airtable', async () => {
    const res = await POST(request(path, JSON.stringify({ id: RECORD, [key]: 'Pirate' })))
    expect(res.status).toBe(400)
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('écrit une valeur proposée par l admin avec typecast pour créer l option', async () => {
    mockFetch.mockResolvedValue(new Response(JSON.stringify({ id: RECORD }), { status: 200 }))
    const res = await POST(request(path, JSON.stringify({ id: RECORD, [key]: valid })))
    expect(res.status).toBe(200)
    const sent = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(sent).toEqual({ fields: { [field]: valid }, typecast: true })
  })
})
