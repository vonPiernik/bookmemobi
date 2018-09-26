import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { Navbar } from './Navbar';
import { AlertBox } from './AlertBox';
import { Dashboard } from '../Dashboard';
import { UserPage } from '../UserPage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ConfirmationPage } from '../ConfirmationPage';
import { RemindPasswordPage } from '../RemindPasswordPage';
import { ResetPasswordPage } from '../ResetPasswordPage';


import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
    componentDidMount(){
    }
    render() {
        const { alert } = this.props;
        return (
            <div className="wrapper" onContextMenu={()=>{return false;}}>
                <Router history={history}>
                    <div>
                        <Navbar />
                        <AlertBox />
                        <Route path="/" exact render={() => (
                                <Redirect to="/dashboard" />
                        )}/>
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                        <PrivateRoute path="/user" component={UserPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/confirm" component={ConfirmationPage} />
                        <Route path="/remind-password" component={RemindPasswordPage} />
                        <Route path="/resetPassword" component={ResetPasswordPage} />
                    </div>
                </Router>
    </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 