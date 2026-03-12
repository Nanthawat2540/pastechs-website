import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'PAS Techs — Web, Server & Software Solutions',
  description:
    'PAS Techs delivers cutting-edge web development, server infrastructure, software development, and IT consulting services. Build smarter. Scale faster.',
  keywords: [
    'web development',
    'server infrastructure',
    'software development',
    'IT consulting',
    'PAS Techs',
    'Thailand tech company',
  ],
  openGraph: {
    title: 'PAS Techs — Web, Server & Software Solutions',
    description: 'Cutting-edge tech solutions for modern businesses.',
    url: 'https://pastechs.com',
    siteName: 'PAS Techs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PAS Techs — Web, Server & Software Solutions',
    description: 'Cutting-edge tech solutions for modern businesses.',
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
