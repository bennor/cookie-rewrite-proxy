export default function VercelPage() {
  return (
    <main>
      <p className="eyebrow">Served by the proxy project</p>
      <h1>This route does not reach the legacy origin.</h1>
      <p>
        All other public paths are rewritten by <code>vercel.ts</code> to the configured{' '}
        <code>LEGACY_ORIGIN</code>.
      </p>
      <a href="/">Visit the rewritten origin</a>
    </main>
  )
}
