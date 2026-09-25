import ForecastItem from "../ForecastItem/ForecastItem";
import styles from "./ForecastList.module.css";

function ForecastList({ daily }) {
    const { time, weather_code, temperature_2m_max, temperature_2m_min } = daily;

    return (
        <div className={styles.wrapper}>
        <h3 className={styles.heading}>7-Day Forecast</h3>

        <div className={styles.list}>
            {time.map((date, index) => (
            <ForecastItem
                key={date}
                date={date}
                weatherCode={weather_code[index]}
                maxTemp={temperature_2m_max[index]}
                minTemp={temperature_2m_min[index]}
                isToday={index === 0}
            />
            ))}
        </div>
        </div>
    );
}

export default ForecastList;