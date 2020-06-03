import {
    GoogleMap,
    withGoogleMap,
    withScriptjs,
} from 'react-google-maps';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

const WELLINGTON_COORDS = {
    lat: -41.18,
    lng: 174.47,
};

const Map = ({ coords, innerRef, ...props }) => {
    const mapRef = useRef(null);
    useEffect(() => {
        if (coords) {
            mapRef.current.panTo(coords);
        }
    }, [coords]);

    return (
        <GoogleMap
            ref={mapRef}
            defaultCenter={WELLINGTON_COORDS}
            defaultZoom={8}
            {...props}
        />
    );
};

Map.propTypes = {
    /**
     * Coordinates to center the map on. If this value changes, the map will
     * pan to the new coordinates. If no coordinates are given, the map defaults
     * to centering over Wellington city.
     */
    coords: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
};

export default withScriptjs(withGoogleMap(Map));
