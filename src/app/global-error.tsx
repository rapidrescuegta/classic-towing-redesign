'use client'

// Custom global-error boundary. Required because Next.js 16's default
// _global-error route fails to prerender in this app (TypeError:
// Cannot read properties of null reading 'useContext'). Providing our
// own simple boundary sidesteps the issue and gives users a brand-
// consistent fallback if the root layout itself throws.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          color: '#FAFAFA',
          fontFamily:
            'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          padding: '2rem',
        }}
      >
        <div style={{ maxWidth: 480, textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: '#CC1C1C' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#8A8A8A', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            We hit an unexpected error. For 24/7 dispatch please call{' '}
            <a href="tel:+14166043222" style={{ color: '#FAFAFA', fontWeight: 600 }}>
              416-604-3222
            </a>
            .
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: '#CC1C1C',
              color: '#FAFAFA',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
          {error?.digest && (
            <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#555' }}>
              ref: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  )
}
