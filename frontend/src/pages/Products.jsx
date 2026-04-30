import { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api/api";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    const handleAdd = async (id) => {
        const res = await addToCart(id);
        alert("Added to cart");
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
                    <button onClick={() => handleAdd(p._id)}>
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}