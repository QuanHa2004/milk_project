import { useEffect, useState } from "react";

export default function CategoryList() {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/admin/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategoryList(data);
            });
    }, []);

    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tên danh mục</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Số lượng sản phẩm</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {categoryList.length > 0 ? (
                            categoryList.map((category, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                                >
                                    <td className="px-4 py-2 font-medium">
                                        {category.category_name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {category.quantity}
                                    </td>
                                    <td className="px-4 py-2 text-blue-600 cursor-pointer hover:underline">
                                        Xem chi tiết
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-4 py-4 text-center text-gray-500">
                                    Không có danh mục nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}