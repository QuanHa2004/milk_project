export default function ManufacturerList() {
    const manufacturers = [
        {
            manufacturer_id: 1,
            manufacturer_name: "Vinamilk",
            email: "vinamilk@vinamilk.com.vn",
            phone: "1900 6066",
            address: "Số 10, Đường Tân Trào, Phường Tân Phú, Quận 7, TP.HCM",
            product_count: 42, // Mock: Số lượng sản phẩm đang kinh doanh
        },
        {
            manufacturer_id: 2,
            manufacturer_name: "TH True Milk",
            email: "cskh@thmilk.vn",
            phone: "1800 545440",
            address: "166 Nguyễn Thái Học, P. Quang Trung, TP. Vinh, Nghệ An",
            product_count: 28,
        },
        {
            manufacturer_id: 3,
            manufacturer_name: "Dutch Lady (Cô Gái Hà Lan)",
            email: "cskh@frieslandcampina.com",
            phone: "1800 1545",
            address: "Khu phố Bình Đức 1, Phường Lái Thiêu, TP. Thuận An, Bình Dương",
            product_count: 35,
        },
    ];

    return (
         <div className="w-full overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1C1917] shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed text-left">
                    <thead className="bg-[#F5F2EB] dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[25%]">Tên nhà sản xuất</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[20%]">Liên hệ</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[25%]">Địa chỉ</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[15%] text-center">Sản phẩm</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[15%] text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                        {manufacturers.map((item, index) => (
                            <tr key={index} className="group hover:bg-[#FAF9F6] dark:hover:bg-stone-800/30 transition-colors duration-200">
                                {/* Tên */}
                                <td className="px-6 py-4">
                                    <span className="font-semibold text-stone-700 dark:text-stone-200 block">
                                        {item.manufacturer_name}
                                    </span>
                                    <span className="text-xs text-stone-400">ID: #{item.manufacturer_id}</span>
                                </td>

                                {/* Liên hệ (Gộp Email & Phone) */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
                                            <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            <span className="font-mono text-xs">{item.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
                                            <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            <span className="truncate max-w-[150px]" title={item.email}>{item.email}</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Địa chỉ */}
                                <td className="px-6 py-4">
                                    <p className="text-sm text-stone-600 dark:text-stone-300 line-clamp-2" title={item.address}>
                                        {item.address}
                                    </p>
                                </td>

                                {/* Số lượng sản phẩm (Mock data) */}
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200">
                                        {item.product_count}
                                    </span>
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