import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './Navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-light">
                    {!user &&
                    <Link to="/" className="navbar-brand">
                        <img src="/public/img/logo-poziom.png" />
                    </Link>
                    }
                    {user &&
                    <Link to="/" className="navbar-brand navbar-brand-logged-in">
                        <img src="/public/img/logo.png" className="logo-logged-in" />
                    </Link>
                    }
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                    {user && user.token && 
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink to="/landing" className="nav-link">
                                <img src="/public/img/icons/newspaper.png" alt="Landing"/>Landing</NavLink>                        
                            </li>
                            <li className="nav-item">
                                <NavLink to="/" exact className="nav-link">
                                <img src="/public/img/icons/home.png" alt="Dashboard"/>Dashboard</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="/public/img/icons/user.png" alt="Login"/>{ user.userName }
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <div className="dropdown-divider"></div>
                                    <Link to="/login" className="dropdown-item disabled">Logout</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                    }
                    {!user && 
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">
                                <img src="/public/img/icons/user.png" alt="Login"/>
                                Login</NavLink>                        
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">
                                <img src="/public/img/icons/users.png" alt="Register"/>
                                Register</NavLink>
                            </li>
                        </ul>
                    </div>
                    }
                </nav>
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

const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as Navbar }; 