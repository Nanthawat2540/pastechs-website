'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered', description: 'Across software, AI & infrastructure' },
  { value: 30, suffix: '+', label: 'Happy Clients', description: 'Businesses we\'ve helped grow' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA', description: 'Infrastructure reliability' },
  { value: 5, suffix: '+', label: 'Years Experience', description: 'In the tech industry' },
]

function useCounter(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    const startTime = Date.now()
    const isDecimal = target % 1 !== 0

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = eased * target

      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current))

      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }

    requestAnimationFrame(tick)
  }, [start, target, duration])

  return count
}

function StatCard({
  value,
  suffix,
  label,
  description,
  index,
}: {
  value: number
  suffix: string
  label: string
  description: string
  index: number
}) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCounter(value, 2000, started)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-8 text-center shadow-sm border border-sky-100 hover:shadow-md transition-shadow duration-300"
    >
      <div className="text-5xl font-bold text-orange-600 mb-2">
        {count}{suffix}
      </div>
      <div className="text-slate-800 font-semibold text-lg mb-1">{label}</div>
      <div className="text-slate-400 text-sm">{description}</div>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="py-24 px-4 bg-[#f0f9ff]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-4 block">
            By The Numbers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
            Proven{' '}
            <span className="gradient-text">Track Record</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
