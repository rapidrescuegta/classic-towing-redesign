'use client'

import { useState } from 'react'
import { X, Send, Bug, Lightbulb, HelpCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'

const CATEGORIES = [
  { value: 'bug', label: 'Bug', icon: Bug },
  { value: 'suggestion', label: 'Suggestion', icon: Lightbulb },
  { value: 'question', label: 'Question', icon: HelpCircle },
] as const

type LogEntry = {
  level: string
  message: string
  timestamp: string
}

interface FeedbackModalProps {
  screenshot: string | null
  consoleLogs: LogEntry[]
  onClose: () => void
}

export function FeedbackModal({ screenshot, consoleLogs, onClose }: FeedbackModalProps) {
  const pathname = usePathname()
  const [comment, setComment] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('bug')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!comment.trim()) return
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment,
          screenshot,
          consoleLogs,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          category,
          email: email.trim() || undefined,
        }),
      })
      if (res.ok) {
        setSent(true)
        setTimeout(onClose, 1500)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data?.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    }
    setSending(false)
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-black/10 rounded-xl shadow-2xl w-full max-w-lg text-classic-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/10">
          <h2 className="font-semibold text-base text-classic-black">Send Feedback</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-classic-steel hover:text-classic-black transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {sent ? (
            <div className="text-center py-8">
              <div className="text-classic-red text-lg font-semibold mb-1">Thanks!</div>
              <div className="text-classic-steel text-sm">Your feedback has been submitted.</div>
            </div>
          ) : (
            <>
              {/* Screenshot preview */}
              {screenshot && (
                <div className="rounded-lg overflow-hidden border border-black/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screenshot}
                    alt="Screenshot preview"
                    className="w-full h-40 object-cover object-top"
                  />
                </div>
              )}

              {/* Category selector */}
              <div className="flex gap-2">
                {CATEGORIES.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setCategory(value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors border ${
                      category === value
                        ? 'bg-classic-red/10 text-classic-red border-classic-red/40'
                        : 'text-classic-steel border-black/10 hover:border-black/30 hover:text-classic-black'
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
              </div>

              {/* Comment */}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe what happened or what you'd like to see..."
                className="w-full h-28 bg-classic-cream/40 border border-black/10 rounded-lg px-3 py-2.5 text-sm text-classic-black placeholder-classic-steel focus:outline-none focus:border-classic-red focus:ring-2 focus:ring-classic-red/20 resize-none"
                autoFocus
              />

              {/* Optional email (no auth on this site) */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email (optional, for follow-up)"
                className="w-full bg-classic-cream/40 border border-black/10 rounded-lg px-3 py-2 text-sm text-classic-black placeholder-classic-steel focus:outline-none focus:border-classic-red focus:ring-2 focus:ring-classic-red/20"
              />

              {/* Page context */}
              <div className="text-classic-steel text-xs flex items-center justify-between">
                <span>Page: {pathname}</span>
                {consoleLogs.length > 0 && (
                  <span>{consoleLogs.length} log{consoleLogs.length === 1 ? '' : 's'} captured</span>
                )}
              </div>

              {error && (
                <div className="text-sm text-classic-red bg-classic-red/5 border border-classic-red/20 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!sent && (
          <div className="flex justify-end gap-3 px-5 py-4 border-t border-black/10">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-classic-steel hover:text-classic-black transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!comment.trim() || sending}
              className="flex items-center gap-2 px-4 py-2 bg-classic-red hover:bg-classic-red-dark disabled:opacity-50 disabled:hover:bg-classic-red text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Send size={14} />
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
