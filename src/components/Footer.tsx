import { Github, Twitter, Linkedin, Globe } from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'Software Development', href: '#services' },
    { label: 'Network & Infrastructure', href: '#services' },
    { label: 'Artificial Intelligence', href: '#services' },
    { label: 'Cyber Security', href: '#services' },
  ],
  Company: [
    { label: 'Vision & Mission', href: '#mission' },
    { label: 'Why Us', href: '#features' },
    { label: 'Track Record', href: '#stats' },
    { label: 'Contact', href: '#contact' },
  ],
}

const socials = [
  { icon: Github, href: 'https://github.com/pastechs', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/pastechs', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/pastechs', label: 'LinkedIn' },
  { icon: Globe, href: 'https://pastechs.com', label: 'Website' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-orange-500 flex items-center justify-center font-bold text-white text-sm">
                P
              </div>
              <span className="text-xl font-bold gradient-text">PAS Tech Group</span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-1">
              PAS Tech Group Co., Ltd.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Empowering businesses through technology — Software, AI, Network & Security.
            </p>
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
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-slate-200 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA */}
          <div>
            <h4 className="text-white font-semibold mb-4">Start a Project</h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Have an idea? Let&apos;s turn it into reality together.
            </p>
            <a
              href="#contact"
              className="inline-block px-5 py-2.5 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors duration-200"
            >
              Get in Touch
            </a>
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
