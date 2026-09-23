import { useState, useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import { getCoordinates } from "../../services/weatherApi";
import styles from "./CitySearchForm.module.css";

function CitySearchForm({ onClose }) {
    const { favorites, addFavorite } = useContext(FavoritesContext);

    const [cityName, setCityName] = useState("");
    const [error, setError] = useState(null);
    const [isChecking, setIsChecking] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const trimmedName = cityName.trim();

        if (!trimmedName) {
        setError("Please enter a city name");
        return;
        }

        const isDuplicate = favorites.some(
        (name) => name.toLowerCase() === trimmedName.toLowerCase()
        );
        if (isDuplicate) {
        setError("This city is already in your list");
        return;
        }

        setIsChecking(true);
        setError(null);

        try {
        const location = await getCoordinates(trimmedName);
        addFavorite(location.name);
        setCityName("");
        onClose();
        } catch (err) {
        setError(err.message);
        } finally {
        setIsChecking(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
        <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name"
            className={styles.input}
        />
        <button type="submit" disabled={isChecking} className={styles.submitButton}>
            {isChecking ? "Checking..." : "Add"}
        </button>
        <button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancel
        </button>

        {error && <p className={styles.error}>{error}</p>}
        </form>
    );
}

export default CitySearchForm;