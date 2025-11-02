import React from "react";
import SideBar from "../component/side-bar";

export default function OrderManagement() {
  return (
    <div className="relative flex min-h-screen">
      <SideBar />
      <div className="relative flex w-full min-h-screen">
        <main className="flex-1 p-8">
          <div className="w-full max-w-7xl mx-auto">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3 mb-6">
              <h1 className="text-black dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                Order Management
              </h1>
            </div>

            {/* Control Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                {/* Search Bar */}
                <div className="lg:col-span-2">
                  <label
                    htmlFor="search"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                  >
                    Search Orders
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      search
                    </span>
                    <input
                      id="search"
                      placeholder="Search by Order ID, Customer Name..."
                      value=""
                      onChange={() => { }}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200 dark:border-gray-600 bg-transparent dark:bg-gray-700 h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10 pr-4 text-base font-normal leading-normal"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div>
                  <label
                    htmlFor="status-filter"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                  >
                    Filter by Status
                  </label>
                  <select
                    id="status-filter"
                    className="form-select w-full h-12 rounded-lg border-gray-200 dark:border-gray-600 bg-transparent dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-black dark:text-white"
                  >
                    <option>All Statuses</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="date-filter"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block"
                  >
                    Filter by Date
                  </label>
                  <select
                    id="date-filter"
                    className="form-select w-full h-12 rounded-lg border-gray-200 dark:border-gray-600 bg-transparent dark:bg-gray-700 focus:ring-2 focus:ring-primary focus:border-primary text-black dark:text-white"
                  >
                    <option>All Time</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Month</option>
                  </select>
                </div>
              </div>

              {/* Button Group */}
              <div className="flex gap-3 mt-4 justify-end">
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-black dark:text-white text-sm font-bold leading-normal tracking-[0.015em] border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span className="truncate">Clear Filters</span>
                </button>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                  <span className="truncate">Apply Filters</span>
                </button>
              </div>
            </div>

            {/* Order Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Total</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "#M-12345",
                        name: "John Doe",
                        date: "2023-10-27",
                        total: "$125.50",
                        status: "Delivered",
                        statusClass: "bg-success/20 text-green-800 dark:text-success",
                      },
                      {
                        id: "#M-12346",
                        name: "Jane Smith",
                        date: "2023-10-26",
                        total: "$89.99",
                        status: "Shipped",
                        statusClass: "bg-warning/20 text-orange-800 dark:text-warning",
                      },
                      {
                        id: "#M-12347",
                        name: "Peter Jones",
                        date: "2023-10-26",
                        total: "$45.00",
                        status: "Processing",
                        statusClass:
                          "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300",
                      },
                      {
                        id: "#M-12348",
                        name: "Mary Johnson",
                        date: "2023-10-25",
                        total: "$210.00",
                        status: "Pending",
                        statusClass: "bg-neutral/20 text-gray-800 dark:text-neutral",
                      },
                      {
                        id: "#M-12349",
                        name: "David Williams",
                        date: "2023-10-24",
                        total: "$72.30",
                        status: "Delivered",
                        statusClass: "bg-success/20 text-green-800 dark:text-success",
                      },
                    ].map((order) => (
                      <tr
                        key={order.id}
                        className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {order.id}
                        </td>
                        <td className="px-6 py-4">{order.name}</td>
                        <td className="px-6 py-4">{order.date}</td>
                        <td className="px-6 py-4">{order.total}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.statusClass}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="font-medium text-primary dark:text-primary/90 hover:underline">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <nav
              aria-label="Table navigation"
              className="flex items-center justify-between pt-4"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  1–5
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  100
                </span>
              </span>
              <ul className="inline-flex -space-x-px text-sm h-8">
                {["Previous", "1", "2", "3", "Next"].map((label, index) => (
                  <li key={index}>
                    <span
                      
                      className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 dark:border-gray-700 ${label === "Previous"
                          ? "rounded-l-lg"
                          : label === "Next"
                            ? "rounded-r-lg"
                            : ""
                        } ${label === "1"
                          ? "text-primary border border-gray-300 bg-primary/20 hover:bg-primary/30 dark:bg-gray-700 dark:text-white"
                          : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        }`}
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}
