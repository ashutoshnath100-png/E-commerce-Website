import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function Signup() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [msg,setMsg] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/signup", form);
            setMsg(response.data.message);
        }
        catch(err) {
            setMsg(err.response?.data?.message || "An error occurred");
        }
    }

    return (
  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">

    <div className="w-full max-w-md">

      <div className="bg-white rounded-3xl shadow-2xl p-8">

        {/* Logo/Icon */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🚀</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">
            Join Winzoo Store and start shopping
          </p>

        </div>

        {msg && (
          <div className="bg-red-100 border border-red-200 text-red-600 p-3 rounded-xl mb-4 text-sm text-center">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition duration-300"
          >
            Create Account
          </button>

        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-600 font-semibold ml-1 hover:text-blue-800 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

      </div>

    </div>

  </div>
);
}