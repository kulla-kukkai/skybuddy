import { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { getWeatherByCity, getWeatherByCoords } from "../services/weatherApi";
import { FavoritesContext } from "../context/FavoritesContext";
import WeatherDetail from "../components/WeatherDetail/WeatherDetail";
import ForecastList from "../components/ForecastList/ForecastList";
import CitySearchForm from "../components/CitySearchForm/CitySearchForm";
import styles from "./HomePage.module.css";

function HomePage() {
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    const [activeCity, setActiveCity] = useState(null);
    const [activeCityName, setActiveCityName] = useState(null); // null = โหมดตำแหน่งปัจจุบัน
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const loadCurrentLocation = useCallback(() => {
        setIsLoading(true);
        setError(null);
        setActiveCityName(null);

        if (!navigator.geolocation) {
        setError("Geolocation is not supported on this device");
        setIsLoading(false);
        return;
        }

        navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
            const result = await getWeatherByCoords(
                position.coords.latitude,
                position.coords.longitude
            );
            setActiveCity(result);
            } catch (err) {
            setError(err.message);
            } finally {
            setIsLoading(false);
            }
        },
        () => {
            setError("Location access denied. Pick a saved city below instead.");
            setIsLoading(false);
        }
        );
    }, []);

    async function loadCity(cityName) {
        setIsLoading(true);
        setError(null);
        setActiveCityName(cityName);

        try {
        const result = await getWeatherByCity(cityName);
        setActiveCity(result);
        } catch (err) {
        setError(err.message);
        } finally {
        setIsLoading(false);
        }
    }

    useEffect(() => {
        loadCurrentLocation();
    }, [loadCurrentLocation]);

    return (
        <div className={styles.page}>
        {isLoading && <p className={styles.status}>Loading...</p>}
        {error && !isLoading && <p className={styles.status}>{error}</p>}

        {!isLoading && !error && activeCity && (
            <>
            <WeatherDetail city={activeCity} />
            <ForecastList daily={activeCity.daily} />
            </>
        )}

        {activeCityName && (
            <Link to={`/city/${activeCityName}`} className={styles.detailLink}>
            See full forecast →
            </Link>
        )}

        <div className={styles.chipRow}>
            <button
            className={`${styles.chip} ${!activeCityName ? styles.chipActive : ""}`}
            onClick={loadCurrentLocation}
            >
            📍 Current
            </button>

            {favorites.map((name) => (
            <div key={name} className={styles.chipWrapper}>
                <button
                className={`${styles.chip} ${activeCityName === name ? styles.chipActive : ""}`}
                onClick={() => loadCity(name)}
                >
                {name}
                </button>
                <button
                className={styles.chipRemove}
                onClick={() => {
                    removeFavorite(name);
                    if (activeCityName === name) loadCurrentLocation();
                }}
                aria-label={`Remove ${name}`}
                >
                ×
                </button>
            </div>
            ))}

            <button className={styles.chip} onClick={() => setShowForm(true)}>
            + Add
            </button>
        </div>

        {showForm && <CitySearchForm onClose={() => setShowForm(false)} />}
        </div>
    );
}

export default HomePage;