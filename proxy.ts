import { NextResponse, type NextRequest } from 'next/server'

const COOKIE_NAME = 'vercel-origin-proxy'
const COOKIE_VALUE = 'enabled'

export function proxy(request: NextRequest) {
  request.cookies.set(COOKIE_NAME, COOKIE_VALUE)

  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  })

  response.cookies.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
  response.headers.set('Cache-Control', 'private, no-store')

  return response
}

export const config = {
  matcher: ['/((?!vercel(?:/|$)|_next/|favicon.ico$).*)'],
}
