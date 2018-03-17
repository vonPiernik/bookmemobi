import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
      
        <nav className="navbar navbar-expand-md static-top">
          <a className="navbar-brand" href="#"><strong>BookMeMobi</strong></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" activeClassName="active">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" activeClassName="active">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
              </li>
            </ul>
          </div>
        </nav>

      </div>
    );
  }
}

export default Navbar;
