'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Eye, Target, CheckCircle2,
  Lightbulb, Handshake, Star, Leaf,
  ChevronRight,
} from 'lucide-react'

const stats = [
  { value: '50+', label: 'Projects Delivered', desc: 'Across all domains' },
  { value: '30+', label: 'Happy Clients', desc: 'Businesses served' },
  { value: '99.9%', label: 'Uptime SLA', desc: 'Infrastructure reliability' },
  { value: '5+', label: 'Years Experience', desc: 'In the tech industry' },
]

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    desc: 'We challenge convention and embrace emerging technologies to deliver solutions that are ahead of the curve.',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  {
    icon: Handshake,
    title: 'Client Partnership',
    desc: 'We build long-term relationships, not just projects. Your success is our success, always.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Star,
    title: 'Excellence',
    desc: 'We hold ourselves to the highest standards in code quality, design, and delivery — every single time.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    desc: 'We build solutions with long-term impact in mind — for a better digital world and sustainable business growth.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
]

const team = [
  {
    name: 'Alexander Chen',
    role: 'Chief Executive Officer',
    bio: '15+ years in technology leadership. Passionate about delivering AI-driven business transformation.',
    initials: 'AC',
    color: 'from-sky-500 to-blue-600',
  },
  {
    name: 'Dr. Maya Patel',
    role: 'Chief Technology Officer',
    bio: 'Specialist in AI/ML architecture and large-scale distributed systems engineering.',
    initials: 'MP',
    color: 'from-purple-500 to-violet-600',
  },
  {
    name: 'Lucas Moreau',
    role: 'Head of Design & UX',
    bio: 'Award-winning UX designer with a decade of crafting intuitive digital experiences.',
    initials: 'LM',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Priya Sharma',
    role: 'VP Cloud Engineering',
    bio: 'Certified cloud architect. Expert in enterprise cloud migrations and DevSecOps.',
    initials: 'PS',
    color: 'from-green-500 to-teal-600',
  },
]

const missionPoints = [
  'พัฒนาซอฟต์แวร์ที่ตอบโจทย์ความต้องการทางธุรกิจอย่างแท้จริง',
  'นำเทคโนโลยี AI และ Automation มาเพิ่มประสิทธิภาพการทำงาน',
  'ออกแบบโครงสร้างพื้นฐานเครือข่ายที่มั่นคงและปลอดภัย',
  'ให้บริการด้านความมั่นคงปลอดภัยทางไซเบอร์อย่างครบวงจร',
  'สร้างความสัมพันธ์ระยะยาวกับลูกค้าในฐานะพันธมิตรด้านเทคโนโลยี',
]

export default function AboutPage() {
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
              <span className="text-sky-400">About</span>
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-4">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About <span className="gradient-text">PAS Tech Group</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A technology partner driven by innovation, excellence, and a passion for digital transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3 block">Our Journey</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Building Tomorrow&apos;s <span className="gradient-text">Digital World</span> Today
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                PAS Tech Group started with a bold vision — to make enterprise-grade technology accessible to businesses of all sizes throughout Thailand and Southeast Asia.
              </p>
              <p className="text-slate-500 leading-relaxed mb-6">
                Today, our team of engineers, designers, and strategists work alongside businesses from startups to enterprises to deliver transformative digital solutions. Our commitment to innovation, quality, and client success remains the foundation of everything we do.
              </p>
              <ul className="space-y-3">
                {[
                  'Certified software and cloud engineering teams',
                  'AI-driven solutions across every industry vertical',
                  '24/7 dedicated support and monitoring',
                  'Agile, fast-paced development methodology',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-sky-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl font-bold text-orange-600 mb-1">{stat.value}</div>
                  <div className="text-slate-800 font-semibold text-sm mb-1">{stat.label}</div>
                  <div className="text-slate-400 text-xs">{stat.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 px-4 bg-[#f0f9ff]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-4 block">Our Purpose</span>
            <h2 className="text-4xl font-bold text-slate-800">
              Vision &amp; <span className="gradient-text">Mission</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-sky-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                  <Eye size={24} className="text-sky-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-sky-700">Vision</h3>
                  <p className="text-slate-400 text-sm">วิสัยทัศน์</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed mb-4 text-lg font-medium">
                &ldquo;To be the leading technology partner that empowers businesses across Thailand and Southeast Asia through innovative and reliable digital solutions.&rdquo;
              </p>
              <p className="text-slate-500 leading-relaxed text-sm">
                &ldquo;เป็นพันธมิตรด้านเทคโนโลยีชั้นนำที่ช่วยขับเคลื่อนธุรกิจทั่วประเทศไทยและภูมิภาคเอเชียตะวันออกเฉียงใต้ ด้วยโซลูชันดิจิทัลที่สร้างสรรค์และเชื่อถือได้&rdquo;
              </p>
              <ul className="mt-4 space-y-2">
                {['Technology leadership in SEA', 'Democratizing enterprise AI', 'Sustainable digital growth'].map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="text-sky-500" /> {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Target size={24} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-600">Mission</h3>
                  <p className="text-slate-400 text-sm">พันธกิจ</p>
                </div>
              </div>
              <ul className="space-y-3">
                {missionPoints.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-4 block">What We Believe</span>
            <h2 className="text-4xl font-bold text-slate-800">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto mt-4">
              The principles that define our culture and shape the way we work every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => {
              const Icon = val.icon
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-all duration-300 text-center"
                >
                  <div className={`w-14 h-14 rounded-xl ${val.bg} flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={26} className={val.color} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{val.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{val.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 px-4 bg-[#f0f9ff]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-4 block">The People</span>
            <h2 className="text-4xl font-bold text-slate-800">
              Meet Our <span className="gradient-text">Leadership Team</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto mt-4">
              Passionate technologists leading PAS Tech Group into the future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
              >
                <div className={`h-40 bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{member.initials}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-slate-800 mb-1">{member.name}</h4>
                  <div className="text-sky-600 text-sm font-medium mb-2">{member.role}</div>
                  <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
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
              Ready to Work <span className="gradient-text">Together?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Join 30+ companies that trust PAS Tech Group to power their digital future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors"
              >
                Get in Touch
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 rounded-xl border-2 border-slate-600 text-slate-300 font-semibold hover:border-slate-400 transition-colors"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
