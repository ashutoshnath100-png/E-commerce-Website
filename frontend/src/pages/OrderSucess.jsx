import { useNavigate, useParams } from "react-router";

export default function OrderSucess() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">

    <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-2xl w-full text-center">

      {/* Success Icon */}
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-5xl">✅</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Order Placed Successfully!
      </h1>

      <p className="text-gray-600 text-lg mb-8">
        Thank you for shopping with us.
        Your order has been confirmed and is being processed.
      </p>

      {/* Order ID Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-8">

        <p className="text-sm text-gray-500 mb-2">
          Order ID
        </p>

        <p className="font-bold text-blue-600 break-all">
          {id}
        </p>

      </div>

      {/* Order Status */}
      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="bg-green-50 p-4 rounded-xl">
          <div className="text-2xl mb-2">📦</div>
          <p className="text-sm font-medium">
            Confirmed
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-xl">
          <div className="text-2xl mb-2">🚚</div>
          <p className="text-sm font-medium">
            Processing
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="text-2xl mb-2">🏠</div>
          <p className="text-sm font-medium">
            Delivery Soon
          </p>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">

        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
        >
          Continue Shopping
        </button>

        <button
          onClick={() => window.print()}
          className="border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Print Receipt
        </button>

      </div>

    </div>
  </div>
);
}