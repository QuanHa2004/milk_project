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
                    Thêm sản phẩm mới
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-background-dark dark:border dark:border-gray-700 rounded-xl shadow-sm">
                <form className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-[#111618] dark:text-white mb-4">
                      Nhập thông tin đầy đủ để thêm sản phẩm mới
                    </h3>

                    <div className="grid grid-cols-1 gap-6">
                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Tên sản phẩm
                        </p>
                        <input
                          className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                          placeholder="Nhập tên sản phẩm"
                        />
                      </label>

                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Tên danh mục
                        </p>
                        <input
                          className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                          placeholder="Nhập tên danh mục"
                        />
                      </label>

                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Tên nhà sản xuất
                        </p>
                        <input
                          className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                          placeholder="Nhập tên nhà sản xuất"
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

                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Hình ảnh
                        </p>
                        <input
                          className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                          placeholder="Nhập đường dẫn hình ảnh"
                        />
                      </label>

                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Mô tả
                        </p>
                        <input
                          className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                          placeholder="Mô tả sản phẩm"
                        />
                      </label>

                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Thành phần sản phẩm
                        </p>
                        <input
                          className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                          placeholder=""
                        />
                      </label>

                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Hướng dẫn sử dụng
                        </p>
                        <input
                          className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                          placeholder=""
                        />
                      </label>

                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Cách bảo quản
                        </p>
                        <input
                          className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                          placeholder=""
                        />
                      </label>

                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Thông tin dinh dưỡng
                        </p>
                        <input
                          className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                          placeholder=""
                        />
                      </label>

                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Xuất xứ
                        </p>
                        <input
                          className="form-input w-full rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                          placeholder=""
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 pt-4">
                    <button type="button" className="h-12 px-6 border rounded-lg">
                      Hủy
                    </button>
                    <button type="submit" className="h-12 px-6 bg-primary text-white rounded-lg">
                      Thêm sản phẩm
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
