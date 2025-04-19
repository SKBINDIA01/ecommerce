import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  // Mock blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Summer Fashion Trends 2023",
      excerpt: "Discover the hottest fashion trends for summer 2023 and how to incorporate them into your wardrobe.",
      date: "June 15, 2023",
      author: "Fashion Editor",
      image: "/placeholder.svg?height=600&width=800",
      category: "Trends",
    },
    {
      id: 2,
      title: "The Art of Sustainable Fashion",
      excerpt:
        "Learn about sustainable fashion practices and how Urban Fynix is committed to reducing environmental impact.",
      date: "May 22, 2023",
      author: "Sustainability Expert",
      image: "/placeholder.svg?height=600&width=800",
      category: "Sustainability",
    },
    {
      id: 3,
      title: "Behind the Scenes: Our Design Process",
      excerpt: "Take a peek behind the curtain and discover how our design team creates our unique graphic designs.",
      date: "April 10, 2023",
      author: "Lead Designer",
      image: "/placeholder.svg?height=600&width=800",
      category: "Design",
    },
    {
      id: 4,
      title: "How to Style Urban Streetwear",
      excerpt: "Get tips and inspiration on how to style urban streetwear for different occasions and seasons.",
      date: "March 5, 2023",
      author: "Style Consultant",
      image: "/placeholder.svg?height=600&width=800",
      category: "Style Guide",
    },
    {
      id: 5,
      title: "The History of Graphic Tees",
      excerpt:
        "Explore the rich history of graphic t-shirts and their evolution from basic undergarments to fashion statements.",
      date: "February 18, 2023",
      author: "Fashion Historian",
      image: "/placeholder.svg?height=600&width=800",
      category: "Fashion History",
    },
    {
      id: 6,
      title: "Customer Spotlight: Urban Fynix Community",
      excerpt:
        "Meet some of our amazing customers and see how they style their Urban Fynix pieces in their everyday lives.",
      date: "January 30, 2023",
      author: "Community Manager",
      image: "/placeholder.svg?height=600&width=800",
      category: "Community",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center font-montserrat">BLOG</h1>

      {/* Featured Post */}
      <div className="mb-12">
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src={blogPosts[0].image || "/placeholder.svg"}
            alt={blogPosts[0].title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
            <div className="p-6 text-white">
              <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md mb-2">
                {blogPosts[0].category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 font-montserrat">{blogPosts[0].title}</h2>
              <p className="mb-4">{blogPosts[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <span>{blogPosts[0].author}</span>
                </div>
                <span>{blogPosts[0].date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(1).map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <span className="inline-block bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded-md mb-2">
                {post.category}
              </span>
              <h2 className="text-xl font-bold mb-2 font-montserrat">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                  <span>{post.author}</span>
                </div>
                <span>{post.date}</span>
              </div>
              <Link href={`/blog/${post.id}`} className="block mt-4 text-red-600 hover:text-red-800 font-semibold">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="mt-16 bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 font-montserrat">SUBSCRIBE TO OUR NEWSLETTER</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Stay updated with our latest blog posts, fashion tips, and exclusive offers.
        </p>
        <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  )
}
