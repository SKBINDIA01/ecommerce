import { MessageCircle, Phone, Mail, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center font-montserrat">CUSTOMER SUPPORT</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold mb-2 font-montserrat">LIVE CHAT</h2>
          <p className="text-gray-600 mb-4">
            Chat with our support team in real-time. We're available Monday to Friday, 9am to 6pm.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors">
            START CHAT
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold mb-2 font-montserrat">CALL US</h2>
          <p className="text-gray-600 mb-4">Speak directly with our customer service team for immediate assistance.</p>
          <a
            href="tel:+11234567890"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors inline-block"
          >
            +1 (123) 456-7890
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold mb-2 font-montserrat">EMAIL</h2>
          <p className="text-gray-600 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
          <a
            href="mailto:support@urbanfynix.com"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors inline-block"
          >
            support@urbanfynix.com
          </a>
        </div>
      </div>

      {/* Live Chat Interface */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-red-600 text-white p-4">
          <h2 className="text-xl font-bold font-montserrat">LIVE CHAT SUPPORT</h2>
        </div>

        <div className="p-6">
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-gray-700 mb-2">
              Welcome to Urban Fynix support! Please fill out the form below to start a chat with our customer service
              team.
            </p>
            <p className="text-gray-700">
              Our support hours are Monday to Friday, 9am to 6pm EST. If you're contacting us outside these hours, we'll
              respond to your message on the next business day.
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Order Number (if applicable)
              </label>
              <input
                type="text"
                id="orderNumber"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                id="subject"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              >
                <option value="">Select a topic</option>
                <option value="order">Order Status</option>
                <option value="return">Returns & Exchanges</option>
                <option value="product">Product Information</option>
                <option value="payment">Payment Issues</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              START CHAT
            </button>
          </form>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center font-montserrat">FREQUENTLY ASKED QUESTIONS</h2>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-2 flex items-center font-montserrat">
              <HelpCircle className="h-5 w-5 text-red-600 mr-2" />
              How can I track my order?
            </h3>
            <p className="text-gray-600">
              You can track your order by visiting the "Track Order" page and entering your order number and email
              address. Alternatively, you can log in to your account to view the status of your orders.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-2 flex items-center font-montserrat">
              <HelpCircle className="h-5 w-5 text-red-600 mr-2" />
              What is your return policy?
            </h3>
            <p className="text-gray-600">
              We offer a 30-day return policy for all our products. Items must be in their original condition with tags
              attached. Please visit our Returns & Exchanges page for more information on how to initiate a return.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-2 flex items-center font-montserrat">
              <HelpCircle className="h-5 w-5 text-red-600 mr-2" />
              How long does shipping take?
            </h3>
            <p className="text-gray-600">
              Standard shipping typically takes 3-5 business days within the continental US. International shipping can
              take 7-14 business days depending on the destination. Express shipping options are available at checkout.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-2 flex items-center font-montserrat">
              <HelpCircle className="h-5 w-5 text-red-600 mr-2" />
              Do you offer size exchanges?
            </h3>
            <p className="text-gray-600">
              Yes, we offer free size exchanges. If you need a different size, please initiate a return and place a new
              order for the correct size. Once we receive your return, we'll refund your original purchase.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-2 flex items-center font-montserrat">
              <HelpCircle className="h-5 w-5 text-red-600 mr-2" />
              How do I apply a discount code?
            </h3>
            <p className="text-gray-600">
              You can apply a discount code during checkout. On the cart page, you'll find a field labeled "Discount
              Code" where you can enter your code and click "Apply" to see the discount reflected in your total.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Don't see your question here?</p>
          <Link
            href="/contact"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-colors inline-block"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </div>
  )
}
