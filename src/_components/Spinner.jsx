import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.css';

export const Spinner = (props) => (
    <div className={"spinner "
                    + (props.role ? " spinner-role-" + props.role : "") }>
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
);

Spinner.propTypes = {
    role: PropTypes.string
};
