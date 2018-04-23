import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export const Button = (props) => (
    <button 
        className={ 
                "button button-" 
                + props.type
                + (props.role ? " button-role-" + props.role : null)
                }
        onClick={ props.onClick }>
        { props.text }
    </button>
);

Button.defaultProps = {
    type: "standard",
};

Button.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    role: PropTypes.string
};
