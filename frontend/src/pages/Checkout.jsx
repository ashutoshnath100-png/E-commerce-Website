import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

export default function Checkout() {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [address, setAddress] = useState([]);
    const [cart, setCart] = useState(null);

    useEffect(() => {
        api.get(`/cart/${userId}`).then((res) => setCart(res.data.cart));
        api.get(`/address/${userId}`).then((res) => setAddress(res.data));
    }, []);

    if (!cart) {
        return <div>Loading...</div>;
    }

    const total = cart.items.reduce((sum, i) => sum + i.quantity * i.productId.price, 0);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            <h2 className="text-xl font-semibold mb-4">Select Address</h2>
            {
                address.map((addr) => (
                    <div key={addr._id} className="border p-4 mb-4 rounded">
                        <p>{addr.fullName}</p>
                        <p>{addr.phone}</p>
                        <p>{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</p>
                    </div>
                ))
            }
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p>Total Amount: ${total}</p>

            <button className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                Place Order (COD)
            </button>
        </div>
    )
}