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