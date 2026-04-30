import { useEffect, useState } from "react";
import { getProducts, addToCart, getCart } from "../api/api";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [cartMap, setCartMap] = useState({});

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    useEffect(() => {
        getCart().then(data => {
            const map = {};
            data.items?.forEach(item => {
                map[item.product._id] = item.quantity;
            });
            setCartMap(map);
        });
    }, []);


    const handleAdd = async (id) => {
        const data = await addToCart(id); // 🔥 updated cart mil gaya

        const map = {};
        data.items?.forEach((item) => {
            map[item.product] = item.quantity;
        });

        setCartMap(map);
    };

    return (
        <div>
            <h2>Products</h2><br /><br />
            <button onClick={() => window.location.href = "/cart"}>
                Go to Cart
            </button>

            {products.map((p) => (
                <div key={p._id}>
                    <h3>{p.name}</h3>
                    <p>₹ {p.price}</p>

                    {/* 🔥 SHOW QUANTITY */}
                    {cartMap[p._id] && (
                        <p>In cart: {cartMap[p._id]}</p>
                    )}

                    <button onClick={() => handleAdd(p._id)}>
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}