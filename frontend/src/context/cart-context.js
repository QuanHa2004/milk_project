import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export default function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        const addQty = product.quantity || 1;
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + addQty }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };


  const removeFromCart = (name) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  const updateQuantity = (name, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity } : item
      )
    );
  };

  const increase = (name) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  const decrease = (name) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, increase, decrease }}>
      {children}
    </CartContext.Provider>
  );
}
