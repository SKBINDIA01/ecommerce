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
    
    // Fallback to mock data if API call fails
    if (category === 'tshirts') {
      products = [
        {
          id: 't1',
          name: "Urban Graphic Tee",
          description: "Stylish urban graphic t-shirt with premium quality fabric.",
          category: "tshirts",
          price: 29.99,
          discountPercent: 10,
          discountedPrice: 26.99,
          frontImageUrl: "/placeholder.svg?height=400&width=300",
          backImageUrl: "/placeholder.svg?height=400&width=300",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 't2',
          name: "Street Style Tee",
          description: "Comfortable street style t-shirt for everyday wear.",
          category: "tshirts",
          price: 34.99,
          discountPercent: null,
          discountedPrice: null,
          frontImageUrl: "/placeholder.svg?height=400&width=300",
          backImageUrl: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 't3',
          name: "Casual Fit Tee",
          description: "Relaxed fit casual t-shirt made with soft cotton.",
          category: "tshirts",
          price: 27.99,
          discountPercent: 15,
          discountedPrice: 23.79,
          frontImageUrl: "/placeholder.svg?height=400&width=300",
          backImageUrl: "/placeholder.svg?height=400&width=300",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 't4',
          name: "Vintage Print Tee",
          description: "Classic vintage print t-shirt with retro design.",
          category: "tshirts",
          price: 32.99,
          discountPercent: null,
          discountedPrice: null,
          frontImageUrl: "/placeholder.svg?height=400&width=300",
          backImageUrl: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
    } else if (category === 'hoodies') {
      products = [
        {
          id: 'h1',
          name: "Classic Hoodie",
          description: "Warm and comfortable classic hoodie for everyday wear.",
          category: "hoodies",
          price: 49.99,
          discountPercent: null,
          discountedPrice: null,
          frontImageUrl: "/placeholder.svg?height=400&width=300",
          backImageUrl: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'h2',
          name: "Zip-up Hoodie",
          description: "Convenient zip-up hoodie with premium quality fabric.",
          category: "hoodies",
          price: 54.99,
          discountPercent: 10,
          discountedPrice: 49.49,
          frontImageUrl: "/placeholder.svg?height=400&width=300",
          backImageUrl: "/placeholder.svg?height=400&width=300",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
    } else if (category === 'accessories') {
      products = [
        {
          id: 'a1',
          name: "Urban Backpack",
          description: "Stylish urban backpack with multiple compartments.",
          category: "accessories",
          price: 39.99,
          discountPercent: null,
          discountedPrice: null,
          frontImageUrl: "/placeholder.svg?height=400&width=300",
          backImageUrl: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'a2',
          name: "Designer Cap",
          description: "Premium designer cap with embroidered logo.",
          category: "accessories",
          price: 24.99,
          discountPercent: 15,
          discountedPrice: 21.24,
          frontImageUrl: "/placeholder.svg?height=400&width=300",
          backImageUrl: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
    }
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
