"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingBag, User, Search, MessageCircle, LogIn } from "lucide-react"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative h-10 w-32">
              <Image src="/images/urban-fynix.png" alt="Urban Fynix" fill className="object-contain" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-900 hover:text-red-600 font-medium">
              HOME
            </Link>
            <Link href="/categories" className="text-gray-900 hover:text-red-600 font-medium">
              SHOP
            </Link>
            <Link href="/about" className="text-gray-900 hover:text-red-600 font-medium">
              ABOUT
            </Link>
            <Link href="/blog" className="text-gray-900 hover:text-red-600 font-medium">
              BLOG
            </Link>
            <Link href="/support" className="text-gray-900 hover:text-red-600 font-medium">
              SUPPORT
            </Link>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-900 hover:text-red-600">
              <Search className="h-5 w-5" />
            </button>
            
            {/* Authentication - show different UI based on signed in state */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <div className="flex items-center space-x-2">
                <SignInButton mode="modal">
                  <button className="flex items-center text-gray-900 hover:text-red-600">
                    <LogIn className="h-5 w-5 mr-1" />
                    <span className="font-medium">Sign In</span>
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            
            <Link href="/cart" className="text-gray-900 hover:text-red-600 relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </Link>
            <Link href="/support" className="text-gray-900 hover:text-red-600">
              <MessageCircle className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="text-gray-900 hover:text-red-600 relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900 hover:text-red-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-red-600 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/categories"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-red-600 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              SHOP
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-red-600 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-red-600 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              BLOG
            </Link>
            <Link
              href="/support"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-red-600 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              SUPPORT
            </Link>
            <Link
              href="/profile"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-red-600 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              ACCOUNT
            </Link>
            <SignedOut>
              <div className="block px-3 py-2">
                <SignInButton mode="modal">
                  <button className="w-full text-left text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-red-600 rounded-md py-2">
                    SIGN IN
                  </button>
                </SignInButton>
              </div>
              <div className="block px-3 py-2">
                <SignUpButton mode="modal">
                  <button className="w-full text-left text-base font-medium bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
                    SIGN UP
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>

            <div className="pt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
