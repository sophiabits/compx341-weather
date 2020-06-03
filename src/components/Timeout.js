import PropTypes from 'prop-types';
import React from 'react';

export default class Timeout extends React.Component {
    static propTypes = {
        callback: PropTypes.func.isRequired,
        delay: PropTypes.number.isRequired,
    };

    componentDidMount() {
        const { callback, delay } = this.props;
        this._timeoutId = setTimeout(() => callback(), delay);
    }

    componentDidUpdate(prevProps) {
        if (process.env.NODE_ENV !== 'production') {
            if (prevProps.callback !== this.props.callback || prevProps.delay !== this.props.delay) {
                console.warn('Timeout.js: `callback` and `delay` props are not permitted to change after mount.');
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this._timeoutId);
    }

    render() {
        return null;
    }
}
