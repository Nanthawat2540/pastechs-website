'use client'

import { useState, useEffect } from 'react'
import ImageUploader from './ImageUploader'

interface ServiceItem {
  id?: number
  title: string
  title_th: string
  description: string
  icon_name: string
  image_url: string
  tags: string
  features: string
  color_variant: string
  display_order: number
  is_visible: boolean
}

const EMPTY: ServiceItem = {
  title: '', title_th: '', description: '', icon_name: 'code2',
  image_url: '', tags: '', features: '', color_variant: 'sky', display_order: 0, is_visible: true,
}

const ICON_OPTIONS = [
  { value: 'code2', label: '💻 Software Dev' },
  { value: 'network', label: '🌐 Network' },
  { value: 'brain', label: '🧠 AI / ML' },
  { value: 'shield', label: '🛡️ Security' },
  { value: 'mobile', label: '📱 Mobile' },
  { value: 'cloud', label: '☁️ Cloud' },
  { value: 'database', label: '🗄️ Database' },
  { value: 'settings', label: '⚙️ Systems' },
]

export default function ServicesManager() {
  const [items, setItems] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState<ServiceItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function fetchItems() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/services')
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      setError('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  function openCreate() {
    setEditItem({ ...EMPTY })
    setShowForm(true)
    setError('')
  }

  function openEdit(item: ServiceItem) {
    // Convert JSON arrays to newline strings for textarea
    const tagsStr = (() => { try { const a = JSON.parse(item.tags); return Array.isArray(a) ? a.join('\n') : item.tags } catch { return item.tags } })()
    const featStr = (() => { try { const a = JSON.parse(item.features); return Array.isArray(a) ? a.join('\n') : item.features } catch { return item.features } })()
    setEditItem({ ...item, tags: tagsStr, features: featStr })
    setShowForm(true)
    setError('')
  }

  function closeForm() {
    setShowForm(false)
    setEditItem(null)
    setError('')
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!editItem) return
    setError('')
    setSaving(true)
    try {
      const payload = {
        ...editItem,
        tags: editItem.tags.split('\n').map(s => s.trim()).filter(Boolean),
        features: editItem.features.split('\n').map(s => s.trim()).filter(Boolean),
      }
      const isEdit = !!editItem.id
      const url = isEdit ? `/api/admin/services/${editItem.id}` : '/api/admin/services'
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSuccess(isEdit ? 'Updated!' : 'Created!')
        setTimeout(() => setSuccess(''), 3000)
        closeForm()
        fetchItems()
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

  async function handleDelete(id: number) {
    if (!confirm('Delete this service?')) return
    try {
      await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
      setSuccess('Deleted!')
      setTimeout(() => setSuccess(''), 3000)
      fetchItems()
    } catch {
      setError('Delete failed')
    }
  }

  const set = (field: keyof ServiceItem, value: string | number | boolean) =>
    setEditItem((c) => c ? { ...c, [field]: value } : c)

  return (
    <div className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
      {success && <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{success}</div>}

      <div className="flex justify-between items-center">
        <p className="text-slate-500 text-sm">{items.length} services</p>
        <button onClick={openCreate} className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors">
          + Add Service
        </button>
      </div>

      {/* Modal Form */}
      {showForm && editItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-5">{editItem.id ? 'Edit Service' : 'New Service'}</h2>
              <form onSubmit={handleSave} className="space-y-4">

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title (EN) *</label>
                    <input required value={editItem.title} onChange={e => set('title', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title (TH)</label>
                    <input value={editItem.title_th} onChange={e => set('title_th', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea rows={3} value={editItem.description} onChange={e => set('description', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm resize-none" />
                </div>

                <ImageUploader
                  label="Service Image (optional)"
                  value={editItem.image_url}
                  onChange={url => set('image_url', url)}
                />

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                    <select value={editItem.icon_name} onChange={e => set('icon_name', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm">
                      {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Color</label>
                    <select value={editItem.color_variant} onChange={e => set('color_variant', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm">
                      <option value="sky">🔵 Blue (Sky)</option>
                      <option value="orange">🟠 Orange</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
                    <input type="number" value={editItem.display_order} onChange={e => set('display_order', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tags (1 per line)</label>
                    <textarea rows={4} value={editItem.tags} onChange={e => set('tags', e.target.value)}
                      placeholder="React / Next.js&#10;Node.js&#10;Python"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm resize-none font-mono" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Features (1 per line)</label>
                    <textarea rows={4} value={editItem.features} onChange={e => set('features', e.target.value)}
                      placeholder="Custom web apps&#10;API development&#10;Legacy modernization"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm resize-none font-mono" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-700">Visible on website</span>
                  <button type="button" onClick={() => set('is_visible', !editItem.is_visible)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${editItem.is_visible ? 'bg-sky-600' : 'bg-slate-300'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${editItem.is_visible ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex-1 py-2.5 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 disabled:opacity-50 text-sm">
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" onClick={closeForm}
                    className="px-6 py-2.5 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="text-slate-500 text-sm py-4">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">No services yet. Click &quot;+ Add Service&quot; to create one.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const tags = (() => { try { const a = JSON.parse(item.tags); return Array.isArray(a) ? a : [] } catch { return [] } })()
            return (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center gap-4">
                {item.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image_url} alt={item.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-slate-200" />
                ) : (
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg ${item.color_variant === 'orange' ? 'bg-orange-50' : 'bg-sky-50'}`}>
                    {ICON_OPTIONS.find(o => o.value === item.icon_name)?.label.split(' ')[0] ?? '🔧'}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-800 truncate">{item.title}</p>
                    {!item.is_visible && <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Hidden</span>}
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{item.title_th}</p>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {tags.slice(0, 3).map((t: string) => (
                        <span key={t} className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{t}</span>
                      ))}
                      {tags.length > 3 && <span className="text-xs text-slate-400">+{tags.length - 3}</span>}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(item)} className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg">Edit</button>
                  <button onClick={() => item.id && handleDelete(item.id)} className="px-3 py-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded-lg">Delete</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
