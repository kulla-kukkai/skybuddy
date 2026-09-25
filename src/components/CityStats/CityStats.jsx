import styles from "./CityStats.module.css";

function formatTime(isoString) {
    return new Date(isoString).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function CityStats({ daily }) {
    const sunrise = daily.sunrise[0];
    const sunset = daily.sunset[0];
    const uvIndex = daily.uv_index_max[0];
    const rainChance = daily.precipitation_probability_max[0];

    return (
        <div className={styles.container}>
        <div className={styles.grid}>
            <div className={styles.stat}>
            <span className={styles.label}>Sunrise</span>
            <span className={styles.value}>☀️ {formatTime(sunrise)}</span>
            </div>
            <div className={styles.stat}>
            <span className={styles.label}>Sunset</span>
            <span className={styles.value}>🌙 {formatTime(sunset)}</span>
            </div>
            <div className={styles.stat}>
            <span className={styles.label}>UV Index</span>
            <span className={styles.value}>{Math.round(uvIndex)}</span>
            </div>
            <div className={styles.stat}>
            <span className={styles.label}>Rain chance</span>
            <span className={styles.value}>{rainChance}%</span>
            </div>
        </div>
        </div>
    );
}

export default CityStats;