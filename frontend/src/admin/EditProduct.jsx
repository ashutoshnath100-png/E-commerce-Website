import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: ""
    });

    const allowedFields = ["title", "description", "price", "category", "image", "stock"];

    const loadProduct = async () => {
        const res = await api.get(`/products`);
        const product = res.data.find(p => p.id === parseInt(id));
        setForm(product);
    }

    useEffect(() => {
        loadProduct();
    }, []);


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.put(`/products/update/${id}`, form);
        alert("Product updated successfully!");
        navigate("/admin/products");
    }

    return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Edit Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {allowedFields.map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
              {key}
            </label>

            <input
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Update Product
        </button>
      </form>
    </div>
  </div>
);
}
