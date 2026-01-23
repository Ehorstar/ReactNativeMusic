import { createContext, useReducer, useState } from "react";
import FavouritesReducer from "./FavouritesReducer";
import useStorage from "../../hooks/useStorage";

export const FavouritesContext = createContext(null);

const FavouritesProvider = ({ children }) => {
  const [favourites, dispatch] = useReducer(FavouritesReducer, []);

  useStorage("favourites", favourites, dispatch, "SET_FAVOURITES");

  const addToFavourites = (product) =>
    dispatch({ type: "ADD_TO_FAVOURITES", payload: product });

  const removeFromFavourites = (_id) =>
    dispatch({ type: "REMOVE_FROM_FAVOURITES", payload: _id });

  const inFavourites = (_id) => favourites.some((item) => item._id === _id);
  
  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        inFavourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesProvider;
