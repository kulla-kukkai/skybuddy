import ForecastItem from "../ForecastItem/ForecastItem";
import styles from "./ForecastList.module.css";

function ForecastList({ daily }) {
    const { time, weathercode, temperature_2m_max, temperature_2m_min } = daily;

    return (
        <div className={styles.list}>
        {time.map((date, index) => (
            <ForecastItem
            key={date}
            date={date}
            weatherCode={weathercode[index]}
            maxTemp={temperature_2m_max[index]}
            minTemp={temperature_2m_min[index]}
            />
        ))}
        </div>
    );
}

export default ForecastList;