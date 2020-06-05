import { Marker } from 'react-google-maps';
import React, { useEffect } from 'react';

import { GOOGLE_MAPS_KEY, OPENWEATHERMAP_KEY } from '../config';

import Map from '../components/Map';
import QueryInput from '../components/QueryInput';
import Weather from '../components/Weather';

import useDb from '../lib/useDb';
import useWeather from '../lib/useWeather';
import validateCityName from '../lib/validateCityName';

function AppContainer(props) {
    const [searches, addSearch] = useDb();
    const weather = useWeather({
        accessKey: OPENWEATHERMAP_KEY,
    });
    const { loading } = weather.state;

    useEffect(() => {
        const { data } = weather.state;
        if (data !== null) {
            // Record the searched city
            addSearch(data.name);
        }
    }, [addSearch, weather.state]);

    const handleClickMap = (event) => {
        weather.search({
            lat: event.latLng.lat(),
            lon: event.latLng.lng(),
        });
    };

    const handleQueryChange = (value) => {
        weather.search({
            q: value,
        });
    };

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-sm-4" />
                <QueryInput
                    disabled={loading}
                    id="usr"
                    invalid={weather.state.error !== null}
                    options={searches}
                    placeholder="City name (e.g. Hamilton)"
                    validator={validateCityName}
                    onChange={handleQueryChange}
                />
                <div className="col-sm-4" />
            </div>
            <div className="row mt-4">
                <div className="col-sm-2" />
                <div className="col-sm-8">
                    {loading && (
                        <div className="spinner-grow" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                    <Weather {...weather.state} clearResponse={weather.reset}/>
                </div>
                <div className="col-sm-2" />
            </div>
            <div className="row mt-4">
                <div className="col-sm-12" data-testid="map_container">
                    {renderMap(weather.state.data, handleClickMap)}
                </div>
            </div>
        </div>
    );
}

function renderMap(data, onClick) {
    let coords = null;
    if (data !== null) {
        coords = {
            lat: data.latitude,
            lng: data.longitude,
        };
    }

    return (
        <Map
            coords={coords}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}

            onClick={onClick}
        >
            {coords !== null && (
                <Marker position={coords} />
            )}
        </Map>
    );
}

export default AppContainer;
