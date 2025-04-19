'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Truck } from 'lucide-react';

interface OrderDetails {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  orderItems: any[];
  shippingName?: string;
  shippingEmail?: string;
}

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError('Order ID not found');
      setLoading(false);
      return;
    }

    async function fetchOrderDetails() {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError('Error fetching order details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 mx-auto bg-gray-200 rounded mb-4"></div>
          <div className="h-24 w-2/3 mx-auto bg-gray-200 rounded mb-4"></div>
          <div className="h-12 w-1/2 mx-auto bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-8 font-montserrat">Order Error</h1>
        <p className="text-red-600 mb-6">{error || 'Order not found'}</p>
        <Link 
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md text-center transition-colors inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Format date
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="text-green-500 h-16 w-16" />
          </div>
          <h1 className="text-3xl font-bold font-montserrat mb-2">ORDER SUCCESSFUL!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
            <div>
              <h2 className="text-xl font-bold font-montserrat">ORDER #{order.id.slice(0, 8)}</h2>
              <p className="text-gray-600">Placed on {orderDate}</p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <Truck className="h-4 w-4 mr-1" />
              {order.status}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {order.orderItems.map((item: any) => (
              <div key={item.id} className="flex justify-between">
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{order.total > 1000 ? 'Free' : formatPrice(99)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {order.shippingName && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold font-montserrat mb-4">SHIPPING DETAILS</h2>
            <p><strong>Name:</strong> {order.shippingName}</p>
            {order.shippingEmail && <p><strong>Email:</strong> {order.shippingEmail}</p>}
          </div>
        )}

        <div className="text-center mt-8">
          <Link 
            href="/"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md text-center transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
