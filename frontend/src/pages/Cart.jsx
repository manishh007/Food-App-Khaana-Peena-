import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api/api";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getCart().then((data) => {
            setCart(data.items || []);
        });
    }, []);

    const handleRemove = async (id) => {
        await removeFromCart(id);
        const updated = await getCart();
        setCart(updated.items);
    };

    return (
        <div>
            <h2>Your Cart</h2>

            {cart.map((item) => (
                <div key={item.product._id}>
                    <h3>{item.product.name}</h3>
                    <p>₹ {item.product.price}</p>
                    <p>Qty: {item.quantity}</p>

                    <button onClick={() => handleRemove(item.product._id)}>
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}