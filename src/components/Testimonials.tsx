'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Testimonial {
  id?: number
  text: string
  name: string
  role: string
  initials: string
  color: string
  rating?: number
}

const STATIC_TESTIMONIALS: Testimonial[] = [
  {
    text: 'PAS Tech Group completely transformed our operations with their AI integration. We saw a 40% increase in efficiency within the first quarter. Exceptional team and delivery.',
    name: 'Sarah Mitchell',
    role: 'CTO, TechVision Corp',
    initials: 'SM',
    color: 'from-sky-500 to-blue-600',
    rating: 5,
  },
  {
    text: 'The network infrastructure PAS Tech Group designed for us was flawless. Zero downtime, massive cost savings, and a scalable setup we can grow with for years.',
    name: 'James Nakamura',
    role: 'VP Engineering, DataFlow Inc',
    initials: 'JN',
    color: 'from-purple-500 to-violet-600',
    rating: 5,
  },
  {
    text: 'Working with PAS Tech Group was a game-changer. Their custom software solution streamlined our entire workflow and saved us significant time and costs annually.',
    name: 'Elena Rossi',
    role: 'Operations Director, ManufactPro',
    initials: 'ER',
    color: 'from-orange-500 to-red-500',
    rating: 5,
  },
  {
    text: 'Their mobile app development team delivered a world-class product on time and within budget. User adoption was through the roof from day one.',
    name: 'Marcus Thompson',
    role: 'CEO, FinEdge Solutions',
    initials: 'MT',
    color: 'from-green-500 to-teal-600',
    rating: 5,
  },
]

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(STATIC_TESTIMONIALS)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetch('/api/testimonials')
      .then(r => r.json())
      .then((data: unknown[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item: unknown) => {
            const t = item as Record<string, unknown>
            return {
              id: t.id as number,
              text: t.text as string,
              name: t.name as string,
              role: (t.role as string) ?? '',
              initials: (t.avatar_initials as string) || (t.name as string).slice(0, 2).toUpperCase(),
              color: (t.avatar_color as string) ?? 'from-sky-500 to-blue-600',
              rating: (t.rating as number) ?? 5,
            }
          })
          setItems(mapped)
          setCurrent(0)
        }
      })
      .catch(() => {}) // silent fallback to static data
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length)
  const next = () => setCurrent((c) => (c + 1) % items.length)
  const rating = items[current]?.rating ?? 5

  return (
    <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #7dd3fc 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Client Reviews
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real feedback from the companies we&apos;ve helped transform through technology.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < rating ? 'text-orange-400 fill-orange-400' : 'text-slate-600'} />
                  ))}
                </div>

                <p className="text-slate-300 text-lg leading-relaxed mb-8 italic">
                  &ldquo;{items[current]?.text}&rdquo;
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${items[current]?.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-sm">{items[current]?.initials}</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold">{items[current]?.name}</div>
                    <div className="text-slate-400 text-sm">{items[current]?.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'w-6 bg-sky-500' : 'w-2 bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
