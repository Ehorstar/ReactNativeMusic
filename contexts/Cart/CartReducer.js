const CartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;

    case "ADD_TO_CART":
      const existingItem = state.find((item) => item._id === action.payload._id);

      if (existingItem) {
        return state.map((item) =>
          item._id === existingItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "REMOVE_FROM_CART":
      return state.filter((item) => item._id !== action.payload);
    case "CLEAR_CART":
      return [];
    case "INCREMENT_QUANTITY":
      return state.map((item) =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    case "DECREMENT_QUANTITY":
      return state
        .map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    default:
      return state;
  }
};

export default CartReducer;
