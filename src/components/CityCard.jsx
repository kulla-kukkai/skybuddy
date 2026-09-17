import { Link } from 'react-router-dom';

function CityCard({ cityName }) {
    return (
        <Link to={`/city/${cityName}`}>
        <div>{cityName}</div>
        </Link>
    );
    }

export default CityCard;