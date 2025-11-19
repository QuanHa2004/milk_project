export default function PromotionList() {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tên sản phẩm</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Giá</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Số lượng</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Ngày hết hạn</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Bán chạy</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}