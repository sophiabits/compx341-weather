import fetch from 'isomorphic-unfetch'
import { useState } from 'react';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const INITIAL_WEATHER_STATE = {
    data: null,
    error: null,
    loading: false,
};

export default function useWeather(config = {}) {
    const { accessKey } = config;
    const [state, setState] = useState(INITIAL_WEATHER_STATE);

    function search(params) {
        setState({
            ...state,
            loading: true,
        });

        if (params.q) {
            params.q += ',nz';
        }

        const endpointUrl = makeQueryUrl(BASE_URL, {
            ...params,
            appid: accessKey,
            units: 'metric',
        });

        fetch(endpointUrl)
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

            latitude: response.coord.lat,
            longitude: response.coord.lon,
        },
    };
}

/**
 * Stringifies a URL with the given params applied as a query string.
 * Escapes param values so that they cannot contain invalid characters.
 * Note that this will fail in the case that `url` is a pathless url without
 * a trailing slash (e.g. "microsoft.com" instead of "microsoft.com/");
 *
 * @example
 * makeQueryUrl('google.com/', { q: 'value' }) === 'google.com/?q=value'
 *
 * @param {string} url
 * @param {{ [key: string]: any }} params
 */
function makeQueryUrl(url, params) {
    const qs = Object.entries(params).reduce((acc, [key, val]) => [
        ...acc,
        `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
    ], []).join('&');
    return `${url}?${qs}`;
}
