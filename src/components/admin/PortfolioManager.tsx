'use client'

import { useState, useEffect } from 'react'
import ImageUploader from './ImageUploader'

interface PortfolioItem {
  id?: number
  title: string
  description: string
  image_url: string
  category: string
  client_name: string
  project_url: string
  display_order: number
  is_visible: boolean
}

const EMPTY_ITEM: PortfolioItem = {
  title: '',
  description: '',
  image_url: '',
  category: 'General',
  client_name: '',
  project_url: '',
  display_order: 0,
  is_visible: true,
}

const CATEGORIES = ['General', 'Software', 'Network', 'AI', 'Security']

export default function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function fetchItems() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/portfolio')
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      setError('Failed to load portfolio')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  function openCreate() {
    setEditItem({ ...EMPTY_ITEM })
    setShowForm(true)
    setError('')
  }

  function openEdit(item: PortfolioItem) {
    setEditItem({ ...item })
    setShowForm(true)
    setError('')
  }

  function closeForm() {
    setShowForm(false)
    setEditItem(null)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!editItem) return
    setError('')
    setSaving(true)
    try {
      const isEdit = !!editItem.id
      const url = isEdit ? `/api/admin/portfolio/${editItem.id}` : '/api/admin/portfolio'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editItem),
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
    if (!confirm('Delete this portfolio item?')) return
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setSuccess('Deleted!')
        setTimeout(() => setSuccess(''), 3000)
        fetchItems()
      } else {
        setError('Delete failed')
      }
    } catch {
      setError('Network error')
    }
  }

  return (
    <div className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
      {success && <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{success}</div>}

      <div className="flex justify-between items-center">
        <p className="text-slate-500 text-sm">{items.length} items</p>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors"
        >
          + Add Item
        </button>
      </div>

      {/* Form modal */}
      {showForm && editItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4">
                {editItem.id ? 'Edit Item' : 'New Item'}
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={editItem.title}
                    onChange={(e) => setEditItem((c) => c && ({ ...c, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editItem.description}
                    onChange={(e) => setEditItem((c) => c && ({ ...c, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select
                      value={editItem.category}
                      onChange={(e) => setEditItem((c) => c && ({ ...c, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                    >
                      {CATEGORIES.map((cat) => <option key={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={editItem.display_order}
                      onChange={(e) => setEditItem((c) => c && ({ ...c, display_order: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editItem.client_name}
                    onChange={(e) => setEditItem((c) => c && ({ ...c, client_name: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Project URL</label>
                  <input
                    type="url"
                    value={editItem.project_url}
                    onChange={(e) => setEditItem((c) => c && ({ ...c, project_url: e.target.value }))}
                    placeholder="https://"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                  />
                </div>
                <ImageUploader
                  value={editItem.image_url}
                  onChange={(url) => setEditItem((c) => c && ({ ...c, image_url: url }))}
                />
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-700">Visible</span>
                  <button
                    type="button"
                    onClick={() => setEditItem((c) => c && ({ ...c, is_visible: !c.is_visible }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      editItem.is_visible ? 'bg-sky-600' : 'bg-slate-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${editItem.is_visible ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-2.5 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" onClick={closeForm} className="px-6 py-2.5 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300">
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
        <div className="text-slate-500">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-slate-400">No portfolio items yet. Click &quot;+ Add Item&quot; to create one.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
              {item.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image_url} alt={item.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 truncate">{item.title}</p>
                <p className="text-xs text-slate-500">{item.category} {item.client_name ? `· ${item.client_name}` : ''}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => item.id && handleDelete(item.id)}
                  className="px-3 py-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
