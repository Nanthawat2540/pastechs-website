'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

interface TestimonialItem {
  id?: number
  name: string
  role: string
  text: string
  rating: number
  avatar_initials: string
  avatar_color: string
  display_order: number
  is_visible: boolean
}

const EMPTY: TestimonialItem = {
  name: '', role: '', text: '', rating: 5,
  avatar_initials: '', avatar_color: 'from-sky-500 to-blue-600',
  display_order: 0, is_visible: true,
}

const AVATAR_COLORS = [
  { value: 'from-sky-500 to-blue-600', label: '🔵 Blue' },
  { value: 'from-purple-500 to-violet-600', label: '🟣 Purple' },
  { value: 'from-orange-500 to-red-500', label: '🟠 Orange' },
  { value: 'from-green-500 to-teal-600', label: '🟢 Green' },
  { value: 'from-pink-500 to-rose-600', label: '🩷 Pink' },
  { value: 'from-yellow-500 to-amber-600', label: '🟡 Yellow' },
]

export default function TestimonialsManager() {
  const [items, setItems] = useState<TestimonialItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState<TestimonialItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function fetchItems() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/testimonials')
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      setError('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  function openCreate() { setEditItem({ ...EMPTY }); setShowForm(true); setError('') }
  function openEdit(item: TestimonialItem) { setEditItem({ ...item }); setShowForm(true); setError('') }
  function closeForm() { setShowForm(false); setEditItem(null); setError('') }

  const set = (field: keyof TestimonialItem, value: string | number | boolean) =>
    setEditItem((c) => c ? { ...c, [field]: value } : c)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!editItem) return
    setError('')
    setSaving(true)
    // Auto-generate initials if empty
    const initials = editItem.avatar_initials ||
      editItem.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    try {
      const isEdit = !!editItem.id
      const url = isEdit ? `/api/admin/testimonials/${editItem.id}` : '/api/admin/testimonials'
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editItem, avatar_initials: initials }),
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
    if (!confirm('Delete this testimonial?')) return
    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
      setSuccess('Deleted!')
      setTimeout(() => setSuccess(''), 3000)
      fetchItems()
    } catch {
      setError('Delete failed')
    }
  }

  return (
    <div className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
      {success && <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{success}</div>}

      <div className="flex justify-between items-center">
        <p className="text-slate-500 text-sm">{items.length} testimonials</p>
        <button onClick={openCreate} className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors">
          + Add Testimonial
        </button>
      </div>

      {/* Modal Form */}
      {showForm && editItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-5">{editItem.id ? 'Edit Testimonial' : 'New Testimonial'}</h2>
              <form onSubmit={handleSave} className="space-y-4">

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                    <input required value={editItem.name} onChange={e => set('name', e.target.value)}
                      placeholder="Sarah Mitchell"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                    <input value={editItem.role} onChange={e => set('role', e.target.value)}
                      placeholder="CTO, TechVision Corp"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Review Text *</label>
                  <textarea required rows={4} value={editItem.text} onChange={e => set('text', e.target.value)}
                    placeholder="Tell us about their experience..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm resize-none" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                    <div className="flex gap-1 py-2">
                      {[1,2,3,4,5].map(n => (
                        <button key={n} type="button" onClick={() => set('rating', n)}>
                          <Star size={20} className={n <= editItem.rating ? 'text-orange-400 fill-orange-400' : 'text-slate-300'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Avatar Color</label>
                    <select value={editItem.avatar_color} onChange={e => set('avatar_color', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm">
                      {AVATAR_COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
                    <input type="number" value={editItem.display_order} onChange={e => set('display_order', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm" />
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
                  <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 disabled:opacity-50 text-sm">
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" onClick={closeForm} className="px-6 py-2.5 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 text-sm">
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
        <div className="text-center py-12 text-slate-400 text-sm">No testimonials yet. Click &quot;+ Add Testimonial&quot; to create one.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.avatar_color} flex items-center justify-center flex-shrink-0 text-white font-bold text-sm`}>
                {item.avatar_initials || item.name.slice(0,2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-medium text-slate-800">{item.name}</p>
                  {!item.is_visible && <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Hidden</span>}
                </div>
                <p className="text-xs text-slate-500 mb-1">{item.role}</p>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < item.rating ? 'text-orange-400 fill-orange-400' : 'text-slate-200'} />
                  ))}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{item.text}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(item)} className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg">Edit</button>
                <button onClick={() => item.id && handleDelete(item.id)} className="px-3 py-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded-lg">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
