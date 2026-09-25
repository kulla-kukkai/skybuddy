import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import useWeatherData from "../hooks/useWeatherData";
import WeatherDetail from "../components/WeatherDetail/WeatherDetail";
import ForecastList from "../components/ForecastList/ForecastList";
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

    return (
        <div className={styles.page}>
        <CitySearchForm onSearch={loadCity} />

        {isLoading && <p className={styles.status}>Loading...</p>}
        {error && !isLoading && <p className={styles.status}>{error}</p>}

        {isUnsavedSearchResult && (
            <div className={styles.saveBanner}>
            <span>New city — not saved yet</span>
            <button onClick={() => addFavorite(cityLabel)} className={styles.saveButton}>
                + Save to My Cities
            </button>
            </div>
        )}

        {!isLoading && !error && city && (
            <>
            <WeatherDetail city={city} />
            <ForecastList daily={city.daily} />
            </>
        )}

        {cityLabel && !isLoading && !error && (
            <Link to={`/city/${cityLabel}`} className={styles.detailLink}>
            Manage this city →
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