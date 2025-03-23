import type { Metadata } from 'next'
import './globals.css'
import {ClerkProvider} from '@clerk/nextjs'
import { Navbar1 } from '@/components/navbar'

export const metadata: Metadata = {
  title: 'tapfolio',
  description: 'developed by sumona',
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
        <Navbar1 />
        {children}</body>
    </html>
    </ClerkProvider>
  )
}
