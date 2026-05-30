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
        <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">Winzoo Store</Link>

            <div className="flex items-center gap-4">
                    <Link to="/cart" className="relative text-xl">
                    ^@^
                    {
                     cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                     )
                    }
                    </Link>
                    {
                        !userId ? (
                            <>
                            <Link to="/login" className="text-lg">Login</Link>
                            <Link to="/signup" className="text-lg">Signup</Link>
                            </>
                        ): (
                            <button onClick={logout} className="text-lg">Logout</button>
                        )
                    }
                
            </div>
        </nav>
    )
}