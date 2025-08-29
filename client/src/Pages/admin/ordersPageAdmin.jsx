import axios from "axios";
import { useEffect, useState } from "react";
import Paginator from "../../assets/components/paginator";

export default function OrdersPageAdmin() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        setLoading(true);

        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/orders/${page}/${limit}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                setOrders(res.data.orders);
                setTotalPages(res.data.totalPages);
                setLoading(false);
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [page, limit]);

    return (
        <div className="w-full h-full flex flex-col p-6">
            {loading ? (
                <div className="w-full h-full flex justify-center items-center text-xl font-semibold">
                    Loading Orders...
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                        <table className="w-full border-collapse border border-gray-300">
                            {/* Table Head */}
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="p-3 text-left font-semibold border-b border-gray-300">Order ID</th>
                                    <th className="p-3 text-left font-semibold border-b border-gray-300">Customer Name</th>
                                    <th className="p-3 text-left font-semibold border-b border-gray-300">Email</th>
                                    <th className="p-3 text-left font-semibold border-b border-gray-300">Address</th>
                                    <th className="p-3 text-left font-semibold border-b border-gray-300">Phone</th>
                                    <th className="p-3 text-left font-semibold border-b border-gray-300">Status</th>
                                    <th className="p-3 text-left font-semibold border-b border-gray-300">Date</th>
                                    <th className="p-3 text-right font-semibold border-b border-gray-300">Total</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((order, index) => (
                                        <tr key={index} className="border-b border-gray-300">
                                            <td className="p-3">{order.orderId}</td>
                                            <td className="p-3">{order.name}</td>
                                            <td className="p-3">{order.email}</td>
                                            <td className="p-3">{order.address}</td>
                                            <td className="p-3">{order.phone}</td>
                                            <td className="p-3">{order.status}</td>
                                            <td className="p-3">{new Date(order.date).toLocaleDateString()}</td>
                                            <td className="p-3 text-right font-medium text-gray-800">Rs {order.total}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center p-6 text-gray-500">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-4">
                        <Paginator
                            currentPage={page}
                            totalPages={totalPages}
                            setCurrentPage={setPage}
                            limit={limit}
                            setlimit={setLimit}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
