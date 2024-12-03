import type { Metadata } from 'next'
import './globals.css'
import { draftMode } from 'next/headers'
const WEBSITE_URL = process.env.SITE_URL || 'https://vary.ge'

import { Noto_Sans_Georgian } from 'next/font/google'

const NotoSansGeorgian = Noto_Sans_Georgian({ subsets: ['georgian', 'latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
  title: 'Visionary / ვიჟინერი',
  description: 'Visionary - ავეჯის AR მარკეტფლეისი',
  openGraph: {
    title: 'Visionary / ვიჟინერი',
    description: 'Visionary - ავეჯის AR მარკეტფლეისი',
    locale: 'ka-GE',
    siteName: 'Visionary / ვიჟინერი',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${NotoSansGeorgian.className}`}>
      <body>{children}</body>
    </html>
  )
}
