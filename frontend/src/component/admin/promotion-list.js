import { useEffect, useState } from "react";

export default function PromotionList() {
    const [promotionList, setPromotionList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/admin/promotions")
            .then((res) => res.json())
            .then((data) => {
                setPromotionList(data);
            });
    }, []);
    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Mã giảm giá</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Thể loại giảm</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Giá trị giảm tối đa</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Đơn hàng tối thiểu</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Bắt đầu</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Kết thúc</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Người tạo</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {promotionList.length > 0 ? (
                            promotionList.map((promotion, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                                >
                                    <td className="px-4 py-2 font-medium">
                                        {promotion.promo_code}
                                    </td>
                                    <td className="px-4 py-2">
                                        {promotion.discount_type === "percent" ? (
                                            <span className="px-4 py-2">
                                                {Number(promotion.discount_value).toLocaleString('vi-VN')}%
                                            </span>
                                        ) : (
                                            <span className="px-4 py-2">
                                                {Number(promotion.discount_value).toLocaleString('vi-VN')}VND
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {Number(promotion.max_discount_value).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="px-4 py-2">
                                        {Number(promotion.min_order_value).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="px-4 py-2">
                                        {new Date(promotion.start_date).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-4 py-2">
                                        {new Date(promotion.end_date).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-4 py-2">
                                        {promotion.is_active ? (
                                            <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                                                Ngưng hoạt động
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                                                Đang hoạt động
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {promotion.created_by}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                                    Không có mã giảm giá nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}