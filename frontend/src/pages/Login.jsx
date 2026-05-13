import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const data = await loginUser({ email, password });

        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            if (data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/products");
            }
        } else {
            alert("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back 👋
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Login to continue ordering your favorite food
                    </p>
                </div>

                <div className="space-y-5">

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black"
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black"
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition duration-300"
                    >
                        Login
                    </button>

                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Demo credentials available for testing
                </p>

            </div>
        </div>
    );
}