'use client'

import { motion } from 'framer-motion'
import { Shield, Rocket, Users, Clock, Cpu, HeartHandshake } from 'lucide-react'

const features = [
  {
    icon: Rocket,
    title: 'Fast Delivery',
    description:
      'We move fast without cutting corners. Agile workflows and clear communication ensure your project ships on time.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: Shield,
    title: 'Security First',
    description:
      'Every solution is built with security in mind — from secure coding practices to infrastructure hardening and SSL.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: Cpu,
    title: 'Modern Tech Stack',
    description:
      'We use the latest battle-tested technologies so your product is future-proof, maintainable, and performant.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    description:
      'You get direct access to our engineers — no middlemen. Clear communication, full transparency throughout.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description:
      'Our infrastructure monitoring never sleeps. Critical issues are addressed immediately, day or night.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    icon: HeartHandshake,
    title: 'Long-Term Partnership',
    description:
      'We build lasting relationships. From launch to growth, we stay with you as your technology partner.',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 relative">
      {/* Background glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Why PAS Techs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for{' '}
            <span className="gradient-text-accent">Excellence</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We don&apos;t just build software — we build digital experiences that your users love
            and your business relies on.
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
                className="glass rounded-2xl p-6 group hover:bg-white/8 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bg} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={22} className={feature.color} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
