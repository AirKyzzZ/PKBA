import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_SECONDS,
  checkPassword,
  sessionToken,
} from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  if (!process.env.ADMIN_PASSWORD) {
    console.error('[admin] ADMIN_PASSWORD absent, connexion impossible')
    return NextResponse.json(
      { success: false, message: "Administration non configurée sur le serveur" },
      { status: 503 },
    )
  }

  const body = (await request.json().catch(() => ({}))) as { password?: unknown }
  if (!checkPassword(body.password)) {
    return NextResponse.json({ success: false, message: 'Mot de passe incorrect' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true }, { status: 200 })
  response.cookies.set(ADMIN_COOKIE, sessionToken(process.env.ADMIN_PASSWORD), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_SECONDS,
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ success: true }, { status: 200 })
  response.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 })
  return response
}
