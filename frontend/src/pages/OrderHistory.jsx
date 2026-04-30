import { useEffect, useState } from "react";
import { getMyOrders } from "../api/api";

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getMyOrders().then(setOrders);
    }, []);

    return (
        <div>
            <h2>My Orders</h2>

            {orders.map((order) => (
                <div key={order._id}>
                    <p>Order ID: {order._id}</p>
                    <p>Status: {order.status}</p>
                    <p>Total: ₹ {order.totalAmount}</p>
                </div>
            ))}
        </div>
    );
}