import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Mission from '@/components/Mission'
import Services from '@/components/Services'
import Features from '@/components/Features'
import Stats from '@/components/Stats'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import CTASection from '@/components/CTASection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Popup from '@/components/Popup'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Popup />
      <Navbar />
      <Hero />
      <Mission />
      <Services />
      <Features />
      <Stats />
      <Portfolio />
      <Testimonials />
      <CTASection />
      <Contact />
      <Footer />
    </main>
  )
}
