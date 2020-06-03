import React from 'react';

import { OPENWEATHERMAP_KEY } from '../config';

import QueryInput from '../components/QueryInput';
import Weather from '../components/Weather';

import useWeather from '../lib/useWeather';
import validateCityName from '../lib/validateCityName';

function AppContainer(props) {
    const weather = useWeather({
        accessKey: OPENWEATHERMAP_KEY,
    });
    const { loading } = weather.state;

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-sm-4" />
                <QueryInput
                    disabled={loading}
                    placeholder="City name (e.g. Hamilton)"
                    validator={validateCityName}
                    onChange={weather.search}
                />
                <div className="col-sm-4" />
            </div>
            <div className="row mt-4">
                <div className="col-sm-2" />
                <div className="col-sm-8">
                    {loading && (
                        <div class="spinner-grow" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    )}
                    <Weather {...weather.state} clearResponse={weather.reset}/>
                </div>
                <div className="col-sm-2" />
            </div>
        </div>
    );
}

export default AppContainer;
