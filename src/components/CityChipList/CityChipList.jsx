import styles from "./CityChipList.module.css";

function CityChipList({ favorites, activeCityName, onSelectCity, onSelectCurrent, onRemoveCity }) {
    return (
        <div className={styles.wrapper}>
        <h3 className={styles.heading}>My Saved Cities</h3>

        <div className={styles.chipRow}>
            <button
            className={`${styles.chip} ${!activeCityName ? styles.chipActive : ""}`}
            onClick={onSelectCurrent}
            >
            📍 Current
            </button>

            {favorites.map((name) => (
            <div key={name} className={styles.chipWrapper}>
                <button
                className={`${styles.chip} ${activeCityName === name ? styles.chipActive : ""}`}
                onClick={() => onSelectCity(name)}
                >
                {name}
                </button>
                <button
                className={styles.chipRemove}
                onClick={() => onRemoveCity(name)}
                aria-label={`Remove ${name}`}
                >
                ×
                </button>
            </div>
            ))}
        </div>
        </div>
    );
}

export default CityChipList;