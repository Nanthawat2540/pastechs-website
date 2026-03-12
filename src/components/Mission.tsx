'use client'

import { motion } from 'framer-motion'
import { Eye, Target, CheckCircle2 } from 'lucide-react'

const missionPoints = [
  'พัฒนาซอฟต์แวร์ที่ตอบโจทย์ความต้องการทางธุรกิจอย่างแท้จริง',
  'นำเทคโนโลยี AI และ Automation มาเพิ่มประสิทธิภาพการทำงาน',
  'ออกแบบโครงสร้างพื้นฐานเครือข่ายที่มั่นคงและปลอดภัย',
  'ให้บริการด้านความมั่นคงปลอดภัยทางไซเบอร์อย่างครบวงจร',
  'สร้างความสัมพันธ์ระยะยาวกับลูกค้าในฐานะพันธมิตรด้านเทคโนโลยี',
]

export default function Mission() {
  return (
    <section id="mission" className="py-24 px-4 bg-[#f0f9ff]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-4 block">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
            Vision &{' '}
            <span className="gradient-text">Mission</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision Card */}
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
              "To be the leading technology partner that empowers businesses
              across Thailand and Southeast Asia through innovative and
              reliable digital solutions."
            </p>
            <p className="text-slate-500 leading-relaxed text-sm">
              "เป็นพันธมิตรด้านเทคโนโลยีชั้นนำที่ช่วยขับเคลื่อนธุรกิจทั่วประเทศไทยและภูมิภาคเอเชียตะวันออกเฉียงใต้
              ด้วยโซลูชันดิจิทัลที่สร้างสรรค์และเชื่อถือได้"
            </p>
          </motion.div>

          {/* Mission Card */}
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
  )
}
