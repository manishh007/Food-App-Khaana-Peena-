import { useEffect, useState } from "react";
import { getMyOrders } from "../api/api";
import Navbar from "../components/Navbar";

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getMyOrders().then(setOrders);
    }, []);

    const getStatusColor = (status) => {
        if (status === "Pending") return "bg-yellow-100 text-yellow-700";
        if (status === "Preparing") return "bg-blue-100 text-blue-700";
        if (status === "Delivered") return "bg-green-100 text-green-700";

        return "bg-gray-100 text-gray-700";
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-5xl mx-auto">

                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-800">
                            My Orders 📦
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Track all your food orders here
                        </p>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                            <p className="text-gray-500 text-lg">
                                No orders yet 🍔
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6"
                                >
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                                        <div>
                                            <p className="text-sm text-gray-400">
                                                Order ID
                                            </p>

                                            <p className="font-mono text-sm break-all text-gray-700">
                                                {order._id}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-400">
                                                Total
                                            </p>

                                            <p className="text-xl font-bold text-gray-800">
                                                ₹ {order.totalAmount}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-400 mb-1">
                                                Status
                                            </p>

                                            <span
                                                className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}