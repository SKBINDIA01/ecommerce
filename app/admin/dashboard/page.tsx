import { UserButton } from "@clerk/nextjs";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const productCount = await prisma.product.count();
    const orderCount = await prisma.order.count();
    const totalRevenue = await prisma.payment.aggregate({
      where: {
        status: "COMPLETED",
      },
      _sum: {
        amount: true,
      },
    });

    return {
      productCount,
      orderCount,
      totalRevenue: totalRevenue._sum.amount || 0,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      productCount: 0,
      orderCount: 0,
      totalRevenue: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-600">Total Products</h2>
          <p className="text-3xl font-bold mt-2">{stats.productCount}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-600">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">{stats.orderCount}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-gray-600">Total Revenue</h2>
          <p className="text-3xl font-bold mt-2">₹{stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/products/new"
            className="block bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
          >
            Add New Product
          </a>
          <a
            href="/api/seed"
            className="block bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition"
          >
            Import Products from CSV
          </a>
        </div>
      </div>
    </div>
  );
}
