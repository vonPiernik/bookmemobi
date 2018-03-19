import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './ActionBar.css';

class ActionBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        return (
            <div className="action-bar">
                <Link to="/">
                    <img src="/public/img/icons/user.png" alt="User profile"/>
                </Link>
                <Link to="/">
                    <img src="/public/img/icons/settings.png" alt="User settings"/>
                </Link>
                <Link to="/">
                    <img src="/public/img/icons/cloud-computing.png" alt="Upload books"/>
                </Link>
            </div>
        );
    }
}
// export default ActionBar;
function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedActionBar = connect(mapStateToProps)(ActionBar);
export { connectedActionBar as ActionBar }; 