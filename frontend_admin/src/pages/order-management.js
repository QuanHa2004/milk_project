import OrderList from "../component/order-list";
import SideBar from "../component/side-bar";

export default function OrderManagement() {
  return (
    <div className="relative flex min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex flex-row min-h-screen">
          <SideBar />
          <main className="flex-1 p-8">
            <div className="w-full max-w-7xl mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex min-w-72 flex-col gap-1">
                  <p className="text-gray-900 dark:text-white text-3xl font-black">
                    Quản lý đơn hàng
                  </p>
                </div>


                <div className="flex gap-2">
                  <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition">
                    <span>Áp dụng bộ lọc</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition">
                    <span>Xóa bộ lọc</span>
                  </button>
                </div>
              </div>


              <div className="flex flex-wrap items-end gap-4 mb-6">
                <label className="flex flex-col min-w-40 h-12 w-full max-w-lg">
                  <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-white dark:bg-background-dark border border-[#E0E0E0] dark:border-gray-700">
                    <div className="text-[#617c89] flex items-center justify-center pl-4">
                      <span className="material-symbols-outlined">search</span>
                    </div>
                    <input
                      className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#333333] dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-[#617c89] px-2 text-base font-normal leading-normal"
                      placeholder="Tìm sản phẩm"
                      value=""
                      readOnly
                    />
                  </div>
                </label>
                <div className="min-w-[180px] ml-auto">
                  <label
                    htmlFor="status-filter"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                  >
                    Lọc theo trạng thái
                  </label>
                  <select
                    id="status-filter"
                    className="form-select w-full h-12 rounded-lg border-gray-200 dark:border-gray-600 bg-transparent dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-black dark:text-white"
                  >
                    <option>Tất cả trạng thái</option>
                    <option>Chờ xử lý</option>
                    <option>Đang xử lý</option>
                    <option>Đã gửi hàng</option>
                    <option>Đã giao hàng</option>
                  </select>
                </div>

                <div className="min-w-[180px]">
                  <label
                    htmlFor="date-filter"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                  >
                    Lọc theo ngày
                  </label>
                  <select
                    id="date-filter"
                    className="form-select w-full h-12 rounded-lg border-gray-200 dark:border-gray-600 bg-transparent dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-black dark:text-white"
                  >
                    <option>Tất cả ngày</option>
                    <option>7 ngày vừa qua</option>
                    <option>30 ngày vừa qua</option>
                  </select>
                </div>
              </div>
              <OrderList />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
