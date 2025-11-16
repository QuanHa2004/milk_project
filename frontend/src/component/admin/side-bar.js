import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();

  const navItems = [
    { icon: "dashboard", text: "Bảng điều khiển", url: "/admin/dashboard" },
    { icon: "shopping_cart", text: "Đơn hàng", url: "/admin/order" },
    { icon: "inventory_2", text: "Sản phẩm", url: "/admin/product" },
    { icon: "campaign", text: "Mã giảm giá", url: "/admin/promotion" },
    { icon: "category", text: "Danh mục", url: "/admin/category" },
  ];

  return (
    <spanside className="sticky top-0 h-screen w-64 flex-shrink-0 bg-card-light dark:bg-card-dark p-4 border-r border-border-light dark:border-border-dark">
      <div className="flex h-full flex-col justify-between">
        {/* Top Section */}
        <div className="flex flex-col gap-8">
          {/* Company Info */}
          <div className="flex items-center gap-3 px-3">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBgwRYRxgFQbloFa47nqryZ-BNb12WW47_at3RaIfLLawXcnbEKufw8B_rkkQgL7USmCZGplJBiUkYtp3ICCiX6XIcBA2qL_keBGHl9LVhCg97GG_9FqfTjP7E63U6AO4BrRYeokj9gu0-msicOm7GcL71DUP4zqml5aLengcNUUOJm5RWytzrN6U0QrZTkw6yn9dk4-DsTHuv9CRXu7wLMsc5KutLn5P0tL-mFwYebyZ4OCJvczfYe1Svt15FDJw2twk6IvpQekfk')",
              }}
            ></div>
            <div className="flex flex-col">
              <h1 className="text-text-light-primary dark:text-text-dark-primary text-base font-bold">
                Milk Co.
              </h1>
              <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-normal">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <span
                onClick={() => navigate(item.url)}
                key={item.text}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-text-light-secondary dark:text-text-dark-secondary dark:hover:text-primary"
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <p className="text-sm font-medium">{item.text}</p>

              </span>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4">
          <div className="border-t border-border-light dark:border-border-dark pt-4">
            <div className="flex items-center gap-3 px-3 py-2">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVelH6hFAAlkzf-TYMhbOmWx_FXg1xVQjbIliH6D5L_bLJ8UI1k_xvY5ce4EGYxEh1cfrRvQdYF6xPQTmnIRAm_iFPA2R-ALL7-49mJqIDzebfn2c0GxSm7Y0q7xGpJ26CeZ8rXJoCfY7j7_VJUh819INAm5Q6kcmQN4WHoOjvizomN0_QXpNDoabRXnLMEY-eYDw_YIWzSCbPTt9uztwJ15iHSQhOUcVfFqokuPIWc2XMUnNXu3Wn-h0E0JdZiGI-XtaC-KUsPnA')",
                }}
              ></div>
              <div className="flex flex-col">
                <h1 className="text-text-light-primary dark:text-text-dark-primary text-sm font-semibold">
                  Jane Doe
                </h1>
                <span className="text-primary text-xs font-normal hover:underline">
                  Đăng xuất
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </spanside>
  );
}
