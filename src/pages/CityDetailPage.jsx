import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getWeatherByCity } from "../services/weatherApi";

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

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong, please try again later.</p>;

    return (
    <div>
        <Link to="/">← Back to Home</Link>

        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong, please try again later.</p>}
        {!isLoading && !error && city && (
            <>
            <h1>{city.name}</h1>
            <p>Temperature: {city.current.temperature}°C</p>
            </>
        )}
    </div>
    );
}

export default CityDetailPage;