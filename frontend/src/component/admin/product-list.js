import { useEffect, useState } from "react";

export default function ProductList() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/admin/products")
            .then((res) => res.json())
            .then((data) => {
                setProductList(data);
            })
            .catch((error) => {
                console.error("Không có dữ liệu", error);
                setProductList([]);
            })
            ;
    }, []);
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
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {productList.length > 0 ? (
                            productList.map((product, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                                >
                                    <td className="px-4 py-2 font-medium">
                                        {product.product_name}
                                    </td>
                                    <td className="px-4 py-2 font-medium">
                                        {Number(product.price).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.quantity}
                                    </td>
                                    <td className="px-4 py-2">
                                        {new Date(product.expiration_date).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.is_deleted ? (
                                            <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                                                Đã ẩn
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                                                Hiển thị
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.is_hot ? (
                                            <span className="text-orange-500 font-bold">Có</span>
                                        ) : (
                                            <span className="text-gray-400">Không</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-blue-600 cursor-pointer hover:underline">
                                        Xem chi tiết
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                                    Không có sản phẩm nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}