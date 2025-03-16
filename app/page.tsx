import Link from "next/link"
import { ArrowRight, Leaf, Share2, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroImage from "@/components/hero-image"
import FeatureCard from "@/components/feature-card"
import BusinessCardPreview from "@/components/business-card-preview"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">EcoCard</span>
          </div>
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
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header> */}
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 space-y-6">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">
                Sustainable Business Networking
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Digital Business Cards for a <span className="text-green-600">Greener Planet</span>
              </h1>
              <p className="text-xl text-gray-600">
                Create, share, and manage your digital business cards. Save trees, reduce waste, and make networking
                more efficient.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/create">
                    Create Your Card <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </div>
              <div className="text-sm text-gray-500">Join over 10,000 professionals already using EcoCard</div>
            </div>
            <div className="flex-1">
              <HeroImage />
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Digital Business Cards?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Leaf className="h-10 w-10 text-green-600" />}
                title="Eco-Friendly"
                description="Save approximately 7.2 million trees annually by eliminating paper business cards."
              />
              <FeatureCard
                icon={<Share2 className="h-10 w-10 text-green-600" />}
                title="Easy Sharing"
                description="Share your contact information instantly via QR code, email, or direct link."
              />
              <FeatureCard
                icon={<Smartphone className="h-10 w-10 text-green-600" />}
                title="Always Updated"
                description="Update your information once, and it's updated everywhere your card is shared."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-800 font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-bold">Create Your Digital Card</h3>
                  </div>
                  <p className="text-gray-600 ml-11">
                    Fill in your details, upload a photo, and customize your card's appearance.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-800 font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-bold">Share With Anyone</h3>
                  </div>
                  <p className="text-gray-600 ml-11">
                    Generate a QR code, share via email, or copy a direct link to your card.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-800 font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-bold">Update Anytime</h3>
                  </div>
                  <p className="text-gray-600 ml-11">
                    Change your information once, and it updates everywhere your card is shared.
                  </p>
                </div>
                <Button size="lg" asChild className="mt-4">
                  <Link href="/create">Create Your Card Now</Link>
                </Button>
              </div>
              <div className="flex justify-center">
                <BusinessCardPreview />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-green-50">
          <div className="container text-center space-y-8">
            <h2 className="text-3xl font-bold">Ready to Go Paperless?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals who have already made the switch to sustainable networking.
            </p>
            <Button size="lg" asChild className="mt-4">
              <Link href="/create">Create Your Digital Business Card</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <span className="font-bold">EcoCard</span>
          </div>
          <div className="text-sm text-gray-500">© {new Date().getFullYear()} EcoCard. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

