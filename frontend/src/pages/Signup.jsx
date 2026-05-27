import { useState } from "react";
import api from "../api/axios";

export default function Signup() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [msg,setMsg] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/signup", form);
            setMsg(response.data.message);
        }
        catch(err) {
            setMsg(err.response?.data?.message || "An error occurred");
        }
    }

    return (
        <div className="flex items-center min-h-screen bg-gray-100 px-4">
            <div className="flex-1 max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Create Account</h2>
                {msg && <p className="text-red-500 mb-4">{msg}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                    name='name'
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                    name='email'
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                    name='password'
                    type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}