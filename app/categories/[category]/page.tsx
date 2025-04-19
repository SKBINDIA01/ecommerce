import { notFound } from "next/navigation"
import ProductFilter from "@/components/product-filter"
import ProductCard from "@/components/product-card"
import { fetchApi } from "@/lib/api"

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = await Promise.resolve(params)

  // Validate category
  const validCategories = ["tshirts", "hoodies", "accessories"]
  if (!validCategories.includes(category)) {
    notFound()
  }

  // Fetch products from API
  let products = [];
  try {
    // Use our API utility for consistent URL handling
    products = await fetchApi<any[]>(`/api/products?category=${category}`, {
      cache: 'no-store'
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
  
  // Define the product type
  type Product = {
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

  interface MappedProduct {
    id: string | number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    backImage?: string | null;
    category: string;
    gender: string;
  }

  // Map products to expected format and convert price to rupees
  const mappedProducts: MappedProduct[] = (products as Product[]).map(product => ({
    id: product.id,
    name: product.name,
    price: product.discountedPrice || product.price,
    originalPrice: product.discountPercent ? product.price : undefined,
    image: product.frontImageUrl,
    backImage: product.backImageUrl,
    category: product.category,
    gender: "unisex"
  }))
  
  // Mock data for products (keeping as comment for reference)
  /*const products = [
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
      name: "Street Style Tee",
      price: 34.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "tshirts",
      gender: "men",
    },
    {
      id: 3,
      name: "Casual Fit Tee",
      price: 27.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "tshirts",
      gender: "women",
    },
    {
      id: 4,
      name: "Vintage Print Tee",
      price: 32.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "tshirts",
      gender: "unisex",
    },
    {
      id: 5,
      name: "Classic Hoodie",
      price: 49.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "hoodies",
      gender: "unisex",
    },
    {
      id: 6,
      name: "Zip-up Hoodie",
      price: 54.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "hoodies",
      gender: "men",
    },
    {
      id: 7,
      name: "Cropped Hoodie",
      price: 47.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "hoodies",
      gender: "women",
    },
    {
      id: 8,
      name: "Urban Backpack",
      price: 39.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "accessories",
      gender: "unisex",
    },
    {
      id: 9,
      name: "Designer Cap",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "accessories",
      gender: "unisex",
    },
    {
      id: 10,
      name: "Urban Socks",
      price: 12.99,
      image: "/placeholder.svg?height=400&width=300",
      category: "accessories",
      gender: "unisex",
    },
  ]*/

  // Category titles
  const categoryTitles: { [key: string]: string } = {
    tshirts: "T-Shirts",
    hoodies: "Hoodies",
    accessories: "Accessories",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize font-montserrat">{category}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <ProductFilter />
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {mappedProducts.map((product) => (
              <ProductCard key={product.id} product={product} hasDiscount={!!product.originalPrice} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
