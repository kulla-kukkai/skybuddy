import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getWeatherByCity } from "../services/weatherApi";
import WeatherDetail from "../components/WeatherDetail/WeatherDetail";

function CityDetailPage() {
    const { cityName } = useParams();

    const [city, setCity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCity() {
        setIsLoading(true);
        setError(null);

        try {
            const result = await getWeatherByCity(cityName);
            setCity(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
        }

        fetchCity();
    }, [cityName]);

    return (
    <div>
        <Link to="/">← Back to Home</Link>

        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong, please try again later.</p>}
        {!isLoading && !error && city && (
            <WeatherDetail city={city} />
        )}
    </div>
    );
}

export default CityDetailPage;