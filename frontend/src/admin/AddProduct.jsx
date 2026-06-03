import {useState} from "react";
import api from "../api/axios";
import { useNavigate} from "react-router";

export default function AddProduct() {
    const [form, setForm] = useState ({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    })


const navigate = useNavigate();

const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await api.post("/products/add", form);
        alert("Product added successfully!");
        navigate("/admin/products");
    } catch (error) {
        console.error("Error adding product:", error);
    }
}

return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {key}
            </label>

            <input
              type={key === "price" || key === "stock" ? "number" : "text"}
              name={key}
              placeholder={`Enter ${key}`}
              value={form[key]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  </div>
);
}