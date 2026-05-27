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
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {allowedFields.map((key) => (
                    allowedFields.includes(key) && (
                        <input
                            key={key}
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            placeholder={key}
                            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )
                ))}
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    Update Product
                </button>
            </form>
        </div>
    )
};
