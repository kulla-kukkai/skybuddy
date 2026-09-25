import { useState, useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import { getWeatherByCity } from "../../services/weatherApi";
import { getWeatherDescription } from "../../utils/weatherCodes";
import styles from "./CitySearchForm.module.css";

function CitySearchForm({ onAdded }) {
    const { favorites, addFavorite } = useContext(FavoritesContext);

    const [cityName, setCityName] = useState("");
    const [preview, setPreview] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);

    async function handleSearch(e) {
        e.preventDefault();

        const trimmedName = cityName.trim();
        if (!trimmedName) {
        setError("Please enter a city name");
        setPreview(null);
        return;
        }

        setIsSearching(true);
        setError(null);
        setPreview(null);

        try {
        const result = await getWeatherByCity(trimmedName);
        setPreview(result);
        } catch (err) {
        setError(err.message); 
        } finally {
        setIsSearching(false);
        }
    }

    function handleAdd() {
        addFavorite(preview.name);
        onAdded(preview.name);
        setCityName("");
        setPreview(null);
    }

    const isDuplicate =
        preview && favorites.some((name) => name.toLowerCase() === preview.name.toLowerCase());

    return (
        <div className={styles.wrapper}>
        <form onSubmit={handleSearch} className={styles.form}>
            <div className={styles.inputWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
                id="city-search-input"
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Search city..."
                className={styles.input}
            />
            <button type="submit" disabled={isSearching} className={styles.submitButton}>
                {isSearching ? "..." : "Search"}
            </button>
            </div>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        {preview && (
            <div className={styles.previewCard}>
            <div>
                <p className={styles.previewName}>
                {preview.name}
                {preview.country && <span className={styles.previewCountry}>, {preview.country}</span>}
                </p>
                <p className={styles.previewDesc}>
                {Math.round(preview.current.temperature_2m)}° · {getWeatherDescription(preview.current.weather_code)}
                </p>
            </div>

            {isDuplicate ? (
                <span className={styles.alreadyAdded}>Already saved</span>
            ) : (
                <button onClick={handleAdd} className={styles.addButton}>
                + Add
                </button>
            )}
            </div>
        )}
        </div>
    );
}

export default CitySearchForm;