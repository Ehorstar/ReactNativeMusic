const FavouritesReducer = (state, action) => {
  switch (action.type) {
    case "SET_FAVOURITES":
      return action.payload;

    case "ADD_TO_FAVOURITES":
      return [...state, { ...action.payload }];

    case "REMOVE_FROM_FAVOURITES":
      return state.filter((item) => item._id !== action.payload);

    default:
      return state;
  }
};

export default FavouritesReducer;
