import { Github, Twitter, Linkedin, Globe } from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'Web Development', href: '#services' },
    { label: 'Server & Infrastructure', href: '#services' },
    { label: 'Software Development', href: '#services' },
    { label: 'IT Consulting', href: '#services' },
  ],
  Company: [
    { label: 'About Us', href: '#features' },
    { label: 'Our Work', href: '#stats' },
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
    <footer className="border-t border-white/10 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                P
              </div>
              <span className="text-xl font-bold gradient-text">PAS Techs</span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Building the digital future — one project at a time. Web, server, software, and IT
              consulting for businesses that want to move fast.
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
                    className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
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
                      className="text-gray-500 hover:text-gray-300 transition-colors duration-200 text-sm"
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
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Have an idea? Let&apos;s turn it into reality.
            </p>
            <a
              href="#contact"
              className="inline-block px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {currentYear} PAS Techs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
