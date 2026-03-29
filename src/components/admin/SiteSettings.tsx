'use client'

import { useState, useEffect } from 'react'

const COMPANY_FIELDS = [
  { key: 'company_name', label: 'Company Name', type: 'text' },
  { key: 'address', label: 'Address', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'email', label: 'Email (Main)', type: 'email' },
  { key: 'email_sales', label: 'Email (Sales)', type: 'email' },
  { key: 'line_id', label: 'LINE ID', type: 'text' },
]

const SOCIAL_FIELDS = [
  { key: 'social_linkedin', label: 'LinkedIn URL', type: 'url' },
  { key: 'social_twitter', label: 'Twitter / X URL', type: 'url' },
  { key: 'social_facebook', label: 'Facebook URL', type: 'url' },
  { key: 'social_github', label: 'GitHub URL', type: 'url' },
]

export default function SiteSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(data => { setSettings(data); setLoading(false) })
      .catch(() => { setError('Failed to load settings'); setLoading(false) })
  }, [])

  const set = (key: string, value: string) =>
    setSettings(s => ({ ...s, [key]: value }))

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        setSuccess('Settings saved successfully!')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Save failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-slate-500 text-sm py-4">Loading...</div>

  return (
    <form onSubmit={handleSave} className="max-w-2xl space-y-6">
      {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
      {success && <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{success}</div>}

      {/* Company Info */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide border-b border-slate-100 pb-3">
          Company Information
        </h3>
        {COMPANY_FIELDS.map(f => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-slate-700 mb-1">{f.label}</label>
            <input
              type={f.type}
              value={settings[f.key] ?? ''}
              onChange={e => set(f.key, e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm"
            />
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide border-b border-slate-100 pb-3">
          Social Media Links
        </h3>
        {SOCIAL_FIELDS.map(f => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-slate-700 mb-1">{f.label}</label>
            <input
              type={f.type}
              value={settings[f.key] ?? ''}
              onChange={e => set(f.key, e.target.value)}
              placeholder="https://"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-6 py-2.5 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 disabled:opacity-50 text-sm transition-colors"
      >
        {saving ? 'Saving...' : 'Save Settings'}
      </button>
    </form>
  )
}
