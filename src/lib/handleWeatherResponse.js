export default function handleWeatherResponse(response) {
    // TODO check if string is the correct type
    if (response.cod === '400' || response.cod === '404') {
        return {
            error: response.message,
            data: null,
        };
    }

    // TODO should we be checking === 200?
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
