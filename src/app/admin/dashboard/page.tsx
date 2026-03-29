import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'
import Link from 'next/link'

const cards = [
  { href: '/admin/dashboard/popup', icon: '📢', title: 'Popup', desc: 'Manage website popup message' },
  { href: '/admin/dashboard/portfolio', icon: '💼', title: 'Portfolio', desc: 'Add, edit, or remove projects' },
  { href: '/admin/dashboard/services', icon: '⚙️', title: 'Services', desc: 'Manage homepage service cards' },
  { href: '/admin/dashboard/testimonials', icon: '⭐', title: 'Testimonials', desc: 'Manage client reviews' },
  { href: '/admin/dashboard/settings', icon: '🔧', title: 'Settings', desc: 'Company info & social links' },
]

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 bg-slate-50 min-h-screen">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Dashboard</h1>
        <p className="text-slate-500 text-sm mb-8">Welcome back, {String(session.username)}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
          {cards.map(card => (
            <Link
              key={card.href}
              href={card.href}
              className="block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 hover:border-sky-300"
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h2 className="font-semibold text-slate-800 text-lg">{card.title}</h2>
              <p className="text-slate-500 text-sm mt-1">{card.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
