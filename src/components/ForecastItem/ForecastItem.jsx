import { getWeatherDescription, getWeatherIcon } from "../../utils/weatherCodes";
import styles from "./ForecastItem.module.css";

function ForecastItem({ date, weatherCode, maxTemp, minTemp, isToday }) {
    const formattedDate = isToday
        ? "Today"
        : new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });

    return (
        <div className={styles.card}>
        <p className={styles.date}>{formattedDate}</p>

        <img
        className={styles.icon}
        src={`/weather-icons/${getWeatherIcon(weatherCode)}.png`}
        alt={getWeatherDescription(weatherCode)}
        />

        <p className={styles.description}>{getWeatherDescription(weatherCode)}</p>
        <div className={styles.temps}>
            <span className={styles.maxTemp}>{Math.round(maxTemp)}°</span>
            <span className={styles.minTemp}>{Math.round(minTemp)}°</span>
        </div>
        </div>
    );
}

export default ForecastItem;