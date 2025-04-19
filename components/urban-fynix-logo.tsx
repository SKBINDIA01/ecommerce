"use client"
import Image from "next/image"

interface UrbanFynixLogoProps {
  className?: string
}

export function UrbanFynixLogo({ className = "" }: UrbanFynixLogoProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/urban-fynix.png"
        alt="URBAN FYNIX Logo"
        width={600}
        height={400}
        className="w-full h-auto"
        priority
      />
    </div>
  )
}
