import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BackendFloatButton } from '@/components/backend-float-button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Lead Finder + CRM | Automate Your Sales Pipeline',
  description:
    'AI-powered CRM with automated lead scoring, email campaigns, and visual pipeline management.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <BackendFloatButton />
      </body>
    </html>
  )
}
