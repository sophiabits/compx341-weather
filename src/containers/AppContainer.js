import React from 'react';

import QueryInput from '../components/QueryInput';
import Weather from '../components/Weather';

import useWeather from '../lib/useWeather';

function AppContainer(props) {
    const weather = useWeather({
        accessKey: '6b7b471967dd0851d0010cdecf28f829',
    });
    const { loading } = weather.state;

    return (
        <div>
            <div className="row mt-4">
                <div className="col-sm-4"></div>
                <QueryInput disabled={loading} placeholder="City name (e.g. Hamilton)" onChange={weather.search} />
                <div className="col-sm-4"></div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    {loading && (
                        <div class="spinner-grow" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    )}
                    <Weather {...weather.state} clearResponse={weather.reset}/>
                </div>
                <div className="col-sm-2"></div>
            </div>
        </div>
    );
}

export default AppContainer;
