import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Typeahead, TypeaheadInputSingle } from 'react-bootstrap-typeahead';

function QueryInput(props) {
    const inputRef = useRef(null);
    const [validationError, setValidationError] = useState(null);

    const { disabled, invalid, options, placeholder, id } = props;

    const handleChange = ([value]) => {
        // assume that anything which came from the dropdown will be valid
        if (value) {
            setValidationError(null);
            props.onChange(value);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key !== 'Enter') {
            return;
        }

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
            <div className="pl-3 row">
                <div className="text-danger small">{validationError}</div>
            </div>
            <div className="row">
                <div className="col-sm-10">
                    <style jsx="true">{`
                        .form-control::-webkit-input-placeholder {
                            color: #ddd;
                        }
                    `}
                    </style>

                    <Typeahead
                        ref={inputRef}
                        id={`${id}-menu`}
                        autoFocus
                        options={options}

                        renderInput={(props) => (
                            <TypeaheadInputSingle
                                {...props}
                                autoComplete="off"
                                autoCorrect="off"
                                aria-label="Search"
                                disabled={disabled}
                                id={id}
                                isInvalid={validationError !== null || invalid}
                                placeholder={placeholder}
                                spellCheck={false}
                                type="text"
                            />
                        )}

                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
}

QueryInput.propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    invalid: PropTypes.bool,
    /** Drop down options to show to the user. */
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string,
    validator: PropTypes.func,
    onChange: PropTypes.func.isRequired,
};

export default QueryInput;
