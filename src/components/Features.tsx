'use client'

import { motion } from 'framer-motion'
import { Rocket, Shield, BrainCircuit, Users, Clock, HeartHandshake } from 'lucide-react'

const features = [
  {
    icon: Rocket,
    title: 'Fast & Agile Delivery',
    description:
      'We move fast without cutting corners. Agile workflows and clear milestones ensure your project ships on time, every time.',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    icon: Shield,
    title: 'Security by Design',
    description:
      'Every solution is built with security at its core — from secure coding and infrastructure hardening to full cyber security audits.',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Powered Solutions',
    description:
      'We integrate AI and automation into our solutions, helping you gain competitive advantage through smarter technology.',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    icon: Users,
    title: 'Dedicated Expert Team',
    description:
      'You work directly with our engineers — no middlemen, full transparency, and a team that truly understands your business.',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    icon: Clock,
    title: '24/7 Monitoring & Support',
    description:
      'Our infrastructure monitoring never sleeps. Critical issues are addressed immediately so your systems stay online.',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    icon: HeartHandshake,
    title: 'Long-Term Partnership',
    description:
      'We build lasting relationships. From launch to scale, PAS Tech Group stays with you as your trusted technology partner.',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-[#f0f9ff]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Why PAS Tech Group
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Built for{' '}
            <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            We don&apos;t just build software — we build digital experiences that your
            users love and your business relies on.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 group hover:shadow-md transition-all duration-300 border border-slate-100"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={22} className={feature.iconColor} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
