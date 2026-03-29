import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'
import PortfolioManager from '@/components/admin/PortfolioManager'

export default async function PortfolioPage() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Portfolio Manager</h1>
        <PortfolioManager />
      </main>
    </div>
  )
}
