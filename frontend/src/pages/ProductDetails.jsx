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
        <div className="p-6 max-w-3xl mx-auto">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-cover mb-4 rounded-md"
            />
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-800 mt-4">{product.description}</p>
            <p className="text-gray-600">${product.price}</p>

            <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Add to Cart
            </button>
        </div>
    );
}