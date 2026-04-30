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
            alert("Login success");
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
        <div>
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            /><br />

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}