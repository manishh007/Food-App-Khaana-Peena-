import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../api/api";

export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        getAllOrders().then(setOrders);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdate = async (id, status) => {
        await updateOrderStatus(id, status);
        fetchOrders(); // refresh
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">⚙️ Admin Dashboard</h2>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div className="bg-white p-4 rounded-xl shadow">
                        <p className="text-sm text-gray-500">ID: {order._id}</p>

                        <p className="font-semibold">
                            Status:
                            <span className={`ml-2 ${order.status === "Pending" ? "text-yellow-500" :
                                    order.status === "Preparing" ? "text-blue-500" :
                                        "text-green-500"
                                }`}>
                                {order.status}
                            </span>
                        </p>

                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => handleUpdate(order._id, "Preparing")}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Preparing
                            </button>

                            <button
                                onClick={() => handleUpdate(order._id, "Delivered")}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Delivered
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}