import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './Navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileMenuVisible: false,
            userMenuVisible: false
        }
    }

    toggleMobileMenu() {
        this.setState({
            mobileMenuVisible: (this.state.mobileMenuVisible ? false : true)
        });
    }
    toggleUserMenu() {
        
        this.setState({
            userMenuVisible: (this.state.userMenuVisible ? false : true)
        });
        
    }

    render() {
        const { user } = this.props;
        return (
            <nav className="navbar">
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
                <button className="navbar-toggler" type="button" onClick={this.toggleMobileMenu.bind(this)}>
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
                </button>
                    {this.state.mobileMenuVisible &&
                    <div className="mobile-menu-overlay" onClick={this.toggleMobileMenu.bind(this)}></div>
                    }
                    {user && user.token && 
                
                    <div className={"app-menu " + (this.state.mobileMenuVisible ? "mobile-menu-visible" : "mobile-menu-hidden")} id="appMenu">
                        <ul className="app-menu-left">
                            <li className="nav-item">
                                <NavLink to="/landing" className="nav-link">
                                <img src="/public/img/icons/newspaper.png" alt="Landing"/>Landing</NavLink>                        
                            </li>
                            <li className="nav-item">
                                <NavLink to="/" exact className="nav-link">
                                <img src="/public/img/icons/home.png" alt="Dashboard"/>Dashboard</NavLink>
                            </li>
                        </ul>
                        <ul className="app-menu-right">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" onClick={this.toggleUserMenu.bind(this)}>
                                <img src="/public/img/icons/user.png" alt="Login"/>{ user.userName }
                                </a>
                                <div className={"user-menu " + (this.state.userMenuVisible ? "user-menu-visible" : "")}>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/login" className="dropdown-item disabled">Logout</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                    }
                    {!user && 
                    <div className={"app-menu app-menu-unauthorized " + (this.state.mobileMenuVisible ? "mobile-menu-visible" : "mobile-menu-hidden")} id="navbarSupportedContent">
                        <ul className="app-menu-right">
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
    const { users, authentication, book } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as Navbar }; 