import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate} from "react-router";

export default function Cart() {
    const userId = localStorage.getItem('userId');
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

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
  <div className="min-h-screen bg-slate-100 pt-32 pb-10 px-4">

    <div className="max-w-7xl mx-auto">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Shopping Cart 🛒
        </h1>

        <p className="text-slate-500 mt-2">
          Review your items before checkout
        </p>
      </div>

      {cart.items.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

          <div className="text-7xl mb-4">🛒</div>

          <h2 className="text-3xl font-bold text-slate-800 mb-3">
            Your Cart is Empty
          </h2>

          <p className="text-slate-500 mb-8">
            Looks like you haven't added any products yet.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
          </button>

        </div>

      ) : (

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">

            {cart.items.map((item) => (

              <div
                key={item.productId._id}
                className="bg-white rounded-3xl shadow-md hover:shadow-lg transition p-5"
              >

                <div className="flex flex-col md:flex-row items-center gap-6">

                  {/* Product Image */}
                  <div className="bg-slate-100 rounded-2xl p-3">
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-28 h-28 object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">

                    <h2 className="text-2xl font-semibold text-slate-800">
                      {item.productId.title}
                    </h2>

                    <p className="text-slate-500 mt-2">
                      ₹{item.productId.price}
                    </p>

                    <button
                      onClick={() => removeItem(item.productId._id)}
                      className="mt-3 text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove Item
                    </button>

                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        updateQty(
                          item.productId._id,
                          item.quantity - 1
                        )
                      }
                      className="w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 transition"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg w-8 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(
                          item.productId._id,
                          item.quantity + 1
                        )
                      }
                      className="w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 transition"
                    >
                      +
                    </button>

                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{(
                        item.productId.price * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Order Summary */}
          <div>

            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-28">

              <h2 className="text-3xl font-bold text-slate-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between text-slate-600">
                  <span>Total Items</span>
                  <span>{cart.items.length}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Delivery</span>
                  <span className="text-green-600">
                    Free
                  </span>
                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

              </div>

              <button
                onClick={() => navigate("/checkout-address")}
                className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold transition"
              >
                Proceed To Checkout
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  </div>
);
}
