export default function UserList() {
    const users = [
        {
            user_id: 1,
            full_name: "Nguyễn Văn Admin",
            email: "admin@milkstore.com",
            phone: "0909123456",
            role_name: "Admin", // Giả định đã join bảng role
            created_at: "2023-01-15T08:00:00Z",
            is_deleted: 0, // 0: Active
        },
        {
            user_id: 2,
            full_name: "Trần Thị Khách Hàng",
            email: "client.tran@gmail.com",
            phone: "0912345678",
            role_name: "Khách hàng",
            created_at: "2023-06-20T14:30:00Z",
            is_deleted: 0,
        },
        {
            user_id: 3,
            full_name: "Lê Văn Vi Phạm",
            email: "baduser@yahoo.com",
            phone: "0987654321",
            role_name: "Khách hàng",
            created_at: "2023-08-10T09:15:00Z",
            is_deleted: 1, // 1: Deleted/Banned
        },
        {
            user_id: 4,
            full_name: "Phạm Thị Staff",
            email: "staff.pham@milkstore.com",
            phone: "0933445566",
            role_name: "Nhân viên",
            created_at: "2023-02-01T08:00:00Z",
            is_deleted: 0,
        },
    ];

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1C1917] shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed text-left">
                    {/* --- HEADER TABLE --- */}
                    <thead className="bg-[#F5F2EB] dark:bg-stone-800/50 border-b border-stone-200 dark:border-stone-700">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[25%]">
                                Thông tin cá nhân
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[15%]">
                                Số điện thoại
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[15%]">
                                Vai trò
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[15%]">
                                Ngày đăng ký
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[15%]">
                                Trạng thái
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider w-[15%] text-right">
                                Hành động
                            </th>
                        </tr>
                    </thead>

                    {/* --- BODY TABLE --- */}
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                        {users.map((user, index) => (
                            <tr
                                key={index}
                                className="group hover:bg-[#FAF9F6] dark:hover:bg-stone-800/30 transition-colors duration-200"
                            >
                                {/* 1. Avatar + Tên + Email */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {/* Avatar circle mock từ chữ cái đầu */}
                                        <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 flex items-center justify-center text-stone-600 dark:text-stone-300 font-bold text-sm shrink-0 shadow-sm">
                                            {user.full_name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-stone-700 dark:text-stone-200 leading-tight">
                                                {user.full_name}
                                            </span>
                                            <span className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* 2. Số điện thoại */}
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium text-stone-600 dark:text-stone-300 font-mono tracking-tight">
                                        {user.phone}
                                    </span>
                                </td>

                                {/* 3. Vai trò (Role) */}
                                <td className="px-6 py-4">
                                    {/* Logic màu sắc đơn giản cho Role */}
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${user.role_name === 'Admin'
                                            ? 'bg-purple-50 text-purple-700 border-purple-100'
                                            : user.role_name === 'Nhân viên'
                                                ? 'bg-blue-50 text-blue-700 border-blue-100'
                                                : 'bg-stone-50 text-stone-600 border-stone-100'
                                            }`}
                                    >
                                        {user.role_name}
                                    </span>
                                </td>

                                {/* 4. Ngày đăng ký */}
                                <td className="px-6 py-4">
                                    <span className="text-sm text-stone-500 dark:text-stone-400">
                                        {new Date(user.created_at).toLocaleDateString('vi-VN')}
                                    </span>
                                </td>

                                {/* 5. Trạng thái (Active/Deleted) */}
                                <td className="px-6 py-4">
                                    {user.is_deleted === 1 ? (
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border bg-red-50 text-red-600 border-red-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70"></span>
                                            Đã khóa
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border bg-emerald-50 text-emerald-700 border-emerald-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70"></span>
                                            Hoạt động
                                        </span>
                                    )}
                                </td>

                                {/* 6. Hành động */}
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