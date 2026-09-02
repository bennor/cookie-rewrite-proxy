# Cookie rewrite proxy

An independent Next.js project that applies its external origin rewrite from `vercel.ts`. The `/vercel` path remains local.

For extensionless HTML page requests where `x-vercel-bot-category` is present, `proxy.ts` selects one of 10 UUID-derived identifiers and sets it as `_example_cookie`. The identifiers are stored without hyphens. Without the header, `_example_cookie` is set to 32 zeros. The value is added to the current upstream request and returned as a JavaScript-readable browser cookie. Requests that already contain the `_example_cookie` key skip middleware and continue to the external rewrite unchanged.

Set `LEGACY_ORIGIN` before building or deploying:

```bash
LEGACY_ORIGIN=https://your-origin.example.com pnpm build
```

Use `vercel dev` after linking the project when you need to test the `vercel.ts` routing configuration locally.
