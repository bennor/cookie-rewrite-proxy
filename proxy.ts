import { NextResponse, type NextRequest } from 'next/server'

export const botCookieConfig = {
  detectionHeader: 'x-vercel-bot-category',
  name: '_example_cookie',
  // This could instead be a fresh crypto.randomUUID() with its hyphens removed.
  noBotValue: () => '00000000000000000000000000000000',
  // This UUID pool could instead be parsed from an environment variable, or use Vercel Global Config
  values: [
    // Example values only
    'ea90a39e0d744a9185f384cee6340b9b',
    '3f211f46d1f54504b49b29a19a17711c',
    '96005f22733b430abf86f6227f5c7212',
    '26a6f77d1192422ba525e2c1b11591f5',
    '6ca12cb33bdd41c1809b4917cf1fc58f',
    '3494ebeb938f493985a4451c9ccb3d09',
    'c5523e72afb0428ebe609dba3f150300',
    '9f3619d2551544c29e45ef9346287bf0',
    'ff2ce60b429e486eae6de5565ca4c228',
    '2e8851f610124c0d857f7272eaeb47ed',
  ],
} as const

export function proxy(request: NextRequest) {
  const isBot = request.headers.has(botCookieConfig.detectionHeader)
  const cookieValue = isBot
    ? botCookieConfig.values[Math.floor(Math.random() * botCookieConfig.values.length)]
    : botCookieConfig.noBotValue()

  request.cookies.set(botCookieConfig.name, cookieValue)

  const response = NextResponse.next({
    request: {
      // This will forward the bot headers. You may wish to exclude them.
      headers: new Headers(request.headers),
    },
  })

  response.cookies.set(botCookieConfig.name, cookieValue, {
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
  // Ensure cookie response isn't cacheable
  response.headers.set('Cache-Control', 'private, no-store')

  return response
}

export const config = {
  // Matchers determine when the proxy code runs
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  matcher: [
    {
      // Only run for matching paths
      source: '/((?!vercel(?:/|$)|api(?:/|$)|_next/|favicon.ico$|.*\\.[^/]+$).*)',
      // Only run proxy code if the cookie isn't already set
      missing: [{ type: 'cookie', key: '_example_cookie' }],
    },
  ],
}
