'use client'

export default function GlobalError({
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: '#0A0A0A',
          color: '#FAFAFA',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
          Something went wrong
        </h1>
        <p style={{ color: '#8A8A8A', margin: 0 }}>
          Please try again — or call us 24/7 at{' '}
          <a href="tel:416-604-3222" style={{ color: '#E83333' }}>
            416-604-3222
          </a>
          .
        </p>
        <button
          onClick={() => reset()}
          style={{
            background: '#CC1C1C',
            color: '#fff',
            border: 0,
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
