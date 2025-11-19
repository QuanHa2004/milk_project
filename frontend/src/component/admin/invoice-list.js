export default function InvoiceList() {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Mã phiếu</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Nhà cung cấp</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tổng tiền</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {[
                            {
                                code: "SUMMER20",
                                type: "Vinamilk",
                                value: "500.000",
                                creator: "Xem chi tiết",
                            }
                        ].map((item, i) => (
                            <tr
                                key={i}
                                className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                            >
                                <td className="px-4 py-2 font-medium">{item.code}</td>
                                <td className="px-4 py-2">{item.type}</td>
                                <td className="px-4 py-2">{item.value}</td>
                                <td className="px-4 py-2">{item.creator}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}