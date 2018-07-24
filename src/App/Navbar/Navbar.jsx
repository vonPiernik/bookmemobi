import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, KindleEmailManual } from '../../_components';
import './Navbar.css';


class Navbar extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            mobileMenuVisible: false,
            userMenuVisible: false,
            kindleEmailManualVisible: false
        }
    }

    componentDidMount(){
        const userMenu = document.getElementById('userMenuDropdown');
        window.addEventListener('click', (e) => {   
            if (userMenu && !userMenu.contains(e.target)){
                this.setState({
                    userMenuVisible: false
                });
            }
        });

    }

    
    toggleKindleEmailManual(){
        this.setState((prevState,props) => ({
            kindleEmailManualVisible: !prevState.kindleEmailManualVisible
        }))
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

    // hideOnClickOutside(element) {
    //     const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ) 
    //     console.log(this)
    //     const outsideClickListener = event => {
    //         if (!element.contains(event.target)) { // or use: event.target.closest(selector) === null
    //             if (isVisible(element)) {
    //                 // element.style.display = 'none'
    //                 this.toggleUserMenu();
    //                 removeClickListener()
    //             }
    //         }
    //     }

    //     const removeClickListener = () => {
    //         document.removeEventListener('click', outsideClickListener)
    //     }

    //     document.addEventListener('click', outsideClickListener)
    // }


    render() {
        const { user } = this.props;
        return (
            <nav className="navbar">
                    {!user &&
                    <Link to="/login" className="navbar-brand navbar-brand-not-logged-in">
                        <img src="/public/img/logo-poziom.png" />
                    </Link>
                    }
                    {user &&
                    <Link to="/dashboard" className="navbar-brand navbar-brand-logged-in">
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
                    {user && user.tokens && 
                
                    <div className={"app-menu " + (this.state.mobileMenuVisible ? "mobile-menu-visible" : "mobile-menu-hidden")} id="appMenu">
                        <ul className="app-menu-left">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" onClick={this.toggleMobileMenu.bind(this)}>
                                <img src="/public/img/icons/newspaper.png" alt="Landing"/>Landing
                                </NavLink>                        
                            </li>
                            <li className="nav-item" onClick={this.toggleMobileMenu.bind(this)}>
                                <NavLink to="/dashboard" exact className="nav-link">
                                <img src="/public/img/icons/home.png" alt="Dashboard"/>Dashboard</NavLink>
                            </li>
                        </ul>
                        <ul className="app-menu-right">
                            { !user.isVerifiedAmazonConnection &&
                            <li className="nav-item">
                                {/* Show kindle email configuration manual */}
                                <Button 
                                    text="Configure connection"
                                    role="show-manual" 
                                    onClick={() => { this.toggleKindleEmailManual() }}
                                />
                            </li>
                            }
                            <li className="nav-item dropdown" id="userMenuDropdown">
                                <a className="nav-link dropdown-toggle" href="#" onClick={this.toggleUserMenu.bind(this)}>
                                    <img src="/public/img/icons/icon-user-b.png" alt="Login"/>{ user.userName }
                                </a>
                                {/* <div className={"user-menu " + (this.state.userMenuVisible ? "user-menu-visible" : "")} id="userMenu">
                                    <div className="dropdown-divider"></div>
                                    <Link to="/login" className="dropdown-item disabled"
                                             onClick={this.toggleMobileMenu.bind(this)}>
                                             Logout
                                    </Link>
                                </div> */}
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="dropdown-item disabled"
                                            onClick={this.toggleMobileMenu.bind(this)}>
                                            Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                    }
                    {!user && 
                    <div className={"app-menu app-menu-unauthorized " + (this.state.mobileMenuVisible ? "mobile-menu-visible" : "mobile-menu-hidden")} id="navbarSupportedContent">
                        <ul className="app-menu-right">
                            <li className="nav-item" onClick={this.toggleMobileMenu.bind(this)}>
                                <NavLink to="/login" className="nav-link">
                                <img src="/public/img/icons/user.png" alt="Login"/>
                                Login</NavLink>                        
                            </li>
                            <li className="nav-item" onClick={this.toggleMobileMenu.bind(this)}>
                                <NavLink to="/register" className="nav-link">
                                <img src="/public/img/icons/users.png" alt="Register"/>
                                Register</NavLink>
                            </li>
                        </ul>
                    </div>
                    }

                    {/* Render kindle email configuration manual */}
                    {this.state.kindleEmailManualVisible &&
                        <KindleEmailManual toggleKindleEmailManual={this.toggleKindleEmailManual.bind(this)} kindleEmail={user.kindleEmail} />
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