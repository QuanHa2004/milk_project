import useCart from "../../context/cart-context";

export default function CartSummary() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const taxRate = 0.08;
  const taxes = subtotal * taxRate;

  const total = subtotal + taxes;

  return (
    <div className="space-y-4 mt-4">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Chưa có sản phẩm nào!</p>
        ) : (
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            {cartItems.map((item) => (
              <li key={item.name} className="flex justify-between py-1">
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Số lượng: {item.quantity}
                  </span>
                </div>
                <span className="font-medium">
                  {(item.price * item.quantity).toLocaleString('vi-VN')} VND
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-between text-gray-600 dark:text-gray-300">
        <span>Tổng tiền ước tính</span>
        <span>{subtotal.toLocaleString('vi-VN')} VND</span>
      </div>

      <div className="flex justify-between text-gray-600 dark:text-gray-300">
        <span>Thuế</span>
        <span>{taxes.toLocaleString('vi-VN')} VND</span>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

      <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
        <span>Tổng cộng</span>
        <span>{total.toLocaleString('vi-VN')} VND</span>
      </div>
    </div>
  );
}
