import { useState } from "react";
import { signupUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {
        const data = await signupUser({
            name,
            email,
            password,
        });

        if (data._id || data.message === "User registered successfully") {
            alert("Signup successful 🎉");
            navigate("/login");
        } else {
            alert(data.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account 🚀
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Signup to start ordering delicious food
                    </p>
                </div>

                <div className="space-y-5">

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-black"
                    />

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
                        onClick={handleSignup}
                        className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                    >
                        Signup
                    </button>

                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?
                    <span
                        onClick={() => navigate("/")}
                        className="text-black font-semibold cursor-pointer ml-1"
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
}