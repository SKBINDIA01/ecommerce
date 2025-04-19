"use client";

import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingBag, Minus, Plus } from "lucide-react"
import { useCart, calculateShipping, calculateTotal } from "@/lib/cart"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCart()
  
  // Calculate costs
  const subtotal = getSubtotal()
  const shipping = calculateShipping(subtotal)
  const total = calculateTotal(subtotal)
  
  // For legacy code reference, keeping old mock items commented out
  /*const cartItems = [
    {
      id: 1,
      name: "Urban Graphic Tee",
      price: 29.99,
      quantity: 1,
      size: "M",
      color: "Black",
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 5,
      name: "Classic Hoodie",
      price: 49.99,
      quantity: 1,
      size: "L",
      color: "Navy",
      image: "/placeholder.svg?height=200&width=150",
    },
  ]*/

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 font-montserrat">YOUR CART</h1>

      {items.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16 relative">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">
                              Size: {item.size} | Color: {item.color}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="border border-gray-300 px-2 py-1 rounded-l-md hover:bg-gray-100"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            className="border-t border-b border-gray-300 w-12 py-1 text-center focus:outline-none"
                            readOnly
                          />
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="border border-gray-300 px-2 py-1 rounded-r-md hover:bg-gray-100"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Link href="/categories" className="flex items-center text-red-600 hover:text-red-800">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Continue Shopping
              </Link>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Update Cart</button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 font-montserrat">ORDER SUMMARY</h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-4">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-4">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Enter code"
                    />
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-r-md">
                      Apply
                    </button>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md text-center transition-colors"
                >
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2 font-montserrat">YOUR CART IS EMPTY</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/categories"
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-colors"
          >
            START SHOPPING
          </Link>
        </div>
      )}
    </div>
  )
}
