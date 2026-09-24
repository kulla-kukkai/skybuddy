import { getWeatherDescription, getWeatherIcon } from "../../utils/weatherCodes";
import styles from "./WeatherDetail.module.css";

function WeatherDetail({ city }) {
  const { name, country, current } = city;

  return (
    <div className={styles.container}>
      <h2 className={styles.cityName}>{name}</h2>

      <img
        className={styles.icon}
        src={`/src/assets/weather-icons/${getWeatherIcon(current.weather_code)}.png`}
        alt={getWeatherDescription(current.weather_code)}
      />

      <p className={styles.temperature}>{Math.round(current.temperature_2m)}°</p>
      <p className={styles.description}>{getWeatherDescription(current.weather_code)}</p>

      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Wind</span>
          <span className={styles.statValue}>{current.wind_speed_10m} km/h</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Humidity</span>
          <span className={styles.statValue}>{current.relative_humidity_2m}%</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Feels like</span>
          <span className={styles.statValue}>{Math.round(current.apparent_temperature)}°</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetail;