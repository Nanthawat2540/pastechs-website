'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import LogoCanvas from './LogoCanvas'

const techChips = ['Software', 'AI', 'Network', 'Security']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-100px] left-[-150px] w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #e0f2fe, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-80px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #fff7ed, transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 right-[10%] w-[300px] h-[300px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #bae6fd, transparent 70%)' }}
        />
      </div>

      {/* Floating tech chips */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {techChips.map((chip, i) => (
          <motion.div
            key={chip}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: [0, -12, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.8 + i * 0.15 },
              y: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
            }}
            className="absolute px-3 py-1.5 rounded-full text-xs font-semibold border border-sky-200 bg-sky-50 text-sky-700 shadow-sm"
            style={{
              left: `${10 + i * 22}%`,
              top: `${15 + (i % 2) * 55}%`,
            }}
          >
            {chip}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">

        {/* ── Animated Canvas Logo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          {/* Animated gradient border wrapper */}
          <div
            className="relative rounded-2xl overflow-hidden p-[2px]"
            style={{
              boxShadow: [
                '0 0 0 1px rgba(14,165,233,0.25)',
                '0 0 28px rgba(14,165,233,0.20)',
                '0 0 60px rgba(124,58,237,0.12)',
                '0 0 100px rgba(0,217,255,0.08)',
                '0 28px 64px rgba(0,0,0,0.50)',
              ].join(', '),
            }}
          >
            {/* Spinning conic-gradient — oversized so corners stay covered on rotation */}
            <div
              className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] animate-spin-slow"
              style={{
                background: 'conic-gradient(from 0deg, #06b6d4 0%, #3b82f6 22%, #8b5cf6 44%, #ec4899 58%, #f59e0b 72%, #06b6d4 100%)',
              }}
            />

            {/* Inner dark frame */}
            <div
              className="relative rounded-[14px] overflow-hidden"
              style={{ background: '#0a1628', padding: '8px 16px' }}
            >
              {/* Subtle dot-grid texture */}
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #7dd3fc 1px, transparent 1px)',
                  backgroundSize: '14px 14px',
                }}
              />
              <LogoCanvas
                src="/logo.png"
                width={380}
                height={130}
                speed={4000}
                intensity={0.85}
                className="relative block"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-sm font-medium mb-6"
        >
          <Zap size={14} className="text-orange-500" />
          PAS Tech Group Co., Ltd.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-slate-800"
        >
          Empowering Business{' '}
          <span className="gradient-text">Through Technology</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <p className="text-slate-600 text-lg leading-relaxed mb-2">
            PAS Tech Group delivers end-to-end technology solutions — from software development
            and AI to network infrastructure and cyber security.
          </p>
          <p className="text-slate-400 text-base leading-relaxed">
            บริษัท พีเอเอส เทค กรุ๊ป จำกัด ให้บริการด้านเทคโนโลยีครบวงจร ตั้งแต่พัฒนาซอฟต์แวร์
            ปัญญาประดิษฐ์ โครงสร้างพื้นฐานเครือข่าย ไปจนถึงความมั่นคงปลอดภัยทางไซเบอร์
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-sky-600/25"
          >
            เริ่มต้นโปรเจกต์
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-orange-600 text-orange-600 font-semibold hover:bg-orange-50 transition-all duration-300"
          >
            ดูบริการของเรา
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2">
            <div className="w-1 h-3 bg-gradient-to-b from-sky-500 to-transparent rounded-full animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
