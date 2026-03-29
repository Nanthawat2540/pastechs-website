'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

interface PortfolioItem {
  id: number
  title: string
  description: string
  image_url: string | null
  category: string
  client_name: string | null
  project_url: string | null
  display_order: number
}

const CATEGORIES = ['All', 'Software', 'Network', 'AI', 'Security', 'General']

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    fetch('/api/portfolio')
      .then((r) => r.json())
      .then((data: PortfolioItem[]) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading || items.length === 0) return null

  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category))).filter((c) => CATEGORIES.includes(c))]
  const filtered = activeCategory === 'All' ? items : items.filter((i) => i.category === activeCategory)

  return (
    <section id="portfolio" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Our{' '}
            <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Explore our past projects and success stories across software, network, AI, and security domains.
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-sky-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-sky-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow border border-slate-100 flex flex-col"
            >
              {item.image_url ? (
                <div className="relative w-full h-48">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center">
                  <span className="text-4xl">💼</span>
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-slate-800 leading-snug">{item.title}</h3>
                  <span className="text-xs bg-sky-50 text-sky-600 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                    {item.category}
                  </span>
                </div>
                {item.client_name && (
                  <p className="text-xs text-slate-400 mb-2">{item.client_name}</p>
                )}
                {item.description && (
                  <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-3">{item.description}</p>
                )}
                {item.project_url && (
                  <a
                    href={item.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-700 font-medium"
                  >
                    View Project <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
