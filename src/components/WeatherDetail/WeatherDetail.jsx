import { getWeatherDescription } from "../../utils/weatherCodes";
import styles from "./WeatherDetail.module.css";

function WeatherDetail({ city }) {
    const { name, country, current } = city;

    return (
        <div className={styles.container}>
        <h1 className={styles.cityName}>
            {name}
            {country && <span className={styles.country}>, {country}</span>}
        </h1>

        <p className={styles.temperature}>{Math.round(current.temperature)}°C</p>
        <p className={styles.description}>
            {getWeatherDescription(current.weathercode)}
        </p>
        <p className={styles.windSpeed}>Wind: {current.windspeed} km/h</p>
        </div>
    );
}

export default WeatherDetail;