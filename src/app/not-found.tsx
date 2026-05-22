import Link from 'next/link'

export const metadata = {
  title: 'Not Found | Classic Towing & Storage',
}

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0A0A',
        color: '#FAFAFA',
        padding: '2rem',
        fontFamily:
          'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      }}
    >
      <div style={{ maxWidth: 480, textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: '#CC1C1C', marginBottom: '0.5rem' }}>
          404
        </h1>
        <p style={{ color: '#8A8A8A', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          That page doesn&apos;t exist. For 24/7 dispatch call{' '}
          <a href="tel:+14166043222" style={{ color: '#FAFAFA', fontWeight: 600 }}>
            416-604-3222
          </a>
          .
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            background: '#CC1C1C',
            color: '#FAFAFA',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
