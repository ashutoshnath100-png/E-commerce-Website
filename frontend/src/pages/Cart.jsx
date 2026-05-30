import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function Cart() {
    const userId = localStorage.getItem('userId');
    const [cart, setCart] = useState(null);

    // Load cart data
    const loadCart = async () => {
        if (!userId) return;
        const res = await api.get(`/cart/${userId}`);
        setCart(res.data.cart);
    };

    useEffect(() => {
        loadCart();
    }, []);

    const removeItem = async (productId) => {
        await api.delete('/cart/remove', {
            data: {
                userId,
                productId
            }
        });
        loadCart();
        window.dispatchEvent(new Event('cartUpdated'));
    };

    // Update item quantity
    const updateQty = async (productId, quantity) => {
        if (quantity === 0) {
            await removeItem(productId);
            return;
        }
        await api.post(`/cart/update`, { userId, productId, quantity });
        loadCart();
        window.dispatchEvent(new Event('cartUpdated'));
    }
    if (!cart) {
        return <div>Loading...</div>
    }

    const total = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            {
                cart.items.length === 0 ? (
                    <div>Your cart is empty.</div>
                ) : (
                    <div className="space-y-4">
                        {cart.items.map((item) => (
                            <div key={item.productId._id} className="flex items-center justify-between border-b pb-4">
                                <div className="flex items-center space-x-4">
                                    <img src={item.productId.image} alt={item.productId.title} className="w-16 h-16 object-cover rounded" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">{item.productId.title}</h2>
                                    <p className="text-gray-600">${item.productId.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button onClick={() => updateQty(item.productId._id, item.quantity - 1)} className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full">
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQty(item.productId._id, item.quantity + 1)} className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full">
                                        +
                                    </button>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">${(item.productId.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <button onClick={() => removeItem(item.productId._id)} className="text-red-500 hover:text-red-700">
                                    Remove
                                </button>
                            </div>
                        ))}

                        <div className="text-right mt-4">
                            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
