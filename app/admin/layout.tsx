import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <SignedIn>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 text-white p-4">
            <div className="text-xl font-bold mb-8">Admin Dashboard</div>
            <nav className="space-y-2">
              <Link
                href="/admin/dashboard"
                className="block py-2 px-4 rounded hover:bg-gray-800"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/products"
                className="block py-2 px-4 rounded hover:bg-gray-800"
              >
                Products
              </Link>
              <Link
                href="/admin/orders"
                className="block py-2 px-4 rounded hover:bg-gray-800"
              >
                Orders
              </Link>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 p-8">{children}</div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}
