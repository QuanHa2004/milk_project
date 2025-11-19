import SideBar from "../../component/admin/side-bar";

export default function NewInvoice() {
    return (
        <div className="relative flex min-h-screen">
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="ml-64 flex flex-row min-h-screen">
                    <SideBar />
                    <main className="flex-1 p-8">
                        <div className="w-full max-w-7xl mx-auto">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                                <div className="flex min-w-72 flex-col gap-1">
                                    <p className="text-gray-900 dark:text-white text-3xl font-black">
                                        Phiếu nhập hàng
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-background-dark dark:border dark:border-gray-700 rounded-xl shadow-sm">
                                <form className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#111618] dark:text-white mb-4">
                                            Nhập thông tin đầy đủ 
                                        </h3>

                                        <div className="grid grid-cols-1 gap-6">
                                            <label className="flex flex-col w-full">
                                                <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                                                    Nhà cung cấp
                                                </p>
                                                <input
                                                    className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                                                    placeholder="Nhập nhà cung cấp"
                                                />
                                            </label>

                                            <label className="flex flex-col w-full">
                                                <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                                                    Tên sản phẩm
                                                </p>
                                                <input
                                                    className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                                                    placeholder="Nhập sản phẩm nhập"
                                                />
                                            </label>

                                            <label className="flex flex-col w-full">
                                                <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                                                    Số lượng
                                                </p>
                                                <input
                                                    className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                                                    placeholder="Nhập số lượng"
                                                />
                                            </label>

                                            <label className="flex flex-col w-full">
                                                <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                                                    Giá
                                                </p>
                                                <input
                                                    className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                                                    placeholder="Nhập giá"
                                                />
                                            </label>

                                            <label className="flex flex-col">
                                                <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">Ngày hết hạn</p>
                                                <input type="date" className="form-input rounded-lg border h-14 p-[15px]" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4 pt-4">
                                        <button type="button" className="h-12 px-6 border rounded-lg">
                                            Hủy
                                        </button>
                                        <button type="submit" className="h-12 px-6 bg-primary text-white rounded-lg">
                                            Xác nhận
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
