import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class ConfirmationPage extends React.Component {
    constructor() {
        super();

        this.state = {
            userId: ""
        }
    }
    componentDidMount() {

        let url = new URL(window.location.href);
        let userId = url.searchParams.get('userId');
        let token = url.searchParams.get('token');
        this.props.dispatch(userActions.confirm(userId, token));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="landing-wrapper">
                <div className="container">

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

const connectedConfirmationPage = connect(mapStateToProps)(ConfirmationPage);
export { connectedConfirmationPage as ConfirmationPage };