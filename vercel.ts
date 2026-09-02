import { routes, type VercelConfig } from '@vercel/config/v1'

const legacyOrigin = process.env.LEGACY_ORIGIN?.replace(/\/$/, '')

if (!legacyOrigin) {
  throw new Error('LEGACY_ORIGIN must be set before building or deploying')
}

export const config: VercelConfig = {
  framework: 'nextjs',
  rewrites: [
    routes.rewrite(
      '/:path((?!vercel(?:/|$)|_next(?:/|$)|favicon\\.ico$).*)',
      `${legacyOrigin}/:path*`,
    ),
  ],
}
