import { useState, useEffect, useCallback } from "react";
import { getWeatherByCity, getWeatherByCoords } from "../services/weatherApi";

function useWeatherData(initialCityName) {
    const [city, setCity] = useState(null);
    const [cityLabel, setCityLabel] = useState(initialCityName || null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadCity = useCallback(async (name) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await getWeatherByCity(name);
            setCity(result);
            setCityLabel(result.name); // ใช้ชื่อที่ API แก้ให้ถูกต้องแล้ว แทนข้อความดิบที่พิมพ์เข้ามา
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loadCurrentLocation = useCallback(() => {
        setIsLoading(true);
        setError(null);
        setCityLabel(null);

        if (!navigator.geolocation) {
        setError("Geolocation is not supported on this device");
        setIsLoading(false);
        return;
        }

        navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
            const result = await getWeatherByCoords(
                position.coords.latitude,
                position.coords.longitude
            );
            setCity(result);
            } catch (err) {
            setError(err.message);
            } finally {
            setIsLoading(false);
            }
        },
        () => {
            setError("Location access denied. Pick a saved city below instead.");
            setIsLoading(false);
        }
        );
    }, []);

    useEffect(() => {
        if (initialCityName) {
        loadCity(initialCityName);
        } else {
        loadCurrentLocation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialCityName]);

    return { city, cityLabel, isLoading, error, loadCity, loadCurrentLocation };
}

export default useWeatherData;