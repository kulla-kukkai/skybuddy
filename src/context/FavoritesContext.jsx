import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

const STORAGE_KEY = "himlenidag-favorites";

function loadInitialFavorites() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
        return JSON.parse(stored);
        }
    } catch (err) {
        console.error("Failed to load favorites from localStorage:", err);
    }
    return ["Stockholm", "Göteborg", "Malmö"]; 
}

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(loadInitialFavorites);
    useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

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