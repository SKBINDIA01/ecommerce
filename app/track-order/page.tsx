export default function TrackOrderPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center font-montserrat">TRACK YOUR ORDER</h1>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <p className="text-gray-600 mb-6">
          Enter your order number and email address to track the status of your order.
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Order Number
            </label>
            <input
              type="text"
              id="orderNumber"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              placeholder="e.g. UF12345678"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              placeholder="The email you used for your order"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
          >
            TRACK ORDER
          </button>
        </form>

        {/* Order Status (Hidden by default, shown after form submission) */}
        <div className="mt-8 hidden">
          <h2 className="text-xl font-bold mb-4 font-montserrat">ORDER #UF12345678</h2>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Order Placed</h3>
                <p className="text-sm text-gray-500">June 15, 2023 at 10:30 AM</p>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Order Confirmed</h3>
                <p className="text-sm text-gray-500">June 15, 2023 at 11:45 AM</p>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">Order Processed</h3>
                <p className="text-sm text-gray-500">June 16, 2023 at 9:15 AM</p>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                •
              </div>
              <div>
                <h3 className="font-semibold">Order Shipped</h3>
                <p className="text-sm text-gray-500">June 17, 2023 at 2:30 PM</p>
                <p className="text-sm text-blue-600 mt-1">Tracking Number: 1Z999AA10123456784</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold mr-3">
                •
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">Order Delivered</h3>
                <p className="text-sm text-gray-500">Estimated: June 20, 2023</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p className="text-gray-600">
              John Doe
              <br />
              123 Main Street
              <br />
              Apt 4B
              <br />
              New York, NY 10001
              <br />
              United States
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
