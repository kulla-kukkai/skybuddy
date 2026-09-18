const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function getCoordinates(cityName) {
    const url = `${GEOCODING_URL}?name=${encodeURIComponent(cityName)}&count=1&language=auto&format=json`;

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

export async function getForecast(latitude, longitude) {
    const url =
        `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}` +
        `&current_weather=true` +
        `&daily=weathercode,temperature_2m_max,temperature_2m_min` +
        `&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("can't reach forecast API");
    }

    return response.json();
}

export async function getWeatherByCity(cityName) {
    const location = await getCoordinates(cityName);
    const weather = await getForecast(location.latitude, location.longitude);

    return {
        ...location,
        current: weather.current_weather,
        daily: weather.daily,
    };
}
