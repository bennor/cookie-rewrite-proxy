# Cookie rewrite proxy

An independent Next.js project that sets `vercel-origin-proxy=enabled` in `proxy.ts`, then applies its external origin rewrite from `vercel.ts`. The `/vercel` path remains local.

Set `LEGACY_ORIGIN` before building or deploying:

```bash
LEGACY_ORIGIN=https://your-origin.example.com pnpm build
```

Use `vercel dev` after linking the project when you need to test the `vercel.ts` routing configuration locally.
