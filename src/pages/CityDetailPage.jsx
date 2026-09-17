import { useParams } from 'react-router-dom';

function CityDetailPage() {
    const { cityName } = useParams();

    return <div>Details: {cityName}</div>;
}

export default CityDetailPage;