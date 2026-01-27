import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { BackendFloatButton } from '@/components/backend-float-button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Network | Stay Connected with People Who Matter',
  description:
    'A warm, personal space to nurture relationships and remember meaningful connections.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <BackendFloatButton />
      </body>
    </html>
  )
}
