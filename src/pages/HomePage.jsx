import CityCard from '../components/CityCard';

function HomePage() {
    const cities = ['Stockholm', 'Göteborg', 'Malmö']; 

    return (
        <div>
        <h1>My Cities</h1>
        {cities.map((city) => (
            <CityCard key={city} cityName={city} />
        ))}
        </div>
    );
}

export default HomePage;