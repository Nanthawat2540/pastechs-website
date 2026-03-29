'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Code2, Network, BrainCircuit, ShieldCheck,
  CheckCircle2, ChevronRight, Search, PenTool, Cpu, Rocket,
} from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Software Development',
    titleTH: 'พัฒนาซอฟต์แวร์',
    desc: 'We build robust, scalable web applications, enterprise systems, and APIs using the latest frameworks and best practices. From MVPs to full enterprise platforms.',
    tags: ['React / Next.js', 'Node.js', 'Python', 'Microservices'],
    features: ['Custom web & enterprise apps', 'API design & development', 'Legacy system modernization'],
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100 hover:border-sky-400',
  },
  {
    icon: Network,
    title: 'Network & Infrastructure',
    titleTH: 'เครือข่ายและโครงสร้างพื้นฐาน',
    desc: 'Design and deploy reliable, high-performance network infrastructure — from on-premise server rooms to full cloud environments with DevOps integration.',
    tags: ['Network Design', 'Cloud (AWS/Azure)', 'Kubernetes', 'DevOps'],
    features: ['Enterprise network architecture', 'Cloud migration & management', 'CI/CD pipeline setup'],
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100 hover:border-sky-400',
  },
  {
    icon: BrainCircuit,
    title: 'Artificial Intelligence',
    titleTH: 'ปัญญาประดิษฐ์',
    desc: 'Harness the power of AI — from machine learning models and NLP to computer vision and generative AI. We turn your data into competitive advantage.',
    tags: ['TensorFlow', 'PyTorch', 'LLM / GPT', 'Computer Vision'],
    features: ['ML model development', 'NLP & chatbot solutions', 'Predictive analytics'],
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100 hover:border-orange-400',
  },
  {
    icon: ShieldCheck,
    title: 'Cyber Security',
    titleTH: 'ความมั่นคงปลอดภัยไซเบอร์',
    desc: 'Protect your business with comprehensive security systems — from threat detection and data protection to network security and compliance audits.',
    tags: ['Security Audit', 'Zero-Trust', 'ISO / GDPR', 'Pen Testing'],
    features: ['Security architecture review', 'Threat detection & response', 'Compliance consulting'],
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100 hover:border-orange-400',
  },
]

const processSteps = [
  {
    num: '01',
    icon: Search,
    title: 'Discovery & Strategy',
    desc: 'Deep-dive workshops to understand your business, goals, and technical requirements. We build a clear project blueprint.',
  },
  {
    num: '02',
    icon: PenTool,
    title: 'Design & Architecture',
    desc: 'UX wireframes, system architecture diagrams, and technical specifications reviewed and approved before development begins.',
  },
  {
    num: '03',
    icon: Cpu,
    title: 'Agile Development',
    desc: 'Iterative 2-week sprints with regular demos, continuous integration, and full transparency throughout the build.',
  },
  {
    num: '04',
    icon: Rocket,
    title: 'Launch & Support',
    desc: 'Zero-downtime deployment, performance monitoring, and dedicated post-launch support to ensure long-term success.',
  },
]

const techStack = [
  { name: 'React', color: '#61DAFB', emoji: '⚛️' },
  { name: 'Next.js', color: '#000', emoji: '▲' },
  { name: 'Node.js', color: '#68A063', emoji: '🟢' },
  { name: 'Python', color: '#3776AB', emoji: '🐍' },
  { name: 'AWS', color: '#FF9900', emoji: '☁️' },
  { name: 'Docker', color: '#2496ED', emoji: '🐳' },
  { name: 'Kubernetes', color: '#326CE5', emoji: '⚓' },
  { name: 'PostgreSQL', color: '#336791', emoji: '🐘' },
  { name: 'TensorFlow', color: '#FF6F00', emoji: '🧠' },
  { name: 'Flutter', color: '#54C5F8', emoji: '💙' },
  { name: 'TypeScript', color: '#3178C6', emoji: '📘' },
  { name: 'MongoDB', color: '#47A248', emoji: '🍃' },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <section className="pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #7dd3fc 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-4">
              <Link href="/" className="hover:text-sky-400 transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-sky-400">Services</span>
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-4">
              What We Offer
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              End-to-end technology services that power your business from concept to production.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-4 block">Core Capabilities</span>
            <h2 className="text-4xl font-bold text-slate-800">
              Technology Services Built for <span className="gradient-text">Your Growth</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto mt-4">
              From initial strategy through deployment and beyond — we cover every dimension of modern technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`bg-white rounded-2xl p-8 shadow-sm border ${service.border} transition-all duration-300 hover:shadow-md`}
                >
                  <div className={`w-14 h-14 rounded-xl ${service.bg} flex items-center justify-center mb-5`}>
                    <Icon size={26} className={service.color} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{service.title}</h3>
                  <p className="text-slate-400 text-sm mb-3">{service.titleTH}</p>
                  <p className="text-slate-500 leading-relaxed mb-5">{service.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {service.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 border border-slate-200 text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 px-4 bg-[#f0f9ff]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-4 block">How We Work</span>
            <h2 className="text-4xl font-bold text-slate-800">
              Our Proven <span className="gradient-text">Delivery Process</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto mt-4">
              A structured, transparent methodology that ensures every project is delivered on time, on budget, and beyond expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-all duration-300 relative"
                >
                  <div className="text-5xl font-black text-slate-100 absolute top-4 right-4">{step.num}</div>
                  <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-sky-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-4 block">Tech Stack</span>
            <h2 className="text-4xl font-bold text-slate-800">
              Technologies We <span className="gradient-text">Master</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
          >
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-sky-300 hover:shadow-sm transition-all duration-200 bg-white"
              >
                <span className="text-2xl">{tech.emoji}</span>
                <span className="text-xs font-medium text-slate-600">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #7dd3fc 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your <span className="gradient-text">Project?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Tell us about your challenges and let&apos;s build the solution together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors">
                Request a Proposal
              </Link>
              <Link href="/solutions" className="px-8 py-4 rounded-xl border-2 border-slate-600 text-slate-300 font-semibold hover:border-slate-400 transition-colors">
                View Solutions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
