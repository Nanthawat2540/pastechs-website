import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Features from '@/components/Features'
import Stats from '@/components/Stats'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05050f]">
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <Stats />
      <Contact />
      <Footer />
    </main>
  )
}
