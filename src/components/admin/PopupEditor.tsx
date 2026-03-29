'use client'

import { useState, useEffect } from 'react'
import ImageUploader from './ImageUploader'

interface PopupConfig {
  title: string
  message: string
  image_url: string
  is_enabled: boolean
}

export default function PopupEditor() {
  const [config, setConfig] = useState<PopupConfig>({
    title: '',
    message: '',
    image_url: '',
    is_enabled: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/popup')
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setConfig({
            title: data.title ?? '',
            message: data.message ?? '',
            image_url: data.image_url ?? '',
            is_enabled: !!data.is_enabled,
          })
        }
      })
      .catch(() => setError('Failed to load popup config'))
      .finally(() => setLoading(false))
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSaving(true)
    try {
      const res = await fetch('/api/admin/popup', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const data = await res.json()
        setError(data.error || 'Save failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-slate-500">Loading...</div>

  return (
    <form onSubmit={handleSave} className="bg-white rounded-2xl shadow p-6 max-w-xl space-y-5">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
      )}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">Saved successfully!</div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">Enable Popup</span>
        <button
          type="button"
          onClick={() => setConfig((c) => ({ ...c, is_enabled: !c.is_enabled }))}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            config.is_enabled ? 'bg-sky-600' : 'bg-slate-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              config.is_enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
        <input
          type="text"
          value={config.title}
          onChange={(e) => setConfig((c) => ({ ...c, title: e.target.value }))}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
          placeholder="Popup title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
        <textarea
          value={config.message}
          onChange={(e) => setConfig((c) => ({ ...c, message: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
          placeholder="Popup message content"
        />
      </div>

      <ImageUploader
        value={config.image_url}
        onChange={(url) => setConfig((c) => ({ ...c, image_url: url }))}
        label="Popup Image (optional)"
      />

      <button
        type="submit"
        disabled={saving}
        className="w-full py-2.5 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}
