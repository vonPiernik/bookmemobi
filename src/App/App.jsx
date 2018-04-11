import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { Navbar } from './Navbar';
import { AlertBox } from './AlertBox';
import { Dashboard } from '../Dashboard';
import { LandingPage } from '../LandingPage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';


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
        //prevent right click
        document.getElementById("app").oncontextmenu = function (e) {
            e.preventDefault();
        };
    }
    render() {
        const { alert } = this.props;
        return (
            <div className="wrapper" onContextMenu={()=>{return false;}}>
                <Router history={history}>
                    <div>
                        <Navbar />
                        <AlertBox />
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <Route path="/landing" component={LandingPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
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