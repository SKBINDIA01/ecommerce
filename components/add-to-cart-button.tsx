"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { useCart, CartItem } from "@/lib/cart"

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
  const { addItem } = useCart()

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

    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
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
