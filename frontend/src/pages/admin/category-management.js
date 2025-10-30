import SideBar from "../../component/side-bar";

export default function CategoryManagement() {
  return (
    <div className="relative flex min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex flex-row min-h-screen">
          <SideBar />

          {/* ===== 📦 Main Content ===== */}
          <main className="flex-1 p-8">
            <div className="w-full max-w-7xl mx-auto">
              {/* Page Heading */}
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex flex-col gap-2">
                  <p className="text-[#333333] dark:text-white text-4xl font-black leading-tight tracking-tight">
                    Manage Product Categories
                  </p>
                  <p className="text-[#617c89] dark:text-gray-400 text-base font-normal leading-normal">
                    Add, edit, or remove product categories for the store.
                  </p>
                </div>
                <button className="flex items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                  <span className="material-symbols-outlined text-lg">add</span>
                  <span className="truncate">Add New Category</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <label className="flex flex-col min-w-40 h-12 w-full max-w-lg">
                  <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-white dark:bg-background-dark border border-[#E0E0E0] dark:border-gray-700">
                    <div className="text-[#617c89] flex items-center justify-center pl-4">
                      <span className="material-symbols-outlined">search</span>
                    </div>
                    <input
                      className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#333333] dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-[#617c89] px-2 text-base font-normal leading-normal"
                      placeholder="Find a category by name"
                      value=""
                      readOnly
                    />
                  </div>
                </label>
              </div>

              {/* Table */}
              <div className="w-full">
                <div className="flex overflow-hidden rounded-lg border border-[#E0E0E0] dark:border-gray-700 bg-white dark:bg-black/20">
                  <table className="flex-1">
                    <thead className="bg-white dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-4 text-left text-[#333333] dark:text-gray-300 text-sm font-medium leading-normal">
                          Category Name
                        </th>
                        <th className="px-6 py-4 text-left text-[#333333] dark:text-gray-300 text-sm font-medium leading-normal">
                          Number of Products
                        </th>
                        <th className="px-6 py-4 text-left text-[#333333] dark:text-gray-300 text-sm font-medium leading-normal">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Whole Milk", count: 5 },
                        { name: "Skim Milk", count: 3 },
                        { name: "Organic Milk", count: 8 },
                        { name: "Flavored Milk", count: 4 },
                      ].map((cat, i) => (
                        <tr
                          key={i}
                          className="border-t border-t-[#E0E0E0] dark:border-t-gray-700 hover:bg-background-light/50 dark:hover:bg-background-dark/50 transition-colors"
                        >
                          <td className="h-[72px] px-6 py-2 text-[#333333] dark:text-white text-sm font-normal leading-normal">
                            {cat.name}
                          </td>
                          <td className="h-[72px] px-6 py-2 text-[#617c89] dark:text-gray-400 text-sm font-normal leading-normal">
                            {cat.count} Products
                          </td>
                          <td className="h-[72px] px-6 py-2 text-sm font-medium leading-normal">
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1.5 text-[#617c89] dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-lg">edit</span>
                                <span>Edit</span>
                              </button>
                              <button className="flex items-center gap-1.5 text-danger/80 dark:text-danger/90 hover:text-danger transition-colors">
                                <span className="material-symbols-outlined text-lg">delete</span>
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center mt-6">
                <span
                  
                  className="flex size-10 items-center justify-center text-[#333333] dark:text-gray-400 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    
                    className={`text-sm font-${
                      n === 1 ? "bold" : "normal"
                    } flex size-10 items-center justify-center ${
                      n === 1
                        ? "text-white bg-primary rounded-full"
                        : "text-[#333333] dark:text-gray-300 rounded-full hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                    } mx-1`}
                  >
                    {n}
                  </span>
                ))}
                <span
                  
                  className="flex size-10 items-center justify-center text-[#333333] dark:text-gray-400 hover:bg-background-light dark:hover:bg-background-dark rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
