import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial: _i, animate: _a, whileInView: _w, transition: _t, viewport: _v, ...htmlProps } = props
      return <div {...htmlProps}>{children}</div>
    },
  },
}))

// Mock fetch globally
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

import { CovoituragePage } from '@/components/CovoituragePage'

function getInput(name: string): HTMLInputElement {
  return document.querySelector(`input[name="${name}"]`) as HTMLInputElement
}

function getTextarea(name: string): HTMLTextAreaElement {
  return document.querySelector(`textarea[name="${name}"]`) as HTMLTextAreaElement
}

function mockFetchAnnonces(annonces: unknown[] = []) {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ annonces }),
  })
}

const sampleAnnonces = [
  {
    id: 'rec1',
    prenom: 'Alice',
    type: 'Propose',
    ville: 'Bordeaux',
    jours: 'Lundi, Mercredi',
    places: '3',
    message: 'Départ 8h',
    date: '2026-03-01',
  },
  {
    id: 'rec2',
    prenom: 'Bob',
    type: 'Cherche',
    ville: 'Arcachon',
    jours: 'Mardi',
    places: '',
    message: '',
    date: '2026-03-02',
  },
]

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(getInput('prenom'), 'Jean')
  await user.type(getInput('ville'), 'Bordeaux')
  await user.type(getInput('email'), 'jean@test.com')
  await user.type(getInput('phone'), '0612345678')
}

describe('CovoituragePage', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('renders hero, how-it-works, and form sections', async () => {
    mockFetchAnnonces()
    render(<CovoituragePage />)

    expect(screen.getByText('Covoiturage PKBA')).toBeInTheDocument()
    expect(screen.getByText('Publiez votre trajet')).toBeInTheDocument()
    expect(screen.getByText('Trouvez un partenaire')).toBeInTheDocument()
    expect(screen.getByText('Contact via le club')).toBeInTheDocument()
    expect(screen.getByText('Publier une annonce')).toBeInTheDocument()
  })

  it('toggles type buttons (Propose / Cherche)', async () => {
    mockFetchAnnonces()
    const user = userEvent.setup()
    render(<CovoituragePage />)

    const proposeBtn = screen.getByRole('button', { name: /Propose un trajet/ })
    const chercheBtn = screen.getByRole('button', { name: /Cherche un trajet/ })

    await user.click(proposeBtn)
    expect(proposeBtn.className).toContain('bg-green-50')

    await user.click(chercheBtn)
    expect(chercheBtn.className).toContain('bg-amber-50')
  })

  it('toggles day selection on/off', async () => {
    mockFetchAnnonces()
    const user = userEvent.setup()
    render(<CovoituragePage />)

    const lundiBtn = screen.getByRole('button', { name: 'Lundi' })

    expect(lundiBtn.className).toContain('bg-white')

    await user.click(lundiBtn)
    expect(lundiBtn.className).toContain('bg-primary')

    await user.click(lundiBtn)
    expect(lundiBtn.className).toContain('bg-white')
  })

  it('shows "Places" field only when type is "Propose"', async () => {
    mockFetchAnnonces()
    const user = userEvent.setup()
    render(<CovoituragePage />)

    // Not visible initially
    expect(document.querySelector('input[name="places"]')).not.toBeInTheDocument()

    // Click Propose → visible
    await user.click(screen.getByRole('button', { name: /Propose un trajet/ }))
    expect(document.querySelector('input[name="places"]')).toBeInTheDocument()

    // Click Cherche → hidden
    await user.click(screen.getByRole('button', { name: /Cherche un trajet/ }))
    expect(document.querySelector('input[name="places"]')).not.toBeInTheDocument()
  })

  it('shows error when submitting with no days selected', async () => {
    mockFetchAnnonces()
    const user = userEvent.setup()
    render(<CovoituragePage />)

    await user.click(screen.getByRole('button', { name: /Propose un trajet/ }))
    await fillRequiredFields(user)

    // Submit without selecting days
    await user.click(screen.getByRole('button', { name: /Publier l'annonce/ }))

    expect(screen.getByText('Sélectionnez au moins un jour de disponibilité.')).toBeInTheDocument()
  })

  it('shows success message on successful submission', async () => {
    mockFetchAnnonces() // initial load
    const user = userEvent.setup()
    render(<CovoituragePage />)

    await user.click(screen.getByRole('button', { name: /Propose un trajet/ }))
    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: 'Lundi' }))

    // Mock submit + refresh
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'OK' }),
    })
    mockFetchAnnonces() // refetch after submit

    await user.click(screen.getByRole('button', { name: /Publier l'annonce/ }))

    await waitFor(() => {
      expect(screen.getByText('Votre annonce a été publiée avec succès !')).toBeInTheDocument()
    })
  })

  it('shows error message on API error', async () => {
    mockFetchAnnonces()
    const user = userEvent.setup()
    render(<CovoituragePage />)

    await user.click(screen.getByRole('button', { name: /Propose un trajet/ }))
    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: 'Lundi' }))

    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Erreur test' }),
    })

    await user.click(screen.getByRole('button', { name: /Publier l'annonce/ }))

    await waitFor(() => {
      expect(screen.getByText('Erreur test')).toBeInTheDocument()
    })
  })

  it('disables submit button when no type is selected', async () => {
    mockFetchAnnonces()
    render(<CovoituragePage />)

    const submitBtn = screen.getByRole('button', { name: /Publier l'annonce/ })
    expect(submitBtn).toBeDisabled()
  })

  it('renders annonces board when data is present', async () => {
    mockFetchAnnonces(sampleAnnonces)
    render(<CovoituragePage />)

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument()
      expect(screen.getByText('Bob')).toBeInTheDocument()
      expect(screen.getByText('Bordeaux')).toBeInTheDocument()
      expect(screen.getByText('Arcachon')).toBeInTheDocument()
    })
  })

  it('shows empty state when no annonces', async () => {
    mockFetchAnnonces([])
    render(<CovoituragePage />)

    await waitFor(() => {
      expect(screen.getByText('Aucune annonce pour le moment')).toBeInTheDocument()
    })
  })
})
