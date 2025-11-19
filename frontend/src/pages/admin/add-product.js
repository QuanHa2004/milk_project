import SideBar from "../../component/admin/side-bar";

export default function AddProduct() {
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
                    Tạo mã giảm giá
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-background-dark dark:border dark:border-gray-700 rounded-xl shadow-sm">
                <form className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-[#111618] dark:text-white mb-4">
                      Nhập thông tin đầy đủ để tạo mã mới
                    </h3>

                    <div className="grid grid-cols-1 gap-6">
                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Mã giảm
                        </p>
                        <input
                          className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                          placeholder="e.g., FRESHMILK10"
                        />
                      </label>

                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Mô tả
                        </p>
                        <input
                          className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                          placeholder="e.g., FRESHMILK10"
                        />
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="flex flex-col min-w-40 flex-1">
                          <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                            Thể loại
                          </p>
                          <select className="rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary text-gray-800 dark:text-white outline-none">
                            <option value="">Chọn kiểu</option>
                            <option value="percentage">Phần trăm</option>
                            <option value="fixed">Cố định</option>
                          </select>
                        </label>

                        <label className="flex flex-col min-w-40 flex-1">
                          <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                            Giá trị giảm
                          </p>
                          <input
                            type="number"
                            className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                            placeholder="e.g., 10 or 5.00"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="flex flex-col">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">Ngày bắt đầu</p>
                        <input type="date" className="form-input rounded-lg border h-14 p-[15px]" />
                      </label>

                      <label className="flex flex-col">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">Ngày kết thúc</p>
                        <input type="date" className="form-input rounded-lg border h-14 p-[15px]" />
                      </label>
                    </div>

                    <div className="mt-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-5 w-5" />
                        <span>Kích hoạt</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="flex flex-col w-full">
                      <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">Người tạo</p>
                      <input
                        value="admin@milkco.com"
                        readOnly
                        className="form-input rounded-lg border h-14 p-[15px] bg-gray-100 dark:bg-gray-900 cursor-not-allowed"
                      />
                    </label>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <button type="button" className="h-12 px-6 border rounded-lg">
                      Hủy
                    </button>
                    <button type="submit" className="h-12 px-6 bg-primary text-white rounded-lg">
                      Tạo mã
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
