'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  MapPin, Phone, Mail, Send, CheckCircle, ChevronRight,
  ChevronDown, Clock,
} from 'lucide-react'

const contactCards = [
  {
    icon: MapPin,
    title: 'Visit Our Office',
    lines: ['Bangkok, Thailand'],
    color: 'bg-sky-600',
    shadow: 'shadow-sky-200',
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+66 2 123 4567', 'Mon–Fri, 9AM – 6PM ICT'],
    href: 'tel:+6621234567',
    color: 'bg-orange-500',
    shadow: 'shadow-orange-200',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@pastechs.com', 'We reply within 24 hours'],
    href: 'mailto:info@pastechs.com',
    color: 'bg-green-500',
    shadow: 'shadow-green-200',
  },
]

const businessHours = [
  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM ICT' },
  { day: 'Saturday', time: '10:00 AM – 2:00 PM ICT' },
  { day: 'Sunday', time: 'Closed' },
]

const faqs = [
  {
    q: 'How long does a typical software project take?',
    a: 'Project timelines vary by complexity. A simple web application takes 4–8 weeks, while enterprise systems typically require 3–12 months. We provide a detailed timeline during our discovery phase.',
  },
  {
    q: 'What is your development methodology?',
    a: 'We follow an Agile Scrum methodology with 2-week sprints, regular demos, and continuous delivery. Clients have full transparency and direct access to progress at every stage.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes! We offer flexible post-launch support plans including 24/7 monitoring, SLA-backed maintenance, and dedicated engineering retainers.',
  },
  {
    q: 'What is your pricing model?',
    a: 'We offer flexible engagement models: fixed-price for well-defined projects, time & material for evolving requirements, and dedicated team models. Contact us for a custom quote.',
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', service: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

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
              <span className="text-sky-400">Contact</span>
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We&apos;d love to hear about your project. Let&apos;s start a conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactCards.map((card, i) => {
              const Icon = card.icon
              const content = (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-all duration-300 text-center"
                >
                  <div className={`w-14 h-14 rounded-xl ${card.color} flex items-center justify-center mx-auto mb-4 shadow-lg ${card.shadow}`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">{card.title}</h4>
                  {card.lines.map((line, li) => (
                    <p key={li} className={li === 0 ? 'text-slate-700 font-medium text-sm' : 'text-slate-400 text-xs'}>{line}</p>
                  ))}
                </motion.div>
              )
              return card.href ? (
                <a key={card.title} href={card.href}>{content}</a>
              ) : (
                <div key={card.title}>{content}</div>
              )
            })}
          </div>

          {/* Form + Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={56} className="text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                  <p className="text-slate-500">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-slate-800 mb-1">Send Us a <span className="gradient-text">Message</span></h3>
                  <p className="text-slate-400 text-sm mb-6">Fill out the form and we&apos;ll get back to you within one business day.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block">First Name <span className="text-orange-500">*</span></label>
                        <input
                          type="text" name="firstName" required value={formState.firstName} onChange={handleChange}
                          placeholder="John"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Last Name <span className="text-orange-500">*</span></label>
                        <input
                          type="text" name="lastName" required value={formState.lastName} onChange={handleChange}
                          placeholder="Doe"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email <span className="text-orange-500">*</span></label>
                        <input
                          type="email" name="email" required value={formState.email} onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Phone</label>
                        <input
                          type="tel" name="phone" value={formState.phone} onChange={handleChange}
                          placeholder="+66 XX XXX XXXX"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Company Name</label>
                      <input
                        type="text" name="company" value={formState.company} onChange={handleChange}
                        placeholder="Your Company Co., Ltd."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Service Interested In</label>
                      <select
                        name="service" value={formState.service} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-sm cursor-pointer"
                      >
                        <option value="">— Select a Service —</option>
                        <option>Software Development</option>
                        <option>Network &amp; Infrastructure</option>
                        <option>Artificial Intelligence</option>
                        <option>Cyber Security</option>
                        <option>Digital Transformation</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Message <span className="text-orange-500">*</span></label>
                      <textarea
                        name="message" required rows={4} value={formState.message} onChange={handleChange}
                        placeholder="Tell us about your project, goals, and timeline..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-sm resize-none"
                      />
                    </div>
                    <button
                      type="submit" disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {loading ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                      ) : (
                        <><Send size={16} />Send Message</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Business Hours + FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} className="text-sky-600" />
                  <h4 className="font-bold text-slate-800">Business Hours</h4>
                </div>
                <div className="space-y-3">
                  {businessHours.map((h) => (
                    <div key={h.day} className="flex justify-between items-center text-sm border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <span className="font-medium text-slate-600">{h.day}</span>
                      <span className={h.time === 'Closed' ? 'text-slate-400' : 'text-slate-800 font-medium'}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4">Frequently Asked Questions</h4>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <span className="text-sm font-semibold text-slate-700 pr-4">{faq.q}</span>
                        <ChevronDown
                          size={16}
                          className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {openFaq === i && (
                        <div className="px-4 py-3">
                          <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
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
              Let&apos;s Build Something <span className="gradient-text">Amazing</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Whether you have a complete spec or just an idea — we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+6621234567" className="px-8 py-4 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors">
                Call Us Now
              </a>
              <a href="mailto:info@pastechs.com" className="px-8 py-4 rounded-xl border-2 border-slate-600 text-slate-300 font-semibold hover:border-slate-400 transition-colors">
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
