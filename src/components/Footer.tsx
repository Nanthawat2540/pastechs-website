'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin, Globe, MapPin, Phone, Mail } from 'lucide-react'
import LogoCanvas from './LogoCanvas'

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Contact', href: '/contact' },
  ],
  Services: [
    { label: 'Software Development', href: '/services' },
    { label: 'Network & Infrastructure', href: '/services' },
    { label: 'Artificial Intelligence', href: '/services' },
    { label: 'Cyber Security', href: '/services' },
  ],
}

const socials = [
  { icon: Github, href: 'https://github.com/pastechs', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/pastechs', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/pastechs', label: 'LinkedIn' },
  { icon: Globe, href: 'https://pastechs.com', label: 'Website' },
]

const contactInfo = [
  { icon: MapPin, value: 'Bangkok, Thailand' },
  { icon: Phone, value: '+66 2 123 4567', href: 'tel:+6621234567' },
  { icon: Mail, value: 'info@pastechs.com', href: 'mailto:info@pastechs.com' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#0a1628] flex-shrink-0">
                <LogoCanvas
                  src="/icon.jpg"
                  width={40}
                  height={40}
                  speed={5000}
                  intensity={0.9}
                />
              </div>
              <span className="text-xl font-bold gradient-text">PAS Tech Group</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-1">
              PAS Tech Group Co., Ltd.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Empowering businesses through technology — Software, AI, Network & Security.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-5">
              {contactInfo.map(({ icon: Icon, value, href }) => (
                <div key={value} className="flex items-center gap-2">
                  <Icon size={14} className="text-sky-400 flex-shrink-0" />
                  {href ? (
                    <a href={href} className="text-slate-400 text-sm hover:text-slate-200 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <span className="text-slate-400 text-sm">{value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-slate-200 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-white font-semibold mb-4">Start a Project</h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Have an idea? Let&apos;s turn it into reality together.
            </p>
            <Link
              href="/contact"
              className="inline-block px-5 py-2.5 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors duration-200 mb-6"
            >
              Get in Touch
            </Link>
            <h4 className="text-white font-semibold mb-3 text-sm">Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
              <button className="px-3 py-2 rounded-lg bg-sky-600 text-white text-sm hover:bg-sky-700 transition-colors flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} PAS Tech Group Co., Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
