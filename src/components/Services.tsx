'use client'

import { motion } from 'framer-motion'
import { Globe, Server, Code2, Lightbulb } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Modern, responsive websites and web applications built with Next.js, React, and the latest frontend technologies. From landing pages to complex web platforms.',
    gradient: 'from-blue-600 to-cyan-500',
    glow: 'hover:shadow-blue-600/20',
    features: ['Next.js & React', 'Responsive Design', 'SEO Optimized', 'Performance First'],
  },
  {
    icon: Server,
    title: 'Server & Infrastructure',
    description:
      'Reliable, scalable server setup and cloud infrastructure management. We handle Docker, CI/CD, SSL, DNS, and everything in between for 99.9% uptime.',
    gradient: 'from-purple-600 to-indigo-500',
    glow: 'hover:shadow-purple-600/20',
    features: ['Docker & Kubernetes', 'CI/CD Pipelines', '99.9% Uptime SLA', 'Auto Scaling'],
  },
  {
    icon: Code2,
    title: 'Software Development',
    description:
      'Custom software solutions tailored to your business needs. APIs, automation tools, desktop apps, and enterprise systems built with clean, maintainable code.',
    gradient: 'from-violet-600 to-purple-500',
    glow: 'hover:shadow-violet-600/20',
    features: ['Custom APIs', 'Process Automation', 'Enterprise Systems', 'Clean Architecture'],
  },
  {
    icon: Lightbulb,
    title: 'IT Consulting',
    description:
      'Strategic technology guidance to help your business make the right decisions. Architecture reviews, tech stack selection, and digital transformation roadmaps.',
    gradient: 'from-pink-600 to-rose-500',
    glow: 'hover:shadow-pink-600/20',
    features: ['Tech Strategy', 'Architecture Review', 'Stack Selection', 'Digital Roadmap'],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-blue-600/50" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Services That{' '}
            <span className="gradient-text">Drive Growth</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From concept to deployment, we provide end-to-end technology solutions
            that help businesses thrive in the digital age.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className={`glass glass-hover rounded-2xl p-8 group cursor-default shadow-xl ${service.glow} hover:shadow-2xl transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={26} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feat) => (
                    <span
                      key={feat}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
