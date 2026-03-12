'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered', description: 'Across web, server & software' },
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
      className="glass rounded-2xl p-8 text-center group hover:bg-white/8 transition-all duration-300"
    >
      <div className="text-5xl font-bold gradient-text mb-2">
        {count}{suffix}
      </div>
      <div className="text-white font-semibold text-lg mb-1">{label}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(ellipse, #2563eb, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            By The Numbers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
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
