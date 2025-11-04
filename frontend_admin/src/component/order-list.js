export default function OrderList(){
    return(
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-2/12">Mã đơn hàng</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-2/12">Khách hàng</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-2/12">Ngày đặt</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-2/12">Tổng tiền</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-2/12">Trạng thái</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-2/12">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            {
                                id: "#M-12345",
                                name: "John Doe",
                                date: "2023-10-27",
                                total: "125.000 VND",
                                status: "Delivered",
                                statusClass: "bg-success/20 text-green-800 dark:text-success",
                            },
                        ].map((order) => (
                            <tr
                                key={order.id}
                                className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {order.id}
                                </td>
                                <td className="px-4 py-2 font-medium">{order.name}</td>
                                <td className="px-4 py-2">{order.date}</td>
                                <td className="px-4 py-2">{order.total}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`${order.statusClass}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <button className="font-medium text-primary dark:text-primary/90 hover:underline">
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}