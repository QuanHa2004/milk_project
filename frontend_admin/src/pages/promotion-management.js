import SideBar from "../component/side-bar";
import { useNavigate } from "react-router-dom";

const promotions = [
  {
    code: "SUMMER20",
    type: "Percentage",
    value: "20%",
    start: "2024-06-01",
    end: "2024-08-31",
    status: "Active",
    creator: "admin_jane",
    statusColor: "green",
  },
];

export default function PromotionManagement() {
  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-screen">
      <SideBar />
      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header row */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <p className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
              Promotion Management
            </p>
            <button onClick={()=>navigate('/admin/create-promotion')} className="flex items-center gap-2 rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition">
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span>Create New Promotion</span>
            </button>
          </div>

          {/* Table container */}
          <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-4 md:p-6">
            {/* Search bar */}
            <div className="mb-4">
              <label className="flex flex-col min-w-40 h-12 w-full md:max-w-md">
                <div className="flex w-full items-stretch rounded-lg h-full">
                  <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-4 rounded-l-lg border-y border-l border-gray-200 dark:border-gray-700">
                    <span className="material-symbols-outlined text-xl">search</span>
                  </div>
                  <input
                    className="flex-1 rounded-r-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark h-full px-4 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    placeholder="Filter by code or creator..."
                  />
                </div>
              </label>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    {[
                      "Promotion Code",
                      "Type",
                      "Value",
                      "Start Date",
                      "End Date",
                      "Status",
                      "Creator",
                      "Actions",
                    ].map((title) => (
                      <th
                        key={title}
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {promotions.map((promo) => (
                    <tr
                      key={promo.code}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-background-light dark:hover:bg-background-dark/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                        {promo.code}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                        {promo.type}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                        {promo.value}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                        {promo.start}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                        {promo.end}
                      </td>
                      <td className="px-4 py-3">
                        <div
                          className={`inline-flex items-center gap-2 rounded-full bg-${promo.statusColor}-100 dark:bg-${promo.statusColor}-900/40 px-3 py-1 text-xs font-medium text-${promo.statusColor}-700 dark:text-${promo.statusColor}-300`}
                        >
                          <div
                            className={`size-2 rounded-full bg-${promo.statusColor}-500`}
                          ></div>
                          {promo.status}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                        {promo.creator}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
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
        </div>
      </main>
    </div>
  );
}
