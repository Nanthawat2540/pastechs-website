'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface PopupData {
  title: string
  message: string
  image_url: string | null
  is_enabled: boolean
}

const DISMISS_KEY = 'popup_dismissed_date'

function getTodayStr() {
  return new Date().toISOString().slice(0, 10)
}

export default function Popup() {
  const [data, setData] = useState<PopupData | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISS_KEY)
    const today = getTodayStr()
    if (dismissed === today) return

    fetch('/api/popup')
      .then((r) => r.json())
      .then((d: PopupData) => {
        if (d.is_enabled) {
          setData(d)
          setVisible(true)
        }
      })
      .catch(() => {/* silently ignore */})
  }, [])

  function handleClose() {
    setVisible(false)
    localStorage.setItem(DISMISS_KEY, getTodayStr())
  }

  if (!visible || !data) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {data.image_url && (
          <div className="relative w-full h-48">
            <Image
              src={data.image_url}
              alt={data.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="p-6">
          {data.title && (
            <h2 className="text-xl font-bold text-slate-800 mb-3">{data.title}</h2>
          )}
          {data.message && (
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{data.message}</p>
          )}
          <button
            onClick={handleClose}
            className="mt-5 w-full py-2.5 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
