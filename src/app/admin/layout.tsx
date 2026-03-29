import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — PAS Tech Group',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      {children}
    </div>
  )
}
