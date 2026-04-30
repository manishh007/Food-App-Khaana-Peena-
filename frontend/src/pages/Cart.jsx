import { useEffect, useState, useContext } from "react";
import { getCart, removeFromCart, updateCart } from "../api/api";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { placeOrder } from "../api/api";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getCart().then((data) => {
            setCart(data.items || []);
        });
    }, []);

    const handleRemove = async (id) => {
        const data = await removeFromCart(id);

        // 🔥 FULL replace (no merge)
        setCart(data.items.map(item => ({
            ...item,
            product: { ...item.product }
        })));
        refreshCart();
        console.log("After remove:", data.items);
    };

    const handleIncrease = async (item) => {
        const newQty = item.quantity + 1;

        await updateCart(item.product._id, newQty);

        const updated = await getCart();
        setCart(updated.items);
    };

    const handleDecrease = async (item) => {
        if (item.quantity === 1) return;

        const newQty = item.quantity - 1;

        await updateCart(item.product._id, newQty);

        const updated = await getCart();
        setCart(updated.items);
    };

    const handleOrder = async () => {
        const res = await placeOrder();

        alert("Order placed successfully 🎉");

        setCart([]);       // clear UI
        refreshCart();     // sync products page
    };

    const navigate = useNavigate();

    const { refreshCart } = useContext(CartContext);


    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

            <button
                onClick={() => navigate("/products")}
                className="mb-4 text-blue-500"
            >
                ⬅ Back
            </button>

            {cart.length === 0 && (
                <p className="text-gray-500">Cart is empty</p>
            )}

            <div className="space-y-4">
                {cart.map((item) => (
                    <div
                        key={item.product._id}
                        className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                    >
                        <div>
                            <h3 className="font-semibold">{item.product.name}</h3>
                            <p className="text-gray-500">₹ {item.product.price}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleDecrease(item)}
                                className="px-3 py-1 bg-gray-200 rounded"
                            >
                                -
                            </button>

                            <span>{item.quantity}</span>

                            <button
                                onClick={() => handleIncrease(item)}
                                className="px-3 py-1 bg-gray-200 rounded"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={() => handleRemove(item.product._id)}
                            className="text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={handleOrder}
                className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
                Place Order
            </button>
        </div>
    );
}