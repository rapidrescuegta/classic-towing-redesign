import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { JsonLd } from '@/components/JsonLd'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL = 'https://classictowing.ca'
const TITLE = 'Classic Towing & Storage | 24/7 Towing — Toronto, Ajax, Barrie & Hamilton'
const DESCRIPTION =
  '24/7 Light, Medium & Heavy Duty Towing across Southern Ontario. 250+ fleet vehicles, 40+ years family-owned. Locations in Toronto, Ajax, Barrie and Hamilton. Call 416-604-3222.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  keywords: [
    'towing', 'tow truck', 'heavy duty towing', 'accident recovery',
    'roadside assistance', 'Toronto towing', 'Hamilton towing',
    'Ajax towing', 'Barrie towing', 'Southern Ontario towing',
    'Heavy Rescue 401', '24 hour towing',
  ],
  icons: {
    icon: '/images/classic-logo.png',
    apple: '/images/classic-logo.png',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    siteName: 'Classic Towing & Storage',
    locale: 'en_CA',
    images: [
      {
        url: '/images/bg-about.jpg',
        width: 1920,
        height: 1080,
        alt: 'Classic Heavy Towing truck — Classic Towing & Storage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/bg-about.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  )
}
