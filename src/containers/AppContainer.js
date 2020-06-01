import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch'

import QueryInput from '../components/QueryInput';
import Weather from '../components/Weather';

import handleWeatherResponse from '../lib/handleWeatherResponse';

const emptyWeatherResponse = {
    data: null,
    error: null,
};

function AppContainer(props) {
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(emptyWeatherResponse);

    const handleChange = async (cityName) => {
        setLoading(true);
        // TODO
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=imperial&q=${cityName},nz`);
        const json = await res.json();
        setResponseData(handleWeatherResponse(json));
        setLoading(false);
    };

    const clearResponse = () => setResponseData(emptyWeatherResponse);

    return (
        <div>
            <div className="row mt-4">
                <div className="col-sm-4"></div>
                <QueryInput disabled={loading} placeholder="City name (e.g. Hamilton)" onChange={handleChange} />
                <div className="col-sm-4"></div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <Weather {...responseData} clearResponse={clearResponse}/>
                </div>
                <div className="col-sm-2"></div>
            </div>
        </div>
    );
}

export default AppContainer;
