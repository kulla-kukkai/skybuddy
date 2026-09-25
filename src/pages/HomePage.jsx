import { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { getWeatherByCity, getWeatherByCoords } from "../services/weatherApi";
import { FavoritesContext } from "../context/FavoritesContext";
import WeatherDetail from "../components/WeatherDetail/WeatherDetail";
import ForecastList from "../components/ForecastList/ForecastList";
import CitySearchForm from "../components/CitySearchForm/CitySearchForm";
import CityChipList from "../components/CityChipList/CityChipList";
import styles from "./HomePage.module.css";

function HomePage() {
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    const [activeCity, setActiveCity] = useState(null);
    const [activeCityName, setActiveCityName] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    function handleRemoveCity(name) {
        removeFavorite(name);
        if (activeCityName === name) loadCurrentLocation();
    }

    useEffect(() => {
        loadCurrentLocation();
    }, [loadCurrentLocation]);

    return (
        <div className={styles.page}>
        <CitySearchForm onAdded={(name) => loadCity(name)} />

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

        <CityChipList
            favorites={favorites}
            activeCityName={activeCityName}
            onSelectCity={loadCity}
            onSelectCurrent={loadCurrentLocation}
            onRemoveCity={handleRemoveCity}
        />
        </div>
    );
}

export default HomePage;