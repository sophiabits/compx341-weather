import PropTypes from 'prop-types';
import React, { useState } from 'react';

function QueryInput(props) {
    const [validationError, setValidationError] = useState(null);

    const validate = (event) => {
        const { validator, onChange } = props;
        if (typeof validator === 'function') {
            const validationError = validator(event.target.value);
            if (validationError !== null) {
                setValidationError(validationError);
                return;
            }
        }

        setValidationError(null);
        onChange(event.target.value);
    };

    return (
        <div className="col-sm-4">
            <div className="row">
                <div className="col-sm-10">
                    <style jsx="true">{`
                        .form-control::-webkit-input-placeholder {
                            color: #ddd;
                        }
                    `}
                    </style>
                    <input
                        aria-label="Search"
                        autoCorrect="off"
                        autoFocus
                        className="form-control"
                        id="usr"
                        placeholder={props.placeholder}
                        spellCheck={false}
                        type="text"
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                validate(event);
                            }
                        }}
                    />
                </div>
            </div>
            <div className="pl-3 row">
                <div className="text-danger small">{validationError}</div>
            </div>
        </div>
    );
}

QueryInput.propTypes = {
    placeholder: PropTypes.string,
    validator: PropTypes.func,
    onChange: PropTypes.func.isRequired,
};

export default QueryInput;
