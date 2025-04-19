import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

async function getProducts() {
  try {
    return await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function AdminProducts() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add New Product
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discounted
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={product.frontImageUrl}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.discountedPrice ? (
                      <div className="text-sm text-gray-900">
                        ₹{product.discountedPrice.toFixed(2)} ({product.discountPercent}%)
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">-</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </Link>
                    <a
                      href="#"
                      className="text-red-600 hover:text-red-900"
                      data-product-id={product.id}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No products found.{" "}
                  <Link href="/api/seed" className="text-blue-600 hover:underline">
                    Import products from CSV
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('click', function(e) {
              if (e.target.matches('a[data-product-id]')) {
                e.preventDefault();
                const productId = e.target.getAttribute('data-product-id');
                if (confirm('Are you sure you want to delete this product?')) {
                  fetch('/api/admin/products/' + productId, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  })
                  .then(response => response.json())
                  .then(data => {
                    if (data.success) {
                      window.location.reload();
                    } else {
                      alert('Failed to delete product.');
                    }
                  })
                  .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while deleting the product.');
                  });
                }
              }
            });
          `,
        }}
      />
    </div>
  );
}
