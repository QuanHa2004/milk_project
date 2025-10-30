import SideBar from "../../component/side-bar";
import { useNavigate } from "react-router-dom";
export default function ProductManagement() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen">

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="flex flex-1">
          {/* === SideNavBar === */}
          <SideBar />

          {/* === Main Content === */}
          <main className="flex-1 p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
              {/* Page Heading */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex min-w-72 flex-col gap-1">
                  <p className="text-gray-900 dark:text-white text-3xl font-black">
                    Product Management
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-base">
                    View, add, and manage all products.
                  </p>
                </div>
                <button onClick={() => navigate('/admin/add-product')} className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition">
                  <span className="material-symbols-outlined text-base">add</span>
                  <span >Add New Product</span>
                </button>
              </div>

              {/* Table */}
              <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-2/12">Product Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-2/12">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-2/12">Supplier</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-1/12">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-1/12">Quantity</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-2/12">Expiration Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {[
                        {
                          name: "Almond Milk",
                          category: "Plant-Based",
                          supplier: "Nutty Co.",
                          price: "$6.25",
                          qty: "120 units",
                          exp: "2025-01-10",
                        },
                      ].map((item, i) => (
                        <tr
                          key={i}
                          className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                        >
                          <td className="px-4 py-2 font-medium">{item.name}</td>
                          <td className="px-4 py-2">{item.category}</td>
                          <td className="px-4 py-2">{item.supplier}</td>
                          <td className="px-4 py-2">{item.price}</td>
                          <td className="px-4 py-2">{item.qty}</td>
                          <td className="px-4 py-2">{item.exp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
