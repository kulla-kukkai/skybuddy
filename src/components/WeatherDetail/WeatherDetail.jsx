import { getWeatherDescription, getWeatherIcon } from "../../utils/weatherCodes";
import styles from "./WeatherDetail.module.css";

function formatDateTime(isoString) {
  const date = new Date(isoString);
  const dateText = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeText = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateText} · ${timeText}`;
}

function WeatherDetail({ city, onSave }) {
  const { name, country, current } = city;

  return (
    <div className={styles.container}>
      {onSave && (
        <button onClick={onSave} className={styles.saveButton} title="Save to My Cities" aria-label="Save to My Cities">
          +
        </button>
      )}

      <h2 className={styles.cityName}>{name}</h2>
      {country && <p className={styles.country}>{country}</p>}

      <p className={styles.dateTime}>{formatDateTime(current.time)}</p>

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