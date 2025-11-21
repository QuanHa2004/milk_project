import { useEffect, useState } from "react";

export default function PromotionList() {
    const [orderList, setOrderList] = useState([]);

        useEffect(() => {
            fetch("http://localhost:8000/admin/orders")
                .then((res) => res.json())
                .then((data) => {
                    setOrderList(data);
                });
        }, []);

    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Mã đơn hàng</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tên khách hàng</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Ngày đặt</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tổng tiền</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {orderList.length > 0 ? (
                            orderList.map((order, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                                >
                                    <td className="px-4 py-2 font-medium">
                                        {order.order_id}
                                    </td>
                                    <td className="px-4 py-2 font-medium">
                                        {order.full_name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {new Date(order.order_date).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-4 py-2">
                                        {Number(order.total_amount).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="px-4 py-2">
                                        {order.status === "pending" ? (
                                            <span className="px-4 py-2">
                                                Đang xử lý
                                            </span>
                                        ) : order.status === "confirmed" ? (
                                            <span className="px-4 py-2">
                                                Đã xác nhận
                                            </span>
                                        ) : order.status === "confirmed" ? (
                                            <span className="px-4 py-2">
                                                Đang vận chuyển
                                            </span>
                                        ) : (
                                            <span className="px-4 py-2">
                                                Đã hủy
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-blue-600 cursor-pointer hover:underline">
                                        Xem chi tiết
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                                    Không có đơn hàng nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}