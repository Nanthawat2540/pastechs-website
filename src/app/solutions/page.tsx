'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  RefreshCw, Bot, Building2, Wifi, BarChart3, ShieldAlert,
  CheckCircle2, ChevronRight,
  HeartPulse, Landmark, ShoppingCart, Factory, GraduationCap, Truck,
} from 'lucide-react'

const mainSolutions = [
  {
    num: '01',
    title: 'Digital Transformation',
    titleTH: 'การเปลี่ยนแปลงทางดิจิทัล',
    desc: 'Modernize legacy systems, digitize business processes, and reimagine customer experiences. Our digital transformation programs are comprehensive, business-aligned, and designed for sustainable change.',
    features: [
      'Legacy application modernization',
      'Business process digitization',
      'Customer journey redesign',
      'Data-driven decision making',
    ],
    imageGradient: 'from-sky-500 to-blue-700',
    emoji: '🔄',
  },
  {
    num: '02',
    title: 'Smart Automation',
    titleTH: 'ระบบอัตโนมัติอัจฉริยะ',
    desc: 'Automate repetitive workflows, eliminate bottlenecks, and free your team to focus on high-value work. Powered by AI and RPA, our automation platforms reduce operational costs significantly.',
    features: [
      'Robotic Process Automation (RPA)',
      'AI-driven workflow orchestration',
      'Intelligent document processing',
      'Predictive maintenance systems',
    ],
    imageGradient: 'from-orange-500 to-red-600',
    emoji: '🤖',
  },
  {
    num: '03',
    title: 'Enterprise Systems',
    titleTH: 'ระบบองค์กร',
    desc: 'Custom ERP, CRM, HRM, and SCM platforms engineered for complex organizational structures. We build systems that scale with your growth and unify your entire operation.',
    features: [
      'Custom ERP & CRM development',
      'Business intelligence dashboards',
      'Data warehouse & analytics',
      'Multi-tenant SaaS platforms',
    ],
    imageGradient: 'from-purple-500 to-violet-700',
    emoji: '🏢',
  },
]

const additionalSolutions = [
  {
    num: '04',
    icon: Wifi,
    title: 'IoT Integration',
    desc: 'Connect physical infrastructure with intelligent software platforms for real-time monitoring, alerting, and automated control.',
    features: ['Sensor network management', 'Edge computing', 'Industrial IoT (IIoT)'],
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  {
    num: '05',
    icon: BarChart3,
    title: 'Data Analytics',
    desc: 'Turn raw data into actionable insights with advanced analytics platforms, ML pipelines, and real-time business intelligence.',
    features: ['Big data processing', 'Real-time analytics', 'Visualization & reporting'],
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    num: '06',
    icon: ShieldAlert,
    title: 'Cybersecurity',
    desc: 'Protect your digital assets with enterprise-grade security solutions including threat detection, compliance, and incident response.',
    features: ['Security audits & pen testing', 'Zero-trust architecture', 'Compliance (ISO/GDPR)'],
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
]

const industries = [
  { icon: HeartPulse, name: 'Healthcare', color: 'text-red-500' },
  { icon: Landmark, name: 'Finance', color: 'text-blue-500' },
  { icon: ShoppingCart, name: 'Retail & E-Commerce', color: 'text-green-500' },
  { icon: Factory, name: 'Manufacturing', color: 'text-purple-500' },
  { icon: GraduationCap, name: 'Education', color: 'text-sky-500' },
  { icon: Truck, name: 'Logistics', color: 'text-orange-500' },
]

export default function SolutionsPage() {
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
              <span className="text-sky-400">Solutions</span>
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-4">
              Technology Solutions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="gradient-text">Solutions</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Intelligent, integrated, and industry-ready technology solutions for the modern enterprise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Solutions — detailed */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-4 block">What We Solve</span>
            <h2 className="text-4xl font-bold text-slate-800">
              Enterprise Solutions for <span className="gradient-text">Every Challenge</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto mt-4">
              From AI-powered automation to full digital transformation — we deliver solutions that create real, measurable business impact.
            </p>
          </motion.div>

          <div className="space-y-16">
            {mainSolutions.map((sol, i) => (
              <motion.div
                key={sol.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image/Visual */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`h-72 rounded-2xl bg-gradient-to-br ${sol.imageGradient} flex items-center justify-center text-8xl shadow-lg`}>
                    {sol.emoji}
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-semibold mb-4">
                    Solution {sol.num}
                  </span>
                  <h3 className="text-3xl font-bold text-slate-800 mb-1">
                    {sol.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-3">{sol.titleTH}</p>
                  <p className="text-slate-500 leading-relaxed mb-6">{sol.desc}</p>
                  <ul className="space-y-3 mb-6">
                    {sol.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
                  >
                    Learn More <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Solutions */}
      <section className="py-24 px-4 bg-[#f0f9ff]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-4 block">More Solutions</span>
            <h2 className="text-4xl font-bold text-slate-800">
              Additional <span className="gradient-text">Solution Areas</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalSolutions.map((sol, i) => {
              const Icon = sol.icon
              return (
                <motion.div
                  key={sol.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-all duration-300 relative"
                >
                  <div className="text-4xl font-black text-slate-100 absolute top-4 right-4">{sol.num}</div>
                  <div className={`w-12 h-12 rounded-xl ${sol.bg} flex items-center justify-center mb-4`}>
                    <Icon size={22} className={sol.color} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{sol.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{sol.desc}</p>
                  <ul className="space-y-2">
                    {sol.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
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

      {/* Industries */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-4 block">Industries</span>
            <h2 className="text-4xl font-bold text-slate-800">
              Industries We <span className="gradient-text">Serve</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {industries.map((ind) => {
              const Icon = ind.icon
              return (
                <div
                  key={ind.name}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-sm transition-all duration-200 text-center"
                >
                  <Icon size={32} className={ind.color} />
                  <span className="text-xs font-medium text-slate-600">{ind.name}</span>
                </div>
              )
            })}
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
              Find the Right Solution <span className="gradient-text">for You</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Tell us your challenge and we&apos;ll design a custom solution that delivers results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors">
                Talk to an Expert
              </Link>
              <Link href="/services" className="px-8 py-4 rounded-xl border-2 border-slate-600 text-slate-300 font-semibold hover:border-slate-400 transition-colors">
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
