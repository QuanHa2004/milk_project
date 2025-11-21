import { useEffect, useState } from "react";

export default function InvoiceList() {
    const [invoiceList, setInvoiceList] = useState([]);

        useEffect(() => {
            fetch("http://localhost:8000/admin/invoices")
                .then((res) => res.json())
                .then((data) => {
                    setInvoiceList(data);
                });
        }, []);

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
                        {invoiceList.length > 0 ? (
                            invoiceList.map((invoice, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                                >
                                    <td className="px-4 py-2 font-medium">
                                        {invoice.invoice_id}
                                    </td>
                                    <td className="px-4 py-2">
                                        {invoice.supplier_name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {Number(invoice.total_amount).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="px-4 py-2 text-blue-600 cursor-pointer hover:underline">
                                        Xem chi tiết
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                                    Không có phiếu nhập nào nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}