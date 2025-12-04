export default function FeedbackList() {
    const complaints = [
        {
            id: "CP-2023001",
            user_name: "Nguyễn Văn An",
            user_avatar: "A",
            email: "an.nguyen@example.com",
            subject: "Sữa tươi bị chua khi vừa mở nắp",
            description: "Tôi vừa nhận hàng sáng nay, mở chai sữa tươi ra thì thấy có mùi chua và bị vón cục...",
            status: "Chờ xử lý", // Chờ xử lý, Đang xử lý, Đã giải quyết, Từ chối
            created_at: "2023-10-25T08:30:00Z"
        },
        {
            id: "CP-2023002",
            user_name: "Trần Thị Bích",
            user_avatar: "B",
            email: "bich.tran@gmail.com",
            subject: "Giao thiếu 2 lốc sữa chua",
            description: "Đơn hàng của tôi gồm 1 thùng sữa tươi và 2 lốc sữa chua, nhưng shipper chỉ đưa thùng sữa.",
            status: "Đang xử lý",
            created_at: "2023-10-24T14:15:00Z"
        },
        {
            id: "CP-2023003",
            user_name: "Lê Hoàng Nam",
            user_avatar: "L",
            email: "nam.le@yahoo.com",
            subject: "Shipper thái độ không tốt",
            description: "Shipper gọi điện lớn tiếng và ném hàng vào sân nhà tôi.",
            status: "Đã giải quyết",
            created_at: "2023-10-20T09:00:00Z"
        },
        {
            id: "CP-2023004",
            user_name: "Phạm Thu Hà",
            user_avatar: "H",
            email: "ha.pham@company.vn",
            subject: "Yêu cầu đổi địa chỉ giao hàng",
            description: "Tôi đặt nhầm địa chỉ công ty, muốn đổi sang địa chỉ nhà riêng.",
            status: "Từ chối",
            created_at: "2023-10-25T10:00:00Z"
        }
    ];

    // Helper: Màu sắc cho Status
    const getStatusStyle = (status) => {
        switch (status) {
            case "Đã giải quyết":
                return "bg-emerald-100 text-emerald-800 border-emerald-200";
            case "Chờ xử lý":
                // Đã chỉnh thành màu đỏ theo yêu cầu
                return "bg-red-100 text-red-800 border-red-200";
            case "Đang xử lý":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "Từ chối":
                return "bg-stone-100 text-stone-600 border-stone-200";
            default:
                return "bg-gray-100 text-gray-600 border-gray-200";
        }
    };

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1C1917] shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed text-left">
                    <thead className="bg-[#F5F2EB] dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[120px]">Mã KN</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[250px]">Khách hàng</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[350px]">Vấn đề</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[150px]">Trạng thái</th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[100px] text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                        {complaints.map((item, index) => (
                            <tr key={index} className="group hover:bg-[#FAF9F6] dark:hover:bg-stone-800/30 transition-colors duration-200">
                                {/* ID */}
                                <td className="px-6 py-4">
                                    <span className="text-xs font-mono font-bold text-stone-500">{item.id}</span>
                                    <p className="text-[10px] text-stone-400 mt-1">{new Date(item.created_at).toLocaleDateString('vi-VN')}</p>
                                </td>

                                {/* Khách hàng */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 font-bold text-xs shrink-0">
                                            {item.user_avatar}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-stone-700 dark:text-stone-200 truncate">{item.user_name}</p>
                                            <p className="text-xs text-stone-500 truncate">{item.email}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Vấn đề */}
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-stone-800 dark:text-stone-100 truncate" title={item.subject}>{item.subject}</p>
                                    <p className="text-xs text-stone-500 line-clamp-1 mt-0.5" title={item.description}>{item.description}</p>
                                </td>

                                {/* Trạng thái */}
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusStyle(item.status)}`}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70"></span>
                                        {item.status}
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