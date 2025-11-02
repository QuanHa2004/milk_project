import useCart from "../context/cart-context";

export default function CartItem() {
  const { cartItems, removeFromCart, updateQuantity, increase, decrease } = useCart();

  return (
    <>
      {cartItems.map((product, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-6 items-center gap-4 bg-white dark:bg-background-dark p-4 rounded-lg shadow-sm">
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

          <div className="text-center text-gray-900 dark:text-white">${product.price}</div>

          <div className="flex justify-center items-center gap-2 text-gray-900 dark:text-white">
            <button onClick={() => decrease(product.product_id)}>-</button>
            <input
              type="number"
              min="1"
              value={product.quantity}
              onChange={(e) => updateQuantity(product.product_id, parseInt(e.target.value) || 1)}
              className="w-10 text-center bg-transparent"
            />
            <button onClick={() => increase(product.product_id)}>+</button>
          </div>

          <div className="text-right text-gray-900 dark:text-white font-semibold">
            ${(product.price * product.quantity).toFixed(2)}
          </div>

          <div className="col-span-full md:col-span-1 flex justify-end md:justify-center">
            <button onClick={() => removeFromCart(product.product_id)} className="text-gray-500 hover:text-red-500">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
