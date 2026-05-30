import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

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
                alert("Please login to add items to cart");
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

            alert("Item added to cart");
        } catch (error) {
            console.log(error);
            alert("Failed to add item");
        }
    };

    return (
        <div className="p-6">
            {/* search */}
            <div className="mb-4 flex gap-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-blue-500 rounded-md py-2 px-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* category filter */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-blue-500 rounded-md py-2 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Earbuds">Earbuds</option>
                </select>
            </div>

            {/* products grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="border border-blue-500 rounded-md p-4 hover:shadow-lg">
                    <Link to={`/product/${product._id}`}>
                    <img src={product.image} className="w-full h-48 object-cover mb-4 rounded-md" />
                        <h2 className="text-lg font-bold mt-2">{product.title}</h2>
                        <p className="text-gray-600">${product.price}</p>   
                    </Link>
                    <button
                    onClick={() => addToCart(product._id)}
                    className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Add to Cart
                </button>
                </div>
                ))}
                
            </div>
        </div>
    );
}