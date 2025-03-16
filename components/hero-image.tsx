import Image from "next/image"

export default function HeroImage() {
  return (
    <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
      <Image
        src="/placeholder.svg?height=800&width=600"
        alt="Digital business cards being shared between devices"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-green-900/20 to-transparent" />
    </div>
  )
}

