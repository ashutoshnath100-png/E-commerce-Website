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
    <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6">Product List</h2>
        <Link to="/admin/products/add" className="mb-4 inline-block bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200">
            Add New Product
        </Link>
    {/* </div> */}

    <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead>
            <tr className="bg-gray-100">
                <th className="border-b px-4 py-2 text-left">Title</th>
                <th className="border-b px-4 py-2 text-left">Price</th>
                <th className="border-b px-4 py-2 text-left">Stock</th>
                <th className="border-b px-4 py-2 text-left">Actions</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product) => (
                <tr key={product._id} className=" text-center hover:bg-gray-50">
                    <td className="border-b px-4 py-2">{product.title}</td>
                    <td className="border-b px-4 py-2">${product.price}</td>
                    <td className="border-b px-4 py-2">{product.stock}</td>
                    <td className="border-b px-4 py-2">
                        <Link to={`/admin/products/update/${product._id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                            Edit
                        </Link>
                        <button onClick={() => deletedProduct(product._id)} className="text-red-500 hover:text-red-700">
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
    </div>
)
}