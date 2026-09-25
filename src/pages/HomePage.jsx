import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import useWeatherData from "../hooks/useWeatherData";
import WeatherDetail from "../components/WeatherDetail/WeatherDetail";
import CitySearchForm from "../components/CitySearchForm/CitySearchForm";
import CityChipList from "../components/CityChipList/CityChipList";
import styles from "./HomePage.module.css";

function HomePage() {
    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const { city, cityLabel, isLoading, error, loadCity, loadCurrentLocation } = useWeatherData();

    function handleRemoveCity(name) {
        removeFavorite(name);
        if (cityLabel === name) loadCurrentLocation();
    }

    const isUnsavedSearchResult =
        cityLabel && !isLoading && !error && !favorites.includes(cityLabel);

    const isNight = city && city.current.is_day === 0;

    return (
        <div className={`${styles.page} ${isNight ? "theme-night" : ""}`}>
        
        <h1 className={styles.appName}>
            Skybuddy
            <svg
                className={styles.cloudIcon}
                viewBox="0 0 64 40"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <ellipse cx="20" cy="26" rx="14" ry="12" fill="white" />
                <ellipse cx="34" cy="16" rx="14" ry="14" fill="white" />
                <ellipse cx="46" cy="24" rx="12" ry="11" fill="white" />
                <rect x="12" y="22" width="42" height="14" rx="7" fill="white" />
            </svg>
        </h1>
        <CitySearchForm onSearch={loadCity} />

        {isLoading && <p className={styles.status}>Loading...</p>}
        {error && !isLoading && <p className={styles.status}>{error}</p>}

        {!isLoading && !error && city && (
            <>
            <WeatherDetail
                city={city}
                onSave={isUnsavedSearchResult ? () => addFavorite(cityLabel) : undefined}
            />
            </>
        )}

        {!isLoading && !error && city && (
            <Link
                to={cityLabel ? `/city/${cityLabel}` : "/current"}
                className={styles.detailLink}
            >
                View full forecast →
            </Link>
        )}
        <CityChipList
            favorites={favorites}
            activeCityName={cityLabel}
            onSelectCity={loadCity}
            onSelectCurrent={loadCurrentLocation}
            onRemoveCity={handleRemoveCity}
        />
        </div>
    );
}

export default HomePage;