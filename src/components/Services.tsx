'use client'

import { motion } from 'framer-motion'
import { Code2, Network, BrainCircuit, ShieldCheck } from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Software Development',
    titleTH: 'พัฒนาซอฟต์แวร์',
    description:
      'Custom software solutions built to fit your business — from web and mobile applications to full-scale enterprise systems.',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    features: ['Web Application', 'Mobile App', 'Enterprise Systems'],
  },
  {
    icon: Network,
    title: 'Network & Infrastructure',
    titleTH: 'เครือข่ายและโครงสร้างพื้นฐาน',
    description:
      'Design and deploy reliable, high-performance network infrastructure — from on-premise server rooms to cloud environments.',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    features: ['Network Design', 'Server & Data Center', 'Cloud Solutions'],
  },
  {
    icon: BrainCircuit,
    title: 'Artificial Intelligence',
    titleTH: 'ปัญญาประดิษฐ์',
    description:
      'Harness the power of AI to automate processes, gain insights from data, and create smarter business outcomes.',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    features: ['AI Solutions', 'Data Analytics', 'Automation'],
  },
  {
    icon: ShieldCheck,
    title: 'Cyber Security',
    titleTH: 'ความมั่นคงปลอดภัยไซเบอร์',
    description:
      'Protect your business with comprehensive security systems — from threat detection and data protection to network security.',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    features: ['Security Systems', 'Data Protection', 'Network Security'],
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
    <section id="services" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Services That{' '}
            <span className="gradient-text">Drive Growth</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
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
                className="bg-white rounded-2xl p-8 group cursor-default shadow-sm border border-slate-200 hover:border-sky-400 hover:border-l-4 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${service.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={26} className={service.iconColor} />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-1">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{service.titleTH}</p>
                <p className="text-slate-500 leading-relaxed mb-6">{service.description}</p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feat) => (
                    <span
                      key={feat}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 border border-slate-200 text-slate-600"
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
