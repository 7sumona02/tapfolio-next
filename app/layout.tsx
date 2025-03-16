import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import {ClerkProvider} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <Header />
        {children}</body>
    </html>
    </ClerkProvider>
  )
}
