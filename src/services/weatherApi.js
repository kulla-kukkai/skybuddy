const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function getCoordinates(cityName) {
    const url = `${GEOCODING_URL}?name=${encodeURIComponent(cityName)}&count=1&language=th&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("can't reach geocoding API");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(`can't find city "${cityName}"`);
    }

    const { name, country, latitude, longitude } = data.results[0];
    return { name, country, latitude, longitude };
}
