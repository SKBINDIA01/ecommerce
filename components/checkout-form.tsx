'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart, calculateShipping, calculateTotal } from '@/lib/cart';
import { CreditCard, Truck } from 'lucide-react';
import Image from 'next/image';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart, getSubtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  // Calculate costs
  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal);
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    state: '',
    country: 'IN',
    phone: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };
  
  const initiateRazorpayPayment = async (orderId: string) => {
    try {
      // Get order details from API
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create payment');
      }
      
      const data = await response.json();
      
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }
      
      // Create Razorpay options
      const options = {
        key: data.keyId,
        amount: data.amount * 100, // amount in paise
        currency: data.currency,
        name: 'Urban Fynix',
        description: 'Purchase from Urban Fynix',
        order_id: data.razorpayOrderId,
        handler: async function (response: any) {
          // Handle successful payment
          await verifyPayment(orderId, response);
        },
        prefill: data.preferences.prefill,
        config: data.preferences.config,
        theme: {
          color: '#dc2626',
        },
      };
      
      // Open Razorpay checkout
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (error) {
      console.error('Payment initiation error:', error);
      alert('Payment initialization failed. Please try again.');
      setLoading(false);
    }
  };
  
  const verifyPayment = async (orderId: string, response: any) => {
    try {
      const verifyResponse = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        }),
      });
      
      const data = await verifyResponse.json();
      
      if (data.success) {
        // Clear cart and redirect to success page
        clearCart();
        router.push(`/order-success?id=${orderId}`);
      } else {
        alert('Payment verification failed. Please contact support.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      alert('Payment verification failed. Please try again.');
      setLoading(false);
    }
  };
  
  const createOrder = async () => {
    if (items.length === 0) return;
    
    setLoading(true);
    
    try {
      // Create order in database
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          shipping: {
            email: formData.email,
            name: `${formData.firstName} ${formData.lastName}`,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
            phone: formData.phone,
          },
          total,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      
      const order = await response.json();
      
      // Handle payment based on selected method
      if (paymentMethod === 'card') {
        // For card/UPI payment, initiate Razorpay
        await initiateRazorpayPayment(order.id);
      } else {
        // For COD, just clear cart and redirect to success page
        clearCart();
        router.push(`/order-success?id=${order.id}`);
      }
    } catch (error) {
      console.error('Order creation error:', error);
      alert('Failed to create your order. Please try again.');
      setLoading(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createOrder();
  };
  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Checkout Form */}
      <div className="w-full lg:w-2/3">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 font-montserrat">SHIPPING INFORMATION</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State/Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              >
                <option value="IN">India</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 font-montserrat">PAYMENT METHOD</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                className="h-4 w-4 text-red-600 focus:ring-red-500"
                checked={paymentMethod === 'cod'}
                onChange={() => handlePaymentMethodChange('cod')}
              />
              <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Cash on Delivery
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                className="h-4 w-4 text-red-600 focus:ring-red-500"
                checked={paymentMethod === 'card'}
                onChange={() => handlePaymentMethodChange('card')}
              />
              <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Credit/Debit Card or UPI
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 font-montserrat">ORDER SUMMARY</h2>

          <div className="space-y-4 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.size && `Size: ${item.size}`} 
                      {item.color && item.size && ' | '} 
                      {item.color && `Color: ${item.color}`}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-sm font-medium">₹{item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            type="submit"
            onClick={handleSubmit}
            disabled={loading || items.length === 0}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md text-center transition-colors mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "PROCESSING..." : "PLACE ORDER"}
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            By placing your order, you agree to our{" "}
            <a href="/terms" className="text-red-600 hover:underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-red-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
