import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCart } from "../api/api";
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
        setCart([...data.items]);
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

    return (
        <div>
            <h2>Your Cart</h2>

            {cart.map((item) => (
                <div key={item.product._id || item.product}>
                    <h3>{item.product.name}</h3>
                    <p>₹ {item.product.price}</p>
                    <p >
                        Qty: {item.quantity}
                        <button onClick={() => handleIncrease(item)}> + </button>
                        <button onClick={() => handleDecrease(item)}> - </button>
                    </p>

                    <button onClick={() => handleRemove(item.product._id)}>
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}