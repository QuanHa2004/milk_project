import SideBar from "../component/side-bar";

import PromotionList from "../component/category-list";
export default function CategoryManagement() {
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
                    Quản lý danh mục
                  </p>
                </div>
                <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition">
                  <span className="material-symbols-outlined text-base">add</span>
                  <span >Thêm danh mục</span>
                </button>
              </div>

               <div className="mb-6">
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
              </div>

              <PromotionList />

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
