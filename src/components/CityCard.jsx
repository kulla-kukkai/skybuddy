import { Link } from "react-router-dom";

function CityCard({ city }) {
    const { name, current } = city;

    return (
        <Link to={`/city/${name}`}>
        <div className="city-card">
            <h2>{name}</h2>
            {current && <p>{current.temperature}°C</p>}
        </div>
        </Link>
    );
}

export default CityCard;