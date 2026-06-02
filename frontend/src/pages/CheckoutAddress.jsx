import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

export default function CheckoutAddress() {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        }

        const saveAddress = async (e) => {
            await api.post("/address/add", { ...form, userId });
            navigate("/checkout");
        }

        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Delivery Address</h1>
                {
                    Object.keys(form).map((key) => (
                        <input 
                            key={key}
                            name={key}
                            placeholder={key}
                            onChange={handleChange}
                            className="w-full mb-4 p-2 border rounded"
                        />
                    )
                    )
                }
                <button onClick={saveAddress} className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Save Address
                </button>
            </div>
        )
}