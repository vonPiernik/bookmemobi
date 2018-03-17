import React, { Component } from 'react';

import { Link } from "react-router-dom";

// import connect
import { connect } from 'react-redux'

// import actions
import logInUser from '../actions/authActions.js'

class Login extends Component {
  render() {
    return (
      <div className="Login">
              <form action="#" onSubmit={(event) => this.props.logInUser(event)}>
                <h4>Sign in <br /><small>If you don't have an account you can get one here: <Link to="/register">Register</Link></small></h4>
                <hr />
                <div className="form-group">
                  <label htmlFor="userSigninFormUsername">Username</label>
                  <input type="text" className="form-control" id="userSigninFormUsername" aria-describedby="usernameHelp" placeholder="Enter your username" required />
                </div>
                <div className="form-group">
                  <label htmlFor="userSigninFormPassword">Password</label>
                  <input type="password" className="form-control" id="userSigninFormPassword" placeholder="Password" required/>
                </div>
                <button type="submit" className="btn btn-primary" id="signin-button">Submit</button>
              </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		state: state //remember to optimize this or delete
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		logInUser: (event) => {
      event.preventDefault;

      var username = document.getElementById("userSigninFormUsername");
      var password = document.getElementById("userSigninFormPassword");

      var userData = {
        "username": username.value,
        "password": password.value,
      }

			dispatch(logInUser(userData))
    }
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
