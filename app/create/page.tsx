"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Github, Linkedin, QrCode, Share2, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, Globe, MapPin } from "lucide-react"

export default function CreateCard() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    twitter: "",
    linkedin: "",
    github: "",
  })
  const [cardCreated, setCardCreated] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [cardUrl, setCardUrl] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would save the card to a database
    setCardCreated(true)

    // Generate a unique URL for the card
    const cardSlug = formData.name.toLowerCase().replace(/\s+/g, "-")
    const baseUrl = window.location.origin
    const fullCardUrl = `${baseUrl}/card/${cardSlug}`
    setCardUrl(fullCardUrl)

    // Generate QR code
    generateQRCode(fullCardUrl)

    toast({
      title: "Business card created!",
      description: "Your digital business card is now ready to share.",
    })
  }

  const generateQRCode = async (url: string) => {
    try {
      // Using the QR Code API to generate a QR code image
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
      setQrCodeUrl(qrApiUrl)
    } catch (error) {
      console.error("Error generating QR code:", error)
      toast({
        title: "QR Code Error",
        description: "There was an error generating your QR code. Please try again.",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Link copied!",
        description: "The link to your business card has been copied to clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  const downloadQRCode = () => {
    // Create a temporary link element
    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `${formData.name.toLowerCase().replace(/\s+/g, "-")}-qrcode.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Create Your Digital Business Card</h1>
      </div>

      {!cardCreated ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Marketing Director"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Green Solutions Inc."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="www.example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Business St, City"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Social Media Links</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      placeholder="https://twitter.com/yourusername"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourusername"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Create Business Card
              </Button>
            </form>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="flex justify-center">
              <Card className="w-[350px] bg-white shadow-lg">
                <CardContent className="pt-6 px-6 relative">
                  <div className="flex gap-4 justify-between">
                    <div className="space-y-[6px]">
                      <h3 className="text-lg font-semibold capitalize">{formData.name || "Your Name"}</h3>
                      <p className="text-neutral-500 font-medium capitalize text-sm">{formData.title || "Job Title"}</p>
                      <div className="border-t border-1 border-green-600 w-16"></div>
                      <p className="text-sm text-green-600 capitalize">{formData.company || "Company Name"}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    {formData.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 text-green-600" />
                        <span className="text-sm">{formData.phone}</span>
                      </div>
                    )}
                    {formData.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 text-green-600" />
                        <span className="text-sm">{formData.email}</span>
                      </div>
                    )}
                    {formData.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 text-green-600" />
                        <span className="text-sm">{formData.website}</span>
                      </div>
                    )}
                    {formData.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 text-green-600" />
                        <span className="text-sm">{formData.address}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 space-y-2 flex justify-center">
                    <div className="flex space-x-2">
                      {formData.twitter && (
                        <div className="p-2 rounded-full bg-green-100">
                          <Link href={formData.twitter}>
                            <Twitter className="size-4 text-green-600" />
                          </Link>
                        </div>
                      )}
                      {formData.linkedin && (
                        <div className="p-2 rounded-full bg-green-100">
                          <Link href={formData.linkedin}>
                            <Linkedin className="size-4 text-green-600" />
                          </Link>
                        </div>
                      )}
                      {formData.github && (
                        <div className="p-2 rounded-full bg-green-100">
                          <Link href={formData.github}>
                            <Github className="size-4 text-green-600" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Your Digital Business Card is Ready!</h2>

                <Tabs defaultValue="qr">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="qr">QR Code</TabsTrigger>
                    <TabsTrigger value="link">Share Link</TabsTrigger>
                    <TabsTrigger value="download">Download</TabsTrigger>
                  </TabsList>
                  <TabsContent value="qr" className="p-4">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-48 w-48 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                        {qrCodeUrl ? (
                          <Image
                            src={qrCodeUrl || "/placeholder.svg"}
                            alt="QR Code for your digital business card"
                            width={200}
                            height={200}
                          />
                        ) : (
                          <QrCode className="h-24 w-24 text-gray-400" />
                        )}
                      </div>
                      <p className="text-center text-sm text-gray-600">
                        Scan this QR code to instantly share your digital business card
                      </p>
                      <Button onClick={downloadQRCode}>
                        <Download className="mr-2 h-4 w-4" />
                        Download QR Code
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="link" className="p-4">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-full p-3 bg-gray-100 rounded-md text-center break-all">{cardUrl}</div>
                      <p className="text-center text-sm text-gray-600">
                        Share this link via email, text, or social media
                      </p>
                      <Button onClick={() => copyToClipboard(cardUrl)}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Copy Link
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="download" className="p-4">
                    <div className="flex flex-col items-center gap-4">
                      <p className="text-center text-sm text-gray-600">
                        Download your digital business card to share offline or via email
                      </p>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <Button variant="outline" onClick={downloadQRCode}>
                          <Download className="mr-2 h-4 w-4" />
                          PNG Format
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "Coming soon",
                              description: "PDF download will be available in the next update.",
                            })
                          }}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          PDF Format
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-semibold mb-2">Sustainability Impact</h3>
                  <p className="text-sm text-gray-600 mb-4">By choosing a digital business card, you're helping to:</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Save approximately 7.2g of paper per card
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Reduce water usage by 13 liters per 100 cards
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Lower carbon emissions from production and transportation
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
            <Card className="w-[350px] bg-white shadow-lg">
              <CardContent className="pt-6 px-6 relative">
                <div className="flex gap-4 justify-between">
                  <div className="space-y-[6px]">
                    <h3 className="text-lg font-semibold capitalize">{formData.name}</h3>
                    <p className="text-neutral-500 font-medium capitalize text-sm">{formData.title}</p>
                    <div className="border-t border-1 border-green-600 w-16"></div>
                    <p className="text-sm text-green-600 capitalize">{formData.company}</p>
                  </div>
                  <div className="opacity-20">
                    {qrCodeUrl && (
                      <Image
                        src={qrCodeUrl || "/placeholder.svg"}
                        alt="QR Code"
                        width={56}
                        height={56}
                        className="rounded"
                      />
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  {formData.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 text-green-600" />
                      <span className="text-sm">{formData.phone}</span>
                    </div>
                  )}
                  {formData.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 text-green-600" />
                      <span className="text-sm">{formData.email}</span>
                    </div>
                  )}
                  {formData.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 text-green-600" />
                      <span className="text-sm">{formData.website}</span>
                    </div>
                  )}
                  {formData.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 text-green-600" />
                      <span className="text-sm">{formData.address}</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 space-y-2 flex justify-center">
                  <div className="flex space-x-2">
                    {formData.twitter && (
                      <div className="p-2 rounded-full bg-green-100">
                        <Link href={formData.twitter}>
                          <Twitter className="size-4 text-green-600" />
                        </Link>
                      </div>
                    )}
                    {formData.linkedin && (
                      <div className="p-2 rounded-full bg-green-100">
                        <Link href={formData.linkedin}>
                          <Linkedin className="size-4 text-green-600" />
                        </Link>
                      </div>
                    )}
                    {formData.github && (
                      <div className="p-2 rounded-full bg-green-100">
                        <Link href={formData.github}>
                          <Github className="size-4 text-green-600" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t text-center">
                  <p className="text-xs text-gray-500">Scan QR code or visit {cardUrl.split("//")[1]}</p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-4">Want to make changes?</p>
              <Button variant="outline" onClick={() => setCardCreated(false)}>
                Edit Business Card
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

