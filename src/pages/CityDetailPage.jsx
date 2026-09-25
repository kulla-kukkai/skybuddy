import { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import useWeatherData from "../hooks/useWeatherData";
import WeatherDetail from "../components/WeatherDetail/WeatherDetail";
import ForecastList from "../components/ForecastList/ForecastList";
import CityStats from "../components/CityStats/CityStats";
import styles from "./CityDetailPage.module.css";

function CityDetailPage() {
const { cityName } = useParams();
    const navigate = useNavigate();
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    const { city, isLoading, error } = useWeatherData(cityName);

    function handleRemove() {
        removeFavorite(cityName);
        navigate("/");
    }

    const isFavorite = favorites.includes(cityName);

    return (
        <div className={styles.page}>
        <div className={styles.topBar}>
            <Link to="/" className={styles.backLink}>← Back to Home</Link>

            {isFavorite && (
            <button onClick={handleRemove} className={styles.removeButton}>
                Remove from favorites
            </button>
            )}
        </div>

        {isLoading && <p className={styles.status}>Loading...</p>}
        {error && <p className={styles.status}>Something went wrong, please try again later.</p>}
        {!isLoading && !error && city && (
            <>
            <WeatherDetail city={city} />
            <CityStats daily={city.daily} />
            <ForecastList daily={city.daily} />
            </>
        )}
        </div>
    );
}

export default CityDetailPage;