import { useState } from "react";

export default function AddProducts() {
  const [products, setProducts] = useState([
    { name: "", category: "", supplier: "", price: "", quantity: "", expDate: "", imageUrl: "" },
  ]);
  const [message, setMessage] = useState("");

  const handleChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const addProductRow = () => {
    setProducts([
      ...products,
      { name: "", category: "", supplier: "", price: "", quantity: "", expDate: "", imageUrl: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu lên API (ví dụ POST /api/products)
      console.log("Submitting products:", products);
      setMessage("✅ Products added successfully!");
      // reset form
      setProducts([
        { name: "", category: "", supplier: "", price: "", quantity: "", expDate: "", imageUrl: "" },
      ]);
    } catch (err) {
      setMessage("❌ Failed to add products. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white dark:bg-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Milk Admin</h1>
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Add New Products</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {products.map((product, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
              <input
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="p-2 rounded border dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={product.category}
                onChange={(e) => handleChange(index, "category", e.target.value)}
                className="p-2 rounded border dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="text"
                placeholder="Supplier"
                value={product.supplier}
                onChange={(e) => handleChange(index, "supplier", e.target.value)}
                className="p-2 rounded border dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) => handleChange(index, "price", e.target.value)}
                className="p-2 rounded border dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={product.quantity}
                onChange={(e) => handleChange(index, "quantity", e.target.value)}
                className="p-2 rounded border dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="date"
                value={product.expDate}
                onChange={(e) => handleChange(index, "expDate", e.target.value)}
                className="p-2 rounded border dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={product.imageUrl}
                onChange={(e) => handleChange(index, "imageUrl", e.target.value)}
                className="p-2 rounded border dark:bg-gray-700 dark:text-white"
              />
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={addProductRow}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow"
            >
              + Add Another Product
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow"
            >
              ✅ Submit All Products
            </button>
          </div>
        </form>

        {message && (
          <p
            className={`mt-6 text-center font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
