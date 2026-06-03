import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const response = await api.get("/products");
        setProducts(response.data.products);
    }

    const deletedProduct = async (id) => {
        try {
            await api.delete(`/products/delete/${id}`);
            alert ("Product deleted successfully");
            loadProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    useEffect(() => {
        loadProducts();
    }, [])


return (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Product Management
          </h2>
          <p className="text-gray-500 mt-1">
            Manage all products from one place
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="mt-4 md:mt-0 bg-green-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-green-700 transition"
        >
          + Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Product Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Stock
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {product.title}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    ₹{product.price}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 10
                          ? "bg-green-100 text-green-700"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock} Items
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/admin/products/update/${product._id}`}
                      className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mr-2"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deletedProduct(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500"
                  >
                    No Products Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
}