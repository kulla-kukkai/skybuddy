import { useState, useEffect } from "react";
import { getWeatherByCity } from "../services/weatherApi";
import CityCard from "../components/CityCard";

const CITY_NAMES = ["Stockholm", "Göteborg", "Malmö"];

function HomePage() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAllCities() {
        setIsLoading(true);
        setError(null);

        try {
            const results = await Promise.all(
            CITY_NAMES.map((name) => getWeatherByCity(name))
            );
            setCities(results);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
        }

        fetchAllCities();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong, please try again later.</p>;

    return (
        <div>
        <h1>My Cities</h1>
        {cities.map((city) => (
            <CityCard key={city.name} city={city} />
        ))}
        </div>
    );
}

export default HomePage;