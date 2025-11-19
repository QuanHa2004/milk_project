export default function PromotionList() {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Mã giảm giá</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Giá trị</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Đơn hàng tối thiểu</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Ngày bắt đầu</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Ngày kết thúc</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Người tạo</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {[
                            {
                                code: "SUMMER20",
                                type: "20%",
                                value: "500.000",
                                start: "2024-06-01",
                                end: "2024-08-31",
                                status: "Active",
                                creator: "admin_jane",
                            }
                        ].map((item, i) => (
                            <tr
                                key={i}
                                className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                            >
                                <td className="px-4 py-2 font-medium">{item.code}</td>
                                <td className="px-4 py-2">{item.type}</td>
                                <td className="px-4 py-2">{item.value}</td>
                                <td className="px-4 py-2">{item.start}</td>
                                <td className="px-4 py-2">{item.end}</td>
                                <td className="px-4 py-2">{item.status}</td>
                                <td className="px-4 py-2">{item.creator}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}