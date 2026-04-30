import { createContext, useState, useEffect } from "react";
import { getCart } from "../api/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartMap, setCartMap] = useState({});

    const refreshCart = async () => {
        const data = await getCart();

        const map = {};
        data.items?.forEach((item) => {
            map[item.product._id] = item.quantity;
        });

        setCartMap(map);
    };

    useEffect(() => {
        refreshCart();
    }, []);

    return (
        <CartContext.Provider value={{ cartMap, refreshCart }}>
            {children}
        </CartContext.Provider>
    );
};
