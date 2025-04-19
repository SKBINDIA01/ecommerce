import Image from "next/image"
import Link from "next/link"
import { ArrowRight, TrendingUp, Tag } from "lucide-react"
import ProductCard from "@/components/product-card"
import { fetchApi } from "@/lib/api"

export default async function Home() {
  // Fetch products from API
  let productsData = [];
  try {
    // Use our API utility for consistent URL handling
    productsData = await fetchApi<any[]>('/api/products', {
      cache: 'no-store'
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
  
  // Define product types
  type ApiProduct = {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    discountPercent?: number | null;
    discountedPrice?: number | null;
    frontImageUrl: string;
    backImageUrl?: string | null;
    createdAt: string;
    updatedAt: string;
  }
  
  interface DisplayProduct {
    id: string | number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    gender: string;
  }
  
  // Process products
  const allProducts = (productsData as ApiProduct[]).map(product => ({
    id: product.id,
    name: product.name,
    price: product.discountedPrice || product.price,
    originalPrice: product.discountPercent ? product.price : undefined,
    image: product.frontImageUrl,
    category: product.category,
    gender: "unisex"
  }));
  
  // Get trending products (first 4)
  const trendingProducts: DisplayProduct[] = allProducts.slice(0, 4);
  
  // Get deals (products with discounts)
  const deals: DisplayProduct[] = allProducts
    .filter(product => product.originalPrice)
    .slice(0, 4);
  
  // Old mock data for reference
  /*const trendingProducts = [
    {
      id: 1,
      name: "Urban Graphic Tee",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "tshirts",
      gender: "unisex",
    },
    {
      id: 2,
      name: "Street Hoodie",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "hoodies",
      gender: "unisex",
    },
    {
      id: 3,
      name: "Designer Cap",
      price: 19.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "accessories",
      gender: "unisex",
    },
    {
      id: 4,
      name: "Urban Camo Tee",
      price: 34.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "tshirts",
      gender: "men",
    },
  ]*/

  // Old mock data for deals
  /*const deals = [
    {
      id: 5,
      name: "Summer Collection Tee",
      price: 24.99,
      originalPrice: 39.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "tshirts",
      gender: "women",
    },
    {
      id: 6,
      name: "Winter Hoodie",
      price: 44.99,
      originalPrice: 69.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "hoodies",
      gender: "men",
    },
    {
      id: 7,
      name: "Urban Backpack",
      price: 39.99,
      originalPrice: 59.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "accessories",
      gender: "unisex",
    },
    {
      id: 8,
      name: "Graphic Print Tee",
      price: 19.99,
      originalPrice: 29.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "tshirts",
      gender: "unisex",
    },
  ]*/

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Urban Fashion"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-montserrat">REDEFINE YOUR STYLE</h1>
            <p className="text-xl mb-8">
              Express yourself with Urban Fynix's exclusive designs and premium quality apparel.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-colors"
            >
              SHOP NOW
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center font-montserrat">CATEGORIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/categories/tshirts" className="group">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=400"
                  alt="T-Shirts"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">T-SHIRTS</h3>
                </div>
              </div>
            </Link>
            <Link href="/categories/hoodies" className="group">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=400"
                  alt="Hoodies"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">HOODIES</h3>
                </div>
              </div>
            </Link>
            <Link href="/categories/accessories" className="group">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=400"
                  alt="Accessories"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">ACCESSORIES</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-12">
            <TrendingUp className="h-6 w-6 text-red-600 mr-2" />
            <h2 className="text-3xl font-bold font-montserrat">TRENDING NOW</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trendingProducts.map((product: DisplayProduct) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Deals Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-12">
            <Tag className="h-6 w-6 text-red-600 mr-2" />
            <h2 className="text-3xl font-bold font-montserrat">BEST DEALS</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {deals.map((product: DisplayProduct) => (
              <ProductCard key={product.id} product={product} hasDiscount />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 font-montserrat">JOIN THE URBAN FYNIX COMMUNITY</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and fashion
            tips.
          </p>
          <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md font-bold transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
