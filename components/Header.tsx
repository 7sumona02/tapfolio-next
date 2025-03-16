import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Leaf } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link href='/'>
            <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold">tapfolio</span>
            </div>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline">
              How It Works
            </Link>
            <Link href="/create" className="text-sm font-medium hover:underline">
              Create Card
            </Link>
            <Link href="/view-card" className="text-sm font-medium hover:underline">
              View Card
            </Link>
            <SignedOut>
                <Button><SignInButton /></Button>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
          </nav>
        </div>
      </header> 
  )
}

export default Header