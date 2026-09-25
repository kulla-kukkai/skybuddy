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
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    const { city, cityLabel, isLoading, error, loadCity, loadCurrentLocation } = useWeatherData();

    function handleRemoveCity(name) {
        removeFavorite(name);
        if (cityLabel === name) loadCurrentLocation();
    }
    
    const isNight = city && city.current.is_day === 0;
    
    return (
        
        <div className={`${styles.page} ${isNight ? "theme-night" : ""}`}>
        <CitySearchForm onAdded={(name) => loadCity(name)} />

        {isLoading && <p className={styles.status}>Loading...</p>}
        {error && !isLoading && <p className={styles.status}>{error}</p>}

        {!isLoading && !error && city && (
            <>
            <WeatherDetail city={city} />
            <ForecastList daily={city.daily} />
            </>
        )}

        {cityLabel && (
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