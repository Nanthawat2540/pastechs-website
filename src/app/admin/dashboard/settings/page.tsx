import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'
import SiteSettings from '@/components/admin/SiteSettings'

export default async function SettingsAdminPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 bg-slate-50 min-h-screen">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Site Settings</h1>
        <p className="text-slate-500 text-sm mb-6">Company information and contact details</p>
        <SiteSettings />
      </main>
    </div>
  )
}
