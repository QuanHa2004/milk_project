import SideBar from "../../component/admin/side-bar";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [recentPromotionList, setRecentPromotionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/admin/promotions");

        if (!response.ok) {
          throw new Error("Lỗi kết nối server");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setRecentPromotionList(data.slice(0, 5));
        } else {
          setRecentPromotionList([]);
        }
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
        setRecentPromotionList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const statsData = [
    {
      title: "Tổng doanh thu",
      value: "15.230.000",
    },
    {
      title: "Tổng đơn hàng",
      value: "345",
    },
    {
      title: "Khách hàng mới",
      value: "28",
    },
    {
      title: "Giá trị trung bình",
      value: "44.140",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      <div className="fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0">
        <SideBar />
      </div>

      <main className="flex-1 p-8 w-full overflow-hidden">
        <div className="flex flex-col gap-8 max-w-7xl mx-auto">

          <div>
            <p className="text-gray-900 dark:text-white text-3xl font-black">
              Bảng điều khiển
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
              Tổng quan tình hình kinh doanh tháng này.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="group relative flex flex-col gap-4 rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">

            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  Mã giảm giá mới
                </h2>
              </div>
              <button className="text-sm text-blue-600 font-medium hover:underline">
                Xem tất cả
              </button>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 dark:bg-gray-800/30">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Mã Code
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Bắt đầu
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Kết thúc
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                  {isLoading ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                        Đang tải dữ liệu...
                      </td>
                    </tr>
                  ) : recentPromotionList.length > 0 ? (
                    recentPromotionList.map((promotion, index) => (
                      <tr
                        key={index}
                        className="group hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 select-all">
                            {promotion.promo_code}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            {new Date(promotion.start_date).toLocaleDateString('vi-VN')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-300">
                          {new Date(promotion.end_date).toLocaleDateString('vi-VN')}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {promotion.is_active ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              Đang hoạt động
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
                              <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                              Ngưng hoạt động
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-sm font-medium text-gray-500">
                            Chưa có mã giảm giá nào
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}