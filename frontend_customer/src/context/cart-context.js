import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export default function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);


  const [token, setToken] = useState(localStorage.getItem("access_token"));


  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("access_token"));
    };

    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);


  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/cart/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Không thể tải giỏ hàng");
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);


  const fetchCartItems = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:8000/cart/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCartItems(data.items || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

 
  const addToCart = async (productId, quantity = 1) => {

    try {
      const res = await fetch("http://localhost:8000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId, quantity }),
      });

      if (!res.ok) throw new Error("Không thể thêm sản phẩm vào giỏ hàng");


      await fetchCartItems();
    } catch (err) {
      console.error(err);
    }
  };


  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`http://localhost:8000/cart/remove/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Không thể xóa sản phẩm");

      setCartItems((prev) => prev.filter((item) => item.product_id !== productId));
    } catch (err) {
      console.error(err);
    }
  };


  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await fetch("http://localhost:8000/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId, quantity }),
      });

      if (!res.ok) throw new Error("Không thể cập nhật số lượng");

      setCartItems((prev) =>
        prev.map((item) =>
          item.product_id === productId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };



  const increase = (productId) => {
    const product = cartItems.find((p) => p.product_id === productId);
    if (product) updateQuantity(product.product_id, product.quantity + 1);
  };

  const decrease = (productId) => {
    const product = cartItems.find((p) => p.product_id === productId);
    if (product && product.quantity > 1)
      updateQuantity(product.product_id, product.quantity - 1);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchCartItems,
        increase,
        decrease
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
