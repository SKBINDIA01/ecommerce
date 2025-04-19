import Image from "next/image"
import { Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import AddToCartButton from "@/components/add-to-cart-button"
import { fetchApi } from "@/lib/api"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params

  // Define product interface
  interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    details?: string[];
    sizes?: string[];
    colors?: string[];
    images?: string[];
    category: string;
    gender?: string;
    frontImageUrl: string;
    backImageUrl?: string;
    discountPercent?: number;
    discountedPrice?: number;
  }
  
  // Fetch product data from API
  let product: Product;
  try {
    // Use our API utility for consistent URL handling
    product = await fetchApi<Product>(`/api/products/${id}`, {
      cache: 'no-store'
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    // Fallback to mock data if API fetch fails
    product = {
      id: id,
      name: "Product Not Found",
      price: 0,
      description: "Product information could not be loaded. Please try again later.",
      details: [],
      sizes: [],
      colors: [],
      images: ["/placeholder.svg?height=600&width=500"],
      category: "",
      gender: "",
      frontImageUrl: "/placeholder.svg?height=600&width=500",
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            {product.images?.map((image, index) => (
              <div
                key={index}
                className={`${index === 0 ? "col-span-2 row-span-2" : ""} relative rounded-lg overflow-hidden`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - View ${index + 1}`}
                  width={index === 0 ? 1000 : 500}
                  height={index === 0 ? 1000 : 500}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2 font-montserrat">{product.name}</h1>
          <div className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  className="border border-gray-300 px-4 py-2 rounded-md hover:border-red-600 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors?.map((color) => (
                <button
                  key={color}
                  className="border border-gray-300 px-4 py-2 rounded-md hover:border-red-600 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Quantity</h3>
            <div className="flex items-center">
              <button className="border border-gray-300 px-3 py-1 rounded-l-md hover:bg-gray-100">-</button>
              <input
                type="number"
                min="1"
                value="1"
                className="border-t border-b border-gray-300 w-16 py-1 text-center focus:outline-none"
                readOnly
              />
              <button className="border border-gray-300 px-3 py-1 rounded-r-md hover:bg-gray-100">+</button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <AddToCartButton 
              productId={product.id} 
              name={product.name} 
              price={product.price}
              image={product.frontImageUrl}
            />
            <button className="flex items-center justify-center border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-100">
              <Heart className="h-5 w-5 mr-2" />
              Wishlist
            </button>
            <button className="flex items-center justify-center border border-gray-300 px-4 py-3 rounded-md hover:bg-gray-100">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-sm">Free shipping over $50</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-sm">Secure payment</span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-sm">30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 font-montserrat">Product Details</h2>
        <div className="border-t border-gray-200 pt-6">
          <ul className="list-disc pl-6 space-y-2">
            {product.details?.map((detail, index) => (
              <li key={index} className="text-gray-700">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
