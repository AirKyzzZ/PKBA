import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial: _i, animate: _a, whileInView: _w, transition: _t, viewport: _v, ...htmlProps } = props
      return <div {...htmlProps}>{children}</div>
    },
  },
}))

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

import { AnniversairesPage } from '@/components/AnniversairesPage'

function getInput(name: string): HTMLInputElement {
  return document.querySelector(`input[name="${name}"]`) as HTMLInputElement
}

function getTextarea(name: string): HTMLTextAreaElement {
  return document.querySelector(`textarea[name="${name}"]`) as HTMLTextAreaElement
}

async function fillAllRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(getInput('parentName'), 'Dupont')
  await user.type(getInput('email'), 'test@test.com')
  await user.type(getInput('phone'), '0612345678')
  await user.type(getInput('childName'), 'Lucas')
  await user.type(getInput('childAge'), '8')
  await user.type(getInput('preferredDate'), '2026-04-15')
  await user.type(getInput('numberOfChildren'), '10')
}

describe('AnniversairesPage', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('renders hero, features grid, steps, and form', () => {
    render(<AnniversairesPage />)

    // Hero
    expect(screen.getByText('Anniversaires Parkour')).toBeInTheDocument()

    // Features
    expect(screen.getByText('Animations parkour')).toBeInTheDocument()
    expect(screen.getByText('Encadrement pro')).toBeInTheDocument()
    expect(screen.getByText('Parcours adaptés')).toBeInTheDocument()
    expect(screen.getByText('Moment inoubliable')).toBeInTheDocument()

    // Steps
    expect(screen.getByText('Comment ça marche ?')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Organisation')).toBeInTheDocument()
    expect(screen.getByText('Fête !')).toBeInTheDocument()

    // Form
    expect(screen.getByText('Faire une demande')).toBeInTheDocument()
  })

  it('renders all form fields', () => {
    render(<AnniversairesPage />)

    expect(getInput('parentName')).toBeInTheDocument()
    expect(getInput('email')).toBeInTheDocument()
    expect(getInput('phone')).toBeInTheDocument()
    expect(getInput('childName')).toBeInTheDocument()
    expect(getInput('childAge')).toBeInTheDocument()
    expect(getInput('preferredDate')).toBeInTheDocument()
    expect(getInput('numberOfChildren')).toBeInTheDocument()
    expect(getTextarea('message')).toBeInTheDocument()
  })

  it('shows success view on successful submission', async () => {
    const user = userEvent.setup()
    render(<AnniversairesPage />)

    await fillAllRequiredFields(user)

    mockFetch.mockResolvedValueOnce({ ok: true })

    await user.click(screen.getByRole('button', { name: /Envoyer la demande/ }))

    await waitFor(() => {
      expect(screen.getByText('Demande envoyée !')).toBeInTheDocument()
    })
  })

  it('shows error message on submission failure', async () => {
    const user = userEvent.setup()
    render(<AnniversairesPage />)

    await fillAllRequiredFields(user)

    mockFetch.mockResolvedValueOnce({ ok: false })

    await user.click(screen.getByRole('button', { name: /Envoyer la demande/ }))

    await waitFor(() => {
      expect(screen.getByText(/Une erreur est survenue/)).toBeInTheDocument()
    })
  })

  it('shows error message on network error', async () => {
    const user = userEvent.setup()
    render(<AnniversairesPage />)

    await fillAllRequiredFields(user)

    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    await user.click(screen.getByRole('button', { name: /Envoyer la demande/ }))

    await waitFor(() => {
      expect(screen.getByText(/Une erreur est survenue/)).toBeInTheDocument()
    })
  })

  it('sends correct data to Formspree', async () => {
    const user = userEvent.setup()
    render(<AnniversairesPage />)

    await fillAllRequiredFields(user)

    mockFetch.mockResolvedValueOnce({ ok: true })

    await user.click(screen.getByRole('button', { name: /Envoyer la demande/ }))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledOnce()
    })

    const [url, opts] = mockFetch.mock.calls[0]
    expect(url).toContain('formspree.io')
    expect(opts.method).toBe('POST')
    expect(opts.headers['Content-Type']).toBe('application/x-www-form-urlencoded')

    const body = new URLSearchParams(opts.body)
    expect(body.get('Nom du parent')).toBe('Dupont')
    expect(body.get('Email')).toBe('test@test.com')
    expect(body.get("Nom de l'enfant")).toBe('Lucas')
  })

  it('disables submit button during submission', async () => {
    const user = userEvent.setup()
    render(<AnniversairesPage />)

    await fillAllRequiredFields(user)

    let resolveSubmit!: (value: { ok: boolean }) => void
    mockFetch.mockReturnValueOnce(new Promise((resolve) => { resolveSubmit = resolve }))

    await user.click(screen.getByRole('button', { name: /Envoyer la demande/ }))

    await waitFor(() => {
      const btn = screen.getByRole('button', { name: /Envoi en cours/ })
      expect(btn).toBeDisabled()
    })

    resolveSubmit({ ok: true })
  })
})
