import { useEffect, useState, useContext } from "react";
import { getProducts, addToCart } from "../api/api";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Products() {
    const [products, setProducts] = useState([]);
    const { cartMap, refreshCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts().then(setProducts);
        refreshCart(); // 🔥 always sync
    }, []);

    const handleAdd = async (id) => {
        await addToCart(id);
        refreshCart(); // 🔥 update global state
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Products</h2>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => navigate("/cart")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Cart
                </button>

                <button
                    onClick={() => navigate("/orders")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    Orders
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((p) => (
                    <div
                        key={p._id}
                        className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                    >
                        <h3 className="text-lg font-semibold">{p.name}</h3>
                        <p className="text-gray-500">₹ {p.price}</p>

                        {cartMap[p._id] !== undefined && (
                            <p className="text-green-600 text-sm mt-1">
                                In cart: {cartMap[p._id]}
                            </p>
                        )}

                        <button
                            onClick={() => handleAdd(p._id)}
                            className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}