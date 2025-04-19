"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    frontImageUrl: string;
  };
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  createdAt: string;
}

interface Order {
  id: string;
  userId: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
  };
  orderItems: OrderItem[];
  payment: Payment | null;
}

export default function OrderDetails() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("");

  // Fetch order data
  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`/api/admin/orders/${orderId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        
        const data = await response.json();
        setOrder(data);
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching order:', error);
        alert('Failed to load order. Please try again.');
        router.push('/admin/orders');
      } finally {
        setLoading(false);
      }
    }
    
    if (orderId) {
      fetchOrder();
    }
  }, [orderId, router]);

  const handleStatusChange = async () => {
    if (!order || status === order.status) return;
    
    setUpdating(true);
    
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      
      const updatedOrder = await response.json();
      setOrder(updatedOrder);
      alert('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-500">Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-500">Order not found</div>
      </div>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleString();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Order {order.id}</h2>
              <span className="text-gray-500">{formattedDate}</span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <span className="text-gray-500 text-sm">Status</span>
                <div className="flex items-center mt-1">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full mr-2
                    ${
                      order.status === "DELIVERED"
                        ? "bg-green-100 text-green-800"
                        : order.status === "SHIPPED"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "PROCESSING"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "CANCELLED"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                  
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                  
                  <button
                    onClick={handleStatusChange}
                    disabled={updating || status === order.status}
                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm disabled:opacity-50"
                  >
                    Update
                  </button>
                </div>
              </div>
              
              <div>
                <span className="text-gray-500 text-sm">Payment</span>
                <div className="mt-1">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full
                    ${
                      order.payment?.status === "COMPLETED"
                        ? "bg-green-100 text-green-800"
                        : order.payment?.status === "FAILED"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.payment?.status || "PENDING"}
                  </span>
                </div>
              </div>
              
              <div>
                <span className="text-gray-500 text-sm">Total Amount</span>
                <div className="mt-1 font-semibold">₹{order.total.toFixed(2)}</div>
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-700 mb-3">Items</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.orderItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded object-cover"
                              src={item.product.frontImageUrl}
                              alt={item.product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        ₹{item.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <div className="mb-4">
              <span className="text-gray-500 text-sm">Email</span>
              <div className="font-medium">{order.user.email}</div>
            </div>
            
            <div className="mb-4">
              <span className="text-gray-500 text-sm">User ID</span>
              <div className="font-medium">{order.userId}</div>
            </div>
          </div>
          
          {order.payment && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
              
              <div className="mb-4">
                <span className="text-gray-500 text-sm">Payment ID</span>
                <div className="font-medium">{order.payment.id}</div>
              </div>
              
              {order.payment.razorpayOrderId && (
                <div className="mb-4">
                  <span className="text-gray-500 text-sm">Razorpay Order ID</span>
                  <div className="font-medium">{order.payment.razorpayOrderId}</div>
                </div>
              )}
              
              {order.payment.razorpayPaymentId && (
                <div className="mb-4">
                  <span className="text-gray-500 text-sm">Razorpay Payment ID</span>
                  <div className="font-medium">{order.payment.razorpayPaymentId}</div>
                </div>
              )}
              
              <div className="mb-4">
                <span className="text-gray-500 text-sm">Amount</span>
                <div className="font-medium">₹{order.payment.amount.toFixed(2)}</div>
              </div>
              
              <div className="mb-4">
                <span className="text-gray-500 text-sm">Date</span>
                <div className="font-medium">
                  {new Date(order.payment.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => router.push('/admin/orders')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
}
