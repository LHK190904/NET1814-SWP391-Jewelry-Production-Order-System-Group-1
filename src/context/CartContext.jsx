// Import necessary React functions and createContext from React
import React, { createContext, useState, useContext } from "react";

// Create a new context for the cart
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// CartProvider component to wrap around parts of the app that need access to the cart
export const CartProvider = ({ children }) => {
  // State to hold cart items
  const [cart, setCart] = useState([]);

  // Function to add a new item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Provide the cart and addToCart function to children components
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
