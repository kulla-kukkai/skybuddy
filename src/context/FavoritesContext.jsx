import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(["Stockholm", "Göteborg", "Malmö"]);

    function addFavorite(cityName) {
    setFavorites((prev) => [...prev, cityName]);
    }

    function removeFavorite(cityName) {
    setFavorites((prev) => prev.filter((name) => name !== cityName));
    }

    const value = { favorites, addFavorite, removeFavorite };

    return (
        <FavoritesContext.Provider value={value}>
        {children}
        </FavoritesContext.Provider>
    );
}