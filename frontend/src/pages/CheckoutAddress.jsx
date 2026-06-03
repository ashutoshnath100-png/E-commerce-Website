import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

export default function CheckoutAddress() {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        }

        const saveAddress = async (e) => {
            await api.post("/address/add", { ...form, userId });
            navigate("/checkout");
        }

        return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-2xl mx-auto">

      <div className="bg-white rounded-2xl shadow-lg p-8">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Delivery Address 📍
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter your shipping details
        </p>

        <div className="space-y-5">
          {Object.keys(form).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {key}
              </label>

              <input
                name={key}
                value={form[key]}
                placeholder={`Enter ${key}`}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
          ))}

          <button
            onClick={saveAddress}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Save Address
          </button>
        </div>

      </div>
    </div>
  </div>
);
}