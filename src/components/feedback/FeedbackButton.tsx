'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageSquarePlus } from 'lucide-react'
import html2canvas from 'html2canvas'
import { FeedbackModal } from './FeedbackModal'

type LogEntry = {
  level: string
  message: string
  timestamp: string
}

const MAX_LOGS = 100

export function FeedbackButton() {
  const [open, setOpen] = useState(false)
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [consoleLogs, setConsoleLogs] = useState<LogEntry[]>([])
  const [capturing, setCapturing] = useState(false)
  const logsRef = useRef<LogEntry[]>([])

  // Intercept console logs from page load
  useEffect(() => {
    const origLog = console.log
    const origWarn = console.warn
    const origError = console.error

    const capture = (level: string, args: unknown[]) => {
      const message = args
        .map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)))
        .join(' ')
      const entry: LogEntry = { level, message, timestamp: new Date().toISOString() }
      logsRef.current = [...logsRef.current.slice(-(MAX_LOGS - 1)), entry]
    }

    console.log = (...args) => {
      capture('log', args)
      origLog.apply(console, args)
    }
    console.warn = (...args) => {
      capture('warn', args)
      origWarn.apply(console, args)
    }
    console.error = (...args) => {
      capture('error', args)
      origError.apply(console, args)
    }

    const onError = (e: ErrorEvent) => {
      const entry: LogEntry = {
        level: 'error',
        message: `${e.message} (${e.filename}:${e.lineno}:${e.colno})`,
        timestamp: new Date().toISOString(),
      }
      logsRef.current = [...logsRef.current.slice(-(MAX_LOGS - 1)), entry]
    }

    const onUnhandledRejection = (e: PromiseRejectionEvent) => {
      const entry: LogEntry = {
        level: 'error',
        message: `Unhandled rejection: ${e.reason}`,
        timestamp: new Date().toISOString(),
      }
      logsRef.current = [...logsRef.current.slice(-(MAX_LOGS - 1)), entry]
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onUnhandledRejection)

    return () => {
      console.log = origLog
      console.warn = origWarn
      console.error = origError
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onUnhandledRejection)
    }
  }, [])

  const handleClick = async () => {
    setCapturing(true)
    try {
      // Read the actual body background so the screenshot matches the
      // visible theme (Classic Towing is currently a light-theme site,
      // but this keeps us future-proof if a dark mode is added).
      const bodyBg = getComputedStyle(document.body).backgroundColor || '#FAFAFA'

      const canvas = await html2canvas(document.body, {
        backgroundColor: bodyBg,
        useCORS: true,
        height: window.innerHeight,
        y: window.scrollY,
        scale: 1,
      })

      const maxWidth = 1200
      const ratio = Math.min(1, maxWidth / canvas.width)
      const resized = document.createElement('canvas')
      resized.width = canvas.width * ratio
      resized.height = canvas.height * ratio
      const ctx = resized.getContext('2d')
      ctx?.drawImage(canvas, 0, 0, resized.width, resized.height)

      const dataUrl = resized.toDataURL('image/jpeg', 0.5)
      setScreenshot(dataUrl)
    } catch {
      setScreenshot(null)
    }
    setConsoleLogs([...logsRef.current])
    setCapturing(false)
    setOpen(true)
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={capturing}
        aria-label="Send feedback"
        className="fixed bottom-6 right-6 z-50 bg-classic-red hover:bg-classic-red-dark text-white rounded-full p-3 shadow-lg transition-all hover:scale-105 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-classic-red/30"
        title="Send feedback"
      >
        {capturing ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <MessageSquarePlus size={20} />
        )}
      </button>
      {open && (
        <FeedbackModal
          screenshot={screenshot}
          consoleLogs={consoleLogs}
          onClose={() => {
            setOpen(false)
            setScreenshot(null)
            setConsoleLogs([])
          }}
        />
      )}
    </>
  )
}
