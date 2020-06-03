import PropTypes from 'prop-types';
import React from 'react';

import Timeout from './Timeout';

function Weather(props) {
    const { data, error, clearResponse } = props;

    if (error !== null) {
        return (
            <React.Fragment>
                <div className="text-danger">{error}</div>
                <Timeout callback={clearResponse} delay={20000} />
            </React.Fragment>
        );
    } else if (data !== null) {
        return (
            <table className="table table-info table-hover">
                <tbody>
                    <tr>
                        <td>City</td>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <td>Temperature</td>
                        <td>{data.temp}</td>
                    </tr>
                    <tr>
                        <td>Pressure</td>
                        <td>{data.pressure}</td>
                    </tr>
                    <tr>
                        <td>Humidity</td>
                        <td>{data.humidity}</td>
                    </tr>
                    <tr>
                        <td>Temperature (Min)</td>
                        <td>{data.minTemp}</td>
                    </tr>
                    <tr>
                        <td>Temperature (Max)</td>
                        <td>{data.maxTemp}</td>
                    </tr>
                    <tr>
                        <td>Conditions</td>
                        <td>{data.conditions}</td>
                    </tr>
                </tbody>
            </table>
        );
    } else {
        return null;
    }
}

Weather.propTypes = {
    clearResponse: PropTypes.func.isRequired,
    data: PropTypes.shape({
        conditions: PropTypes.string,
        humidity: PropTypes.string,
        name: PropTypes.string,
        pressure: PropTypes.string,
        maxTemp: PropTypes.number,
        minTemp: PropTypes.number,
        temp: PropTypes.number,
    }),
    error: PropTypes.string,
};

export default Weather;
