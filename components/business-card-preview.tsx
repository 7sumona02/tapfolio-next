import { Phone, Mail, Globe, MapPin, Linkedin, Twitter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function BusinessCardPreview() {
  return (
    <div className="relative">
      <Card className="w-[350px] bg-white shadow-xl">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-green-500">
              <Image src="/placeholder.svg?height=200&width=200" alt="Profile picture" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Sarah Johnson</h3>
              <p className="text-green-600 font-medium">Marketing Director</p>
              <p className="text-sm text-gray-500">Green Solutions Inc.</p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-green-600" />
              <span className="text-sm">(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-green-600" />
              <span className="text-sm">sarah@greensolutions.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-green-600" />
              <span className="text-sm">www.greensolutions.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="text-sm">123 Eco Street, Green City</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <div className="p-2 rounded-full bg-green-100">
              <Linkedin className="h-4 w-4 text-green-600" />
            </div>
            <div className="p-2 rounded-full bg-green-100">
              <Twitter className="h-4 w-4 text-green-600" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t text-center">
            <p className="text-xs text-gray-500">Scan QR code or visit ecocard.com/sarah-johnson</p>
          </div>
        </CardContent>
      </Card>

      <div className="absolute -right-6 -bottom-6 h-24 w-24 bg-white rounded-lg shadow-lg flex items-center justify-center p-2">
        <div className="h-full w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

