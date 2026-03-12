import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'PAS Tech Group — Software, AI & Network Solutions',
  description:
    'PAS Tech Group Co., Ltd. delivers software development, AI solutions, network infrastructure, and cyber security services. Empowering businesses through technology.',
  keywords: [
    'software development',
    'AI solutions',
    'network infrastructure',
    'cyber security',
    'PAS Tech Group',
    'Thailand tech company',
    'web application',
    'mobile app',
    'enterprise systems',
  ],
  openGraph: {
    title: 'PAS Tech Group — Software, AI & Network Solutions',
    description: 'Empowering businesses through technology — Software, AI, Network & Security.',
    url: 'https://pastechs.com',
    siteName: 'PAS Tech Group',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PAS Tech Group — Software, AI & Network Solutions',
    description: 'Empowering businesses through technology — Software, AI, Network & Security.',
  },
  metadataBase: new URL('https://pastechs.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
