import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "",
});

    const loadProducts = async () => {
        const res = await api.get(
            `/products?search=${search}&category=${category}`
        );

        setProducts(res.data.products);
    };

    useEffect(() => {
        loadProducts();
    }, [search, category]);

    const addToCart = async (productId) => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setToast({
        show: true,
        message: "Please login first",
        type: "error",
      });

      setTimeout(() => {
        setToast({
          show: false,
          message: "",
          type: "",
        });
      }, 1000);

      return;
    }

    const cartRes = await api.post("/cart/add", {
      userId,
      productId,
    });

    const total = cartRes.data.cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));

    setToast({
      show: true,
      message: "✅ Item added to cart successfully",
      type: "success",
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);

  } catch (error) {
    console.log(error);

    setToast({
      show: true,
      message: "❌ Failed to add item",
      type: "error",
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "",
      });
    }, 1000);
  }
};

 return (
  <div className="min-h-screen bg-slate-50 pt-24">
    {toast.show && (
  <div
    className={`fixed top-24 right-5 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-white font-medium transition-all duration-500
      ${
        toast.type === "success"
          ? "bg-gradient-to-r from-green-500 to-emerald-600"
          : "bg-gradient-to-r from-red-500 to-rose-600"
      }`}
  >
    <span className="text-xl">
      {toast.type === "success" ? "✅" : "❌"}
    </span>

    <span>{toast.message}</span>
  </div>
)}

    {/* Categories */}
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-3 mb-6">

        <button
          onClick={() => setCategory("")}
          className="px-5 py-2 bg-white rounded-full shadow hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          All
        </button>

        <button
          onClick={() => setCategory("Laptop")}
          className="px-5 py-2 bg-white rounded-full shadow hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          💻 Laptop
        </button>

        <button
          onClick={() => setCategory("Mobile")}
          className="px-5 py-2 bg-white rounded-full shadow hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          📱 Mobile
        </button>

        <button
          onClick={() => setCategory("Earbuds")}
          className="px-5 py-2 bg-white rounded-full shadow hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          🎧 Earbuds
        </button>

      </div>
    </div>

    {/* Search */}
    <div className="max-w-5xl mx-auto px-4 mb-10">
      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-200 rounded-xl px-5 py-3"
        >
          <option value="">All Categories</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
          <option value="Earbuds">Earbuds</option>
        </select>

      </div>
    </div>

    {/* Heading */}
    <div className="max-w-7xl mx-auto px-4 mb-6">
      <h2 className="text-3xl font-bold text-gray-800">
        Trending Products
      </h2>

      <p className="text-gray-500 mt-1">
        Explore our latest collection
      </p>
    </div>

    {/* Product Grid */}
    <div className="max-w-7xl mx-auto px-4 pb-12">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {products?.map((product) => (
          <div
            key={product._id}
            className="
              bg-white
              rounded-3xl
              overflow-hidden
              border
              border-gray-100
              shadow-md
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-300
              group
            "
          >
            <Link to={`/product/${product._id}`}>

              {/* Image */}
              <div className="relative bg-white overflow-hidden">

                <img
                  src={product.image}
                  alt={product.title}
                  className="
                    w-full
                    h-64
                    object-contain
                    p-4
                    group-hover:scale-105
                    transition-transform
                    duration-500
                  "
                />

                <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                  New
                </span>

              </div>

              {/* Content */}
              <div className="px-5 pb-5">

                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                  {product.title}
                </h3>

                <div className="flex items-center mt-2">
                  <span className="text-yellow-400">
                    ⭐⭐⭐⭐⭐
                  </span>

                  <span className="ml-2 text-sm text-gray-500">
                    4.8
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{product.price}
                  </span>

                  <span className="text-gray-400 line-through text-sm">
                    ₹{Math.round(product.price * 1.2)}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {product.category}
                </p>

              </div>

            </Link>

            {/* Button */}
            <div className="px-5 pb-5">
              <button
                onClick={() => addToCart(product._id)}
                className="
                  w-full
                  bg-gradient-to-r
                  from-blue-600
                  to-indigo-600
                  hover:from-indigo-600
                  hover:to-blue-600
                  text-white
                  py-3
                  rounded-2xl
                  font-semibold
                  transition-all
                  duration-300
                "
              >
                Add To Cart
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  </div>
);
}