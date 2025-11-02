import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import useCart from "../context/cart-context";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleClick = () => {
    navigate(`/product-detail/${product.product_id}`);
  };

  const handleAdd = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
      navigate("/login");
      return;
    }

    try {
      await addToCart(product.product_id, 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col bg-white dark:bg-background-dark/50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group h-full cursor-pointer"
    >
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-cover"
        style={{ backgroundImage: `url("${product.image_url}")` }}
      ></div>
      <div className="flex flex-col flex-grow justify-between p-4">
        <div>
          <p className="text-lg font-bold text-[#111618] dark:text-white line-clamp-2">
            {product.product_name}
          </p>
          <p className="text-base font-medium text-gray-700 dark:text-gray-300">
            ${product.price}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 w-full flex items-center justify-center rounded-lg h-10 bg-primary text-white text-sm font-bold tracking-wide transition-colors duration-300 hover:bg-primary/90 group-hover:bg-primary"
        >
          <span className="material-symbols-outlined mr-2">add_shopping_cart</span>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function ProductOption() {
  const { category_id } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchResult = location.state?.result || null;

  useEffect(() => {
    fetch("http://localhost:8000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Không có danh mục", err));
  }, []);

  useEffect(() => {
    if (searchResult) {
      setProducts(searchResult);
    } else {
      const url = category_id
        ? `http://localhost:8000/products/${category_id}`
        : `http://localhost:8000/products`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Không có sản phẩm", err));
    }
  }, [category_id, searchResult]);

  const clickCategory = (id) => {
    navigate(`/products/category/${id}`);
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#8b4513" }}
        className="fixed top-16 left-0 w-full z-40 px-4 md:px-10 lg:px-40 flex items-center justify-center whitespace-nowrap border-b border-solid border-b-primary/30 py-2 shadow-sm"
      >
        <nav className="flex items-center gap-6 justify-center w-full max-w-4xl">
          <button
            onClick={() => navigate("/products")}
            className="text-white text-base font-bold px-3 py-1 text-center hover:opacity-90"
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.category_id}
              onClick={() => clickCategory(cat.category_id)}
              className="text-white text-base font-bold px-3 py-1 text-center hover:opacity-90"
            >
              {cat.category_name}
            </button>
          ))}
        </nav>
      </div>

      <div className="px-4 pb-10">
        {products.length > 0 ? (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <li key={product.product_id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-white">No products yet</p>
        )}
      </div>
    </>
  );
}
