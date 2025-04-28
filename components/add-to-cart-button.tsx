"use client"

import { useState, useEffect } from "react"
import { ShoppingCart } from "lucide-react"
import { useCart, CartItem } from "@/lib/cart"
import { toast } from "sonner"

interface AddToCartButtonProps {
  productId: string;
  name: string;
  price: number;
  image?: string;
  size?: string;
  color?: string;
}

export default function AddToCartButton({ productId, name, price, image, size, color }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [mounted, setMounted] = useState(false)
  const { addItem } = useCart()
  
  // Only render after component is mounted on client
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = () => {
    setIsAdding(true)

    const item: CartItem = {
      id: productId,
      name,
      price,
      quantity,
      size,
      color,
      image: image || "/placeholder.svg?height=200&width=150"
    }

    // Add item to cart
    addItem(item)
    
    // Show toast notification
    toast.success(`${name} added to cart!`)

    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  // Don't render until client-side hydration is complete
  if (!mounted) {
    return (
      <button 
        disabled
        className="flex-1 bg-red-600 opacity-70 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center"
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add to Cart
      </button>
    )
  }
  
  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center justify-center"
    >
      <ShoppingCart className="h-5 w-5 mr-2" />
      {isAdding ? "Adding..." : "Add to Cart"}
    </button>
  )
}
