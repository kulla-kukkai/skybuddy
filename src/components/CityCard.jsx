import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

function CityCard({ city }) {
    const { removeFavorite } = useContext(FavoritesContext);
    const { name, current } = city;

    function handleRemove(e) {
        e.preventDefault();
        e.stopPropagation();
        removeFavorite(name);
    }

    return (
        <div style={{ position: "relative" }}>
        <Link to={`/city/${name}`}>
            <div className="city-card">
            <h2>{name}</h2>
            {current && <p>{current.temperature}°C</p>}
            </div>
        </Link>
        <button onClick={handleRemove}>✕</button>
        </div>
    );
}

export default CityCard;