import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import useCart from '../../context/cart-context';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const handleClick = () => {
    if (product.link) navigate(product.link);
  };

  const handleAdd = async (e) => {
    e.stopPropagation();
    try {
      await addToCart(product, 1);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div onClick={handleClick} className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url('${product.imageUrl}')` }}
      ></div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-text-color text-xl font-bold">{product.name}</h3>
        <p className="text-gray-500 mt-1 flex-1">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-secondary">{Number(product.price).toLocaleString('vi-VN')} VND</span>
          <button onClick={handleAdd} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-opacity flex items-center gap-2">
            <span className="material-symbols-outlined text-base">add_shopping_cart</span>
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BestSellingProduct() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((sp) => ({
          product_id: sp.product_id,
          product_name: sp.product_name,
          description: sp.description,
          price: sp.price,
          imageUrl: sp.image_url,
          link: `/product-details/${sp.product_id}`,
        }));
        setProductList(mapped);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {productList.slice(0, 3).map((sp, index) => (
        <ProductCard
          key={index}
          product={sp}
        />
      ))}
    </div>
  );
}
