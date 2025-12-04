export default function SupplierList() {
    const suppliers = [
        {
            supplier_id: 1,
            supplier_name: "Công ty TNHH Phân Phối Sữa Việt",
            email: "sales@suaviet-dist.com",
            phone: "0909 123 456",
            address: "KCN Tân Bình, Phường Tây Thạnh, Quận Tân Phú, TP.HCM",
            last_import_date: "2023-11-20", // Mock: Dựa trên bảng invoice
            total_debt: 15000000 // Mock: Công nợ
        },
        {
            supplier_id: 2,
            supplier_name: "Đại lý Cấp 1 Hưng Thịnh",
            email: "hungthinh.milk@gmail.com",
            phone: "0988 777 666",
            address: "456 Quốc Lộ 1A, Bình Hưng Hòa B, Bình Tân",
            last_import_date: "2023-10-05",
            total_debt: 0
        },
    ];

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1C1917] shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed text-left">
                    <thead className="bg-[#F5F2EB] dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[25%]">Nhà cung cấp</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[20%]">Liên hệ</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[25%]">Địa chỉ kho</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[20%]">Lần nhập cuối</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[15%] text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                        {suppliers.map((item, index) => (
                            <tr key={index} className="group hover:bg-[#FAF9F6] dark:hover:bg-stone-800/30 transition-colors duration-200">
                                {/* Tên NCC */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <span className="font-semibold text-stone-700 dark:text-stone-200 block truncate max-w-[180px]" title={item.supplier_name}>
                                                {item.supplier_name}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Liên hệ */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-mono text-stone-600 dark:text-stone-300">{item.phone}</span>
                                        <span className="text-xs text-stone-400 truncate max-w-[150px]">{item.email}</span>
                                    </div>
                                </td>

                                {/* Địa chỉ */}
                                <td className="px-6 py-4">
                                    <span className="text-sm text-stone-600 dark:text-stone-300 line-clamp-2" title={item.address}>
                                        {item.address}
                                    </span>
                                </td>

                                {/* Thông tin nhập hàng (Mock) */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-stone-700 dark:text-stone-200">
                                            {new Date(item.last_import_date).toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                </td>

                                {/* Hành động */}
                                <td className="px-6 py-4 text-right">
                                    <button className="text-sm font-medium text-amber-700 hover:text-amber-900 hover:underline transition-colors">
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}