const BASE_URL = "https://khaana-peena.onrender.com";

export const loginUser = async (data) => {
    const res = await fetch(`${BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

export const getProducts = async () => {
    const res = await fetch(`${BASE_URL}/api/products`);
    return res.json();
};

export const addToCart = async (productId) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            productId,
            quantity: 1
        })
    });

    const data = await res.json();  // 🔥 important
    return data;                    // 🔥 return updated cart
};

export const getCart = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/cart`, {
        headers: {
            "Authorization": token
        }
    });

    return res.json();
};

export const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
            "Authorization": token
        }
    });


    return res.json();
};

export const updateCart = async (productId, quantity) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/cart`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ productId, quantity })
    });

    return res.json();
};

export const placeOrder = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
            "Authorization": token
        }
    });

    return res.json();
};