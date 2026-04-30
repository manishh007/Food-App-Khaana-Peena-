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
            <h2>Products</h2><br /><br />

            <button onClick={() => navigate("/cart")}>
                Go to Cart
            </button>

            {products.map((p) => (
                <div key={p._id}>
                    <h3>{p.name}</h3>
                    <p>₹ {p.price}</p>

                    {cartMap[p._id] !== undefined && (
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