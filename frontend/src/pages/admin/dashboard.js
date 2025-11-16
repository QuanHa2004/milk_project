import SideBar from "../../component/admin/side-bar";

export default function Dashboard() {
  return (
    <div className="relative flex min-h-screen">
      
      <SideBar />
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex flex-col gap-8">
          <div className="flex min-w-72 flex-col gap-1">
            <p className="text-text-light-primary dark:text-text-dark-primary text-4xl font-black leading-tight tracking-[-0.033em]">
              Bảng điều khiển
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Tổng doanh thu", value: "15.230 VND"},
              { title: "Tổng đơn hàng", value: "345"},
              { title: "Khách hàng mới", value: "28"},
              {
                title: "Giá trị trung bình",
                value: "44.140 VND",
                change: "-0.5%",
                changeClass: "text-red-500",
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="flex flex-col gap-2 rounded-xl p-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark"
              >
                <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-medium">
                  {stat.title}
                </p>
                <p className="text-text-light-primary dark:text-text-dark-primary tracking-light text-3xl font-bold">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark">
            <h2 className="text-text-light-primary dark:text-text-dark-primary text-xl font-bold p-6">
              Mã tạo gần đây
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-border-light dark:border-border-dark">
                  <tr>
                    <th className="px-6 py-3 text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary">
                      Mã giảm giá
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary">
                      Ngày bắt đầu
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary">
                      Ngày kết thúc
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "MK104",
                      start: "June 1, 2024",
                      end: "June 30, 2024",
                      status: "Active",
                      color: "bg-secondary/20 text-secondary",
                    },
                  ].map((promo) => (
                    <tr
                      key={promo.name}
                      className="border-b border-border-light dark:border-border-dark"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-text-light-primary dark:text-text-dark-primary">
                        {promo.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        {promo.start}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        {promo.end}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${promo.color}`}
                        >
                          {promo.status}
                        </span>
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
