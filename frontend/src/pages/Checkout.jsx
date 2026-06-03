import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

export default function Checkout() {
    const userId = localStorage.getItem('userId');
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate("/");
            return;
        }
        api.get(`/cart/${userId}`).then((res) => setCart(res.data.cart));
        api.get(`/address/${userId}`).then((res) => {
            console.log("Addresses:", res.data);
            setAddress(res.data);
            setSelectedAddress(res.data[0]);
        });
    }, []);

    if (!cart) {
        return <div>Loading...</div>;
    }

    const total = cart.items.reduce((sum, i) => sum + i.quantity * i.productId.price, 0);

    
    const placeOrder = async () => {
    try {
        if (!selectedAddress) {
            alert("Please select an address");
            return;
        }

        const res = await api.post('/order/place', {
            userId,
            address: selectedAddress
        });

        navigate(`/order-success/${res.data.orderId}`);

    } catch (err) {
        console.log("Status:", err.response?.status);
        console.log("Error:", err.response?.data);
    }
};

   return (
  <div className="min-h-screen bg-slate-100 pt-32 pb-10 px-4">

    <div className="max-w-7xl mx-auto">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Checkout 🛍️
        </h1>

        <p className="text-slate-500 mt-2">
          Select your delivery address and place your order
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Address Section */}
        <div className="lg:col-span-2">

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              Select Delivery Address
            </h2>

            <div className="space-y-5">

              {address.map((addr) => (
                <label
                  key={addr._id}
                  className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedAddress?._id === addr._id
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-200 hover:border-green-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-3">

                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress?._id === addr._id}
                      onChange={() => setSelectedAddress(addr)}
                      className="mt-1"
                    />

                    <div>

                      <h3 className="text-xl font-bold text-slate-800">
                        {addr.fullName}
                      </h3>

                      <p className="text-slate-600 mt-3">
                        {addr.addressLine}
                      </p>

                      <p className="text-slate-600">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>

                      <p className="text-slate-500 mt-2">
                        📞 {addr.phone}
                      </p>

                    </div>

                  </div>
                </label>
              ))}

            </div>

          </div>

        </div>

        {/* Order Summary */}
        <div>

          <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-28">

            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between text-slate-600">
                <span>Items Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-semibold">
                  Free
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total Amount</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300"
            >
              Place Order (Cash On Delivery)
            </button>

            <p className="text-center text-sm text-slate-500 mt-4">
              🔒 Safe & Secure Checkout
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}