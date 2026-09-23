import { useState, useEffect, useContext } from "react";
import { getWeatherByCity } from "../services/weatherApi";
import { FavoritesContext } from "../context/FavoritesContext";
import CityCard from "../components/CityCard";
import CitySearchForm from "../components/CitySearchForm/CitySearchForm";

function HomePage() {
    const { favorites } = useContext(FavoritesContext);

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        async function fetchAllCities() {
        setIsLoading(true);
        setError(null);

        try {
            const results = await Promise.all(
            favorites.map((name) => getWeatherByCity(name))
            );
            setCities(results);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
        }

        fetchAllCities();
    }, [favorites]);

    return (
    <div>
        <h1>My Cities</h1>

        {showForm ? (
            <CitySearchForm onClose={() => setShowForm(false)} />
        ) : (
            <button onClick={() => setShowForm(true)}>+ Add city</button>
        )}


        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong, please try again later.</p>}
        {!isLoading && !error && (
            <div>
            {cities.map((city) => (
                <CityCard key={city.name} city={city} />
            ))}
            </div>
        )}
        </div>
    );
}

export default HomePage;