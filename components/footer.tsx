import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="mb-4">
              <div className="relative h-10 w-32 invert">
                <Image src="/images/urban-fynix.png" alt="Urban Fynix" fill className="object-contain" />
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Urban Fynix is a premium fashion brand specializing in unique designs and high-quality apparel.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-montserrat">SHOP</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/tshirts" className="text-gray-400 hover:text-white">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/categories/hoodies" className="text-gray-400 hover:text-white">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories" className="text-gray-400 hover:text-white">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-white">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-white">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-montserrat">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/track-order" className="text-gray-400 hover:text-white">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-montserrat">INFORMATION</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Urban Fynix. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <img src="/placeholder.svg?height=30&width=50&text=Visa" alt="Visa" className="h-8" />
            <img src="/placeholder.svg?height=30&width=50&text=Mastercard" alt="Mastercard" className="h-8" />
            <img src="/placeholder.svg?height=30&width=50&text=PayPal" alt="PayPal" className="h-8" />
            <img src="/placeholder.svg?height=30&width=50&text=Amex" alt="American Express" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  )
}
