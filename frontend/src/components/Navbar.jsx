import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
    const navigate = useNavigate();
    const { cartMap } = useContext(CartContext);

    const role = localStorage.getItem("role");

    const cartCount = Object.values(cartMap).reduce(
        (sum, qty) => sum + qty,
        0
    );

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center rounded-xl mb-6">
            <h1
                onClick={() => navigate("/products")}
                className="text-2xl font-bold cursor-pointer"
            >
                🍔 Khaana Peena
            </h1>

            <div className="flex items-center gap-4">

                {role !== "admin" && (
                    <>
                        <button
                            onClick={() => navigate("/products")}
                            className="hover:text-blue-500"
                        >
                            Products
                        </button>

                        <button
                            onClick={() => navigate("/cart")}
                            className="relative hover:text-blue-500"
                        >
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => navigate("/orders")}
                            className="hover:text-blue-500"
                        >
                            Orders
                        </button>
                    </>
                )}

                {role === "admin" && (
                    <button
                        onClick={() => navigate("/admin")}
                        className="hover:text-blue-500"
                    >
                        Dashboard
                    </button>
                )}

                <button
                    onClick={handleLogout}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}