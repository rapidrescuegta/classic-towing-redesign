'use client'

import dynamic from 'next/dynamic'

// Load the feedback button purely on the client. html2canvas (used inside)
// touches DOM/window at module scope and was causing /_global-error to
// fail prerender in Next.js 16 with a null useContext error.
const FeedbackButton = dynamic(
  () => import('./FeedbackButton').then((m) => m.FeedbackButton),
  { ssr: false }
)

export function FeedbackButtonClient() {
  return <FeedbackButton />
}
