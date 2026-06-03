import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useParams } from 'react-router';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const loadProduct = async () => {
        const res = await api.get("/products/");
        const p = res.data.products.find((item) => item._id === id);
        setProduct(p);
    };

    useEffect(() => {
        loadProduct();
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

  return (
  <div className="min-h-screen bg-slate-50 pt-24 pb-10">

    <div className="max-w-7xl mx-auto px-4">

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="grid lg:grid-cols-2 gap-10 p-8">

          {/* Product Image */}
          <div>

            <div className="bg-slate-100 rounded-3xl p-6 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[500px] object-contain hover:scale-105 transition duration-500"
              />
            </div>

          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">

            <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold w-fit">
              {product.category}
            </span>

            <h1 className="text-5xl font-bold text-slate-800 mt-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mt-5">
              <span className="text-yellow-400 text-xl">
                ⭐⭐⭐⭐⭐
              </span>

              <span className="text-gray-500">
                4.8 Rating
              </span>
            </div>

            <div className="flex items-center gap-4 mt-6">

              <span className="text-5xl font-bold text-blue-600">
                ₹{product.price}
              </span>

              <span className="text-xl text-gray-400 line-through">
                ₹{Math.round(product.price * 1.2)}
              </span>

              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                20% OFF
              </span>

            </div>

            <div className="mt-6">
              <span className="text-green-600 font-semibold text-lg">
                ● In Stock
              </span>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                Product Description
              </h2>

              <p className="text-gray-600 leading-8 text-lg">
                {product.description}
              </p>
            </div>

            {/* Product Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="bg-slate-100 rounded-2xl p-4">
                🚚 Free Delivery
              </div>

              <div className="bg-slate-100 rounded-2xl p-4">
                🔄 Easy Returns
              </div>

              <div className="bg-slate-100 rounded-2xl p-4">
                🛡️ Warranty Included
              </div>

              <div className="bg-slate-100 rounded-2xl p-4">
                💳 Secure Payment
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}