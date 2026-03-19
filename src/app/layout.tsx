import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Classic Towing & Storage | Southern Ontario Towing',
  description: 'Classic Towing provides 24/7 Light, Medium, and Heavy Duty Towing across Southern Ontario with locations in Toronto, Mississauga, Hamilton, Ajax, Barrie, and Huntsville.',
  metadataBase: new URL('https://classictowing.ca'),
  openGraph: {
    title: 'Classic Towing & Storage | Southern Ontario Towing',
    description: '24/7 Towing & Roadside Assistance across Southern Ontario. 150+ fleet vehicles. Family-owned since the 1980s.',
    type: 'website',
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
        {children}
      </body>
    </html>
  )
}
