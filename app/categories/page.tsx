import Link from "next/link"
import Image from "next/image"

export default function CategoriesPage() {
  const categories = [
    {
      id: "tshirts",
      name: "T-Shirts",
      description: "Premium quality t-shirts with unique designs",
      image: "/placeholder.svg?height=600&width=400",
    },
    {
      id: "hoodies",
      name: "Hoodies",
      description: "Stay warm and stylish with our designer hoodies",
      image: "/placeholder.svg?height=600&width=400",
    },
    {
      id: "accessories",
      name: "Accessories",
      description: "Complete your look with our trendy accessories",
      image: "/placeholder.svg?height=600&width=400",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 font-montserrat">CATEGORIES</h1>
      <p className="text-lg mb-12 max-w-3xl">
        Browse our collection of premium quality apparel and accessories. Each item is crafted with attention to detail
        and designed to make a statement.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-80">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 font-montserrat">{category.name}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <span className="text-red-600 font-semibold flex items-center">
                  SHOP NOW
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
