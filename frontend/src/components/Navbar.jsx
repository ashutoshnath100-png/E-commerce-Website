import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link, useNavigate } from 'react-router';

export default function Navbar() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
    const loadCart = async () => {
        try {
            if (
                !userId ||
                userId === "undefined" ||
                userId === "null"
            ) {
                setCartCount(0);
                return;
            }

            const res = await api.get(`/cart/${userId}`);

            const total =
                res.data.cart?.items?.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                ) || 0;

            setCartCount(total);
        } catch (error) {
            console.log("Cart Error:", error);
            setCartCount(0);
        }
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
        window.removeEventListener("cartUpdated", loadCart);
    };
}, [userId]);

    const logout = () => {
        localStorage.clear();
        setCartCount(0);
        navigate('/login');
    }

    return (
  <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
      >
        Winzoo Store
      </Link>

      <div className="flex items-center gap-6">
        
        <Link
          to="/cart"
          className="relative text-2xl hover:scale-110 transition"
        >
          🛒

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {!userId ? (
          <>
            <Link
              to="/login"
              className="font-medium hover:text-blue-600 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  </nav>
);
}