import { useState } from "react";
import { forgotPassword } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const navigate = useNavigate();

    const handleReset = async () => {
        const data = await forgotPassword(email, newPassword);

        if (data.message) {
            alert(data.message);
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Reset Password
                </h2>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border rounded-xl"
                    />

                    <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-xl"
                    />

                    <button
                        onClick={handleReset}
                        className="w-full bg-black text-white py-3 rounded-xl"
                    >
                        Reset Password
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        try login again ?
                        <span
                            onClick={() => navigate("/")}
                            className="text-black font-semibold cursor-pointer ml-1"
                        >
                            Back
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}