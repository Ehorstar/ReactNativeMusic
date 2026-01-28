import { createContext, useReducer, useState } from "react";
import FavouritesReducer from "./FavouritesReducer";
import useStorage from "../../hooks/useStorage";

export const FavouritesContext = createContext(null);

const FavouritesProvider = ({ children }) => {
  const [favourites, dispatch] = useReducer(FavouritesReducer, []);

  useStorage("favouritesMusic", favourites, dispatch, "SET_FAVOURITES");

  const addToFavourites = (product) =>
    dispatch({ type: "ADD_TO_FAVOURITES", payload: product });

  const removeFromFavourites = (id) =>
    dispatch({ type: "REMOVE_FROM_FAVOURITES", payload: id });

  const inFavourites = (id) => favourites.some((item) => item.id === id);

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
