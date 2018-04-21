import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LandingPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="landing-wrapper">
                <div className="container">
                
                    <div className="col-md-6 col-md-offset-3">
                        <h1 className="bold-title">Welcome to BookMeMobi!</h1>
                        <p>This is landing page</p>
                        <h3>All registered users:</h3>
                        {users.loading && <em>Loading users...</em>}
                        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                        {users.list &&
                            <ul>
                                {users.list.items.map((user, index) =>
                                    <li key={user.userName}>
                                        <strong>{ user.userName }</strong> ({user.firstName + ' ' + user.lastName})
                                        
                                    </li>
                                )}
                            </ul>
                        }
                        <p>
                            <Link className="button button-standard" to="/">Dashboard</Link>
                            <Link className="button button-less-important" to="/login">Logout</Link>
                        </p>
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

const connectedLandingPage = connect(mapStateToProps)(LandingPage);
export { connectedLandingPage as LandingPage };