import React from 'react';
import './UserPage.css';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class UserPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="user-page-wrapper">
                <div className="container">
                
                        <h1 className="bold-title">Edit user data</h1>
                        <p>You can edit here your account details.</p>

                        <div className="user-edit-core">
                            <h3>Personal data</h3>

                            <h3>Kindle Email Settings</h3>
                        </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedUserPage = connect(mapStateToProps)(UserPage);
export { connectedUserPage as UserPage };