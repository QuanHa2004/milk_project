import useCart from '../../context/cart-context';
// ... các import khác

export default function CartItem() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    increase,
    decrease,
    setCartItems,
  } = useCart();

  // Hàm xử lý gọi API cập nhật trạng thái
  const handleCheckboxChange = async (productId, currentStatus) => {
    const newStatus = !currentStatus; // Đảo ngược trạng thái hiện tại

    // 1. Cập nhật UI ngay lập tức (Optimistic Update) để người dùng không thấy độ trễ
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? { ...item, selected: newStatus } // Cập nhật state local
          : item
      )
    );

    // 2. Gọi API để cập nhật xuống Database
    try {
      const token = localStorage.getItem("access_token"); // Lấy token xác thực
      const response = await fetch(`http://localhost:8000/cart/item/${productId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_checked: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Lỗi cập nhật");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      // Nếu lỗi, revert lại trạng thái cũ trên UI (Optional)
      setCartItems((prev) =>
        prev.map((item) =>
          item.product_id === productId
            ? { ...item, selected: currentStatus } // Quay về trạng thái cũ
            : item
        )
      );
      alert("Không thể cập nhật trạng thái sản phẩm!");
    }
  };

  return (
    <>
      {cartItems.map((product, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-7 items-center gap-4 bg-white dark:bg-background-dark p-4 rounded-lg shadow-sm"
        >
          <div className="flex justify-center">
            <input
              type="checkbox"
              // Lưu ý: Đảm bảo backend trả về field map đúng với 'selected' hoặc 'is_checked'
              checked={product.selected || false} 
              onChange={() => handleCheckboxChange(product.product_id, product.selected)}
              className="w-5 h-5 accent-[#8b4513] cursor-pointer"
            />
          </div>

          {/* ... Phần hiển thị ảnh và tên sản phẩm giữ nguyên ... */}
          <div className="flex items-center gap-4 col-span-1 md:col-span-3">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-20"
              style={{ backgroundImage: `url("${product.image_url}")` }}
            />
            <div className="flex flex-col justify-center">
              <p className="text-gray-900 dark:text-white text-base font-medium leading-normal line-clamp-1">
                {product.product_name}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>

          <div className="text-center text-gray-900 dark:text-white">
            {Number(product.price).toLocaleString("vi-VN")} VND
          </div>

          <div className="flex justify-center items-center gap-2 text-gray-900 dark:text-white">
            <button onClick={() => decrease(product.product_id)}>-</button>
            <input
              type="number"
              min="1"
              value={product.quantity}
              onChange={(e) =>
                updateQuantity(product.product_id, parseInt(e.target.value) || 1)
              }
              className="w-10 text-center bg-transparent"
            />
            <button onClick={() => increase(product.product_id)}>+</button>
          </div>

          <div className="text-right text-gray-900 dark:text-white font-semibold">
            {(product.price * product.quantity).toLocaleString("vi-VN")} VND
          </div>

          <div className="col-span-full md:col-span-1 flex justify-end md:justify-center">
            <button
              onClick={() => removeFromCart(product.product_id)}
              className="text-gray-500 hover:text-red-500"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
}