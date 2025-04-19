import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"

interface Product {
  id: string | number
  name: string
  price: number
  originalPrice?: number
  image: string
  backImage?: string | null
  category: string
  gender: string
}

interface ProductCardProps {
  product: Product
  hasDiscount?: boolean
}

export default function ProductCard({ product, hasDiscount = false }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/product/${product.id}`} className="block relative">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-gray-900 font-semibold mb-1">{product.name}</h3>
          <div className="flex items-center">
            <span className="font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
            {hasDiscount && product.originalPrice && (
              <span className="ml-2 text-gray-500 line-through text-sm">₹{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0 flex space-x-2">
        <button className="flex-1 bg-black hover:bg-gray-800 text-white py-2 rounded-md flex items-center justify-center transition-colors">
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to Cart
        </button>
        <button className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">
          <Heart className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
