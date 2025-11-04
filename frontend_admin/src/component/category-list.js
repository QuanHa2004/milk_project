import { useState, useEffect } from "react"
export default function PromotionList() {
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
            fetch("http://localhost:8000/categories")
                .then((res) => res.json())
                .then((data) => setCategoryList(data))
                .catch((err) => console.error("Không có sản phẩm", err));
        }, []);
    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-2/12">Danh mục</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-2/12">Số lượng sản phẩm</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-2/12">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {categoryList.map((item, i) => (
                            <tr
                                key={i}
                                className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                            >
                                <td className="px-4 py-2 font-medium">{item.category_name}</td>
                                <td className="px-4 py-2">{item.total_products}</td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-1.5 text-[#617c89] dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-lg">edit</span>
                                        </button>
                                        <button className="flex items-center gap-1.5 text-danger/80 dark:text-danger/90 hover:text-danger transition-colors">
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}