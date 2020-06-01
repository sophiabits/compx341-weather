import fetch from 'isomorphic-unfetch'
import { useState } from 'react';

const INITIAL_WEATHER_STATE = {
    data: null,
    error: null,
    loading: false,
};

export default function useWeather(config = {}) {
    const { accessKey } = config;
    const [state, setState] = useState(INITIAL_WEATHER_STATE);

    function search(cityName) {
        setState({
            ...state,
            loading: true,
        });

        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${accessKey}&units=metric&q=${cityName},nz`)
            .then((res) => res.json())
            .then((res) => {
                setState({
                    ...handleWeatherResponse(res),
                    loading: false,
                });
            });
    }

    function reset() {
        setState(INITIAL_WEATHER_STATE);
    }

    return {
        reset,
        search,
        state,
    };
}

// Note: For some reason, error codes are strings and success (200) is a number
// e.g. (error) https://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric&q=wellin*,nz
// e.g. (success) https://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric&q=auckland,nz
function handleWeatherResponse(response) {
    if (response.cod === '400' || response.cod === '404') {
        return {
            error: response.message,
            data: null,
        };
    }

    return {
        error: null,
        data: {
            name: response.name,
            // TODO should we weather.map(w => w.description)?
            conditions: response.weather[0].description,
            humidity: response.main.humidity,
            pressure: response.main.pressure,
            temp: response.main.temp,
            maxTemp: response.main.temp_max,
            minTemp: response.main.temp_min,
        },
    };
}
