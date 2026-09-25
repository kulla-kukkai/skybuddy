import { useState } from "react";
import styles from "./CitySearchForm.module.css";

function CitySearchForm({ onSearch }) {
    const [cityName, setCityName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const trimmedName = cityName.trim();
        if (!trimmedName) return;
        onSearch(trimmedName);
    }

    return (
        <div className={styles.wrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
                id="city-search-input"
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Search city..."
                className={styles.input}
            />
            <button type="submit" className={styles.submitButton}>
                Search
            </button>
            </div>
        </form>
        </div>
    );
}

export default CitySearchForm;