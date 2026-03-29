import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'
import TestimonialsManager from '@/components/admin/TestimonialsManager'

export default async function TestimonialsAdminPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 bg-slate-50 min-h-screen">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Testimonials</h1>
        <p className="text-slate-500 text-sm mb-6">Manage client reviews shown on the homepage</p>
        <TestimonialsManager />
      </main>
    </div>
  )
}
