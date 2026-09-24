const WEATHER_CODE_MAP = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
};

export function getWeatherDescription(code) {
    return WEATHER_CODE_MAP[code] || "Unknown weather";
}

const WEATHER_ICON_MAP = {
    0: "clear-sky",
    1: "clear-sky",
    2: "partly-cloudy",
    3: "overcast",
    45: "fog",
    48: "fog",
    51: "drizzle",
    53: "drizzle",
    55: "drizzle",
    61: "rain",
    63: "rain",
    65: "rain",
    71: "snow",
    73: "snow",
    75: "snow",
    80: "rain-showers",
    81: "rain-showers",
    82: "rain-showers",
    95: "thunderstorm",
};

export function getWeatherIcon(code) {
    return WEATHER_ICON_MAP[code] || "overcast";
}