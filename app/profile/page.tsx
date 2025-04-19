"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, Package, Heart, CreditCard, LogOut, Edit2 } from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (123) 456-7890",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    orders: [
      {
        id: "UF12345678",
        date: "June 15, 2023",
        status: "Delivered",
        total: 79.98,
        items: [
          {
            id: 1,
            name: "Urban Graphic Tee",
            price: 29.99,
            quantity: 1,
            size: "M",
            color: "Black",
            image: "/placeholder.svg?height=80&width=60",
          },
          {
            id: 5,
            name: "Classic Hoodie",
            price: 49.99,
            quantity: 1,
            size: "L",
            color: "Navy",
            image: "/placeholder.svg?height=80&width=60",
          },
        ],
      },
      {
        id: "UF87654321",
        date: "May 22, 2023",
        status: "Delivered",
        total: 64.97,
        items: [
          {
            id: 3,
            name: "Designer Cap",
            price: 19.99,
            quantity: 1,
            size: "One Size",
            color: "Red",
            image: "/placeholder.svg?height=80&width=60",
          },
          {
            id: 4,
            name: "Urban Camo Tee",
            price: 34.99,
            quantity: 1,
            size: "L",
            color: "Camo",
            image: "/placeholder.svg?height=80&width=60",
          },
          {
            id: 9,
            name: "Urban Backpack",
            price: 39.99,
            quantity: 1,
            size: "One Size",
            color: "Black",
            image: "/placeholder.svg?height=80&width=60",
          },
        ],
      },
    ],
    wishlist: [
      {
        id: 2,
        name: "Street Style Tee",
        price: 34.99,
        image: "/placeholder.svg?height=120&width=100",
      },
      {
        id: 6,
        name: "Zip-up Hoodie",
        price: 54.99,
        image: "/placeholder.svg?height=120&width=100",
      },
      {
        id: 8,
        name: "Urban Backpack",
        price: 39.99,
        image: "/placeholder.svg?height=120&width=100",
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 font-montserrat">MY ACCOUNT</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-montserrat">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "profile"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "orders"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
                }`}
              >
                <Package className="h-5 w-5 mr-3" />
                Orders
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "wishlist"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
                }`}
              >
                <Heart className="h-5 w-5 mr-3" />
                Wishlist
              </button>
              <button
                onClick={() => setActiveTab("payment")}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "payment"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
                }`}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                Payment Methods
              </button>
              <Link
                href="/auth/login"
                className="w-full flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-red-600"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold font-montserrat">PROFILE INFORMATION</h2>
                <button className="flex items-center text-red-600 hover:text-red-800">
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 font-montserrat">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 font-montserrat">Shipping Address</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Street Address</p>
                      <p className="font-medium">{user.address.street}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">City, State, ZIP</p>
                      <p className="font-medium">
                        {user.address.city}, {user.address.state} {user.address.zip}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-medium">{user.address.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 font-montserrat">Password</h3>
                <p className="text-gray-600 mb-4">
                  For security reasons, we don't display your password. You can change it anytime.
                </p>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors">
                  Change Password
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 font-montserrat">Communication Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      defaultChecked
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="newsletter" className="ml-2 block text-gray-700">
                      Subscribe to newsletter
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="promotions"
                      defaultChecked
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="promotions" className="ml-2 block text-gray-700">
                      Receive promotional emails
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="orderUpdates"
                      defaultChecked
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="orderUpdates" className="ml-2 block text-gray-700">
                      Receive order updates via SMS
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 font-montserrat">ORDER HISTORY</h2>

              {user.orders.length > 0 ? (
                <div className="space-y-6">
                  {user.orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <div>
                          <p className="font-semibold">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">Placed on {order.date}</p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                          <Link
                            href={`/track-order?id=${order.id}`}
                            className="ml-4 text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Track Order
                          </Link>
                        </div>
                      </div>

                      <div className="p-4 border-t border-gray-200">
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center">
                              <div className="flex-shrink-0 w-20 h-20 relative">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <h3 className="text-sm font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-500">
                                  Size: {item.size} | Color: {item.color}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Qty: {item.quantity} x ${item.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                                <Link href={`/product/${item.id}`} className="text-sm text-red-600 hover:text-red-800">
                                  Buy Again
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                          <p className="font-semibold">Total</p>
                          <p className="font-semibold">${order.total.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end space-x-4">
                        <button className="text-gray-700 hover:text-gray-900 text-sm font-medium">View Invoice</button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">Request Return</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2 font-montserrat">No Orders Yet</h3>
                  <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                  <Link
                    href="/categories"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors inline-block"
                  >
                    START SHOPPING
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 font-montserrat">MY WISHLIST</h2>

              {user.wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.wishlist.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="relative h-48">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium mb-1">{item.name}</h3>
                        <p className="text-gray-900 font-bold mb-4">${item.price.toFixed(2)}</p>
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-md transition-colors text-sm">
                            Add to Cart
                          </button>
                          <button className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2 font-montserrat">Your Wishlist is Empty</h3>
                  <p className="text-gray-600 mb-6">Save your favorite items to your wishlist.</p>
                  <Link
                    href="/categories"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors inline-block"
                  >
                    EXPLORE PRODUCTS
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === "payment" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold font-montserrat">PAYMENT METHODS</h2>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors text-sm">
                  Add New Card
                </button>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center mr-4">
                      <span className="text-blue-800 font-bold text-xs">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-red-100 rounded flex items-center justify-center mr-4">
                      <span className="text-red-800 font-bold text-xs">MC</span>
                    </div>
                    <div>
                      <p className="font-medium">Mastercard ending in 5678</p>
                      <p className="text-sm text-gray-500">Expires 08/2024</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 font-montserrat">Billing Address</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-600">{user.address.street}</p>
                  <p className="text-gray-600">
                    {user.address.city}, {user.address.state} {user.address.zip}
                  </p>
                  <p className="text-gray-600">{user.address.country}</p>
                  <button className="mt-4 text-red-600 hover:text-red-800 text-sm font-medium">
                    Edit Billing Address
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
