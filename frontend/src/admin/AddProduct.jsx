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

return(
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            {
                Object.keys(form).map((key) => (
                    <input key={key}
                    name={key}
                    placeholder={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))
}

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                Add Product
            </button>
        </form>
    </div>
)
}