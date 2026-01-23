import { createContext, useReducer, useState } from "react";
import CartReducer from "./CartReducer";
import useStorage from "../../hooks/useStorage";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(CartReducer, []);

  useStorage("cart", items, dispatch, "SET_CART");

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const isInCart = (_id) => items.some((item) => item._id === _id);

  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });

  const removeFromCart = (_id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: _id });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const incrementQuantity = (_id) =>
    dispatch({ type: "INCREMENT_QUANTITY", payload: _id });

  const decrementQuantity = (_id) =>
    dispatch({ type: "DECREMENT_QUANTITY", payload: _id });

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
        incrementQuantity,
        decrementQuantity,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
