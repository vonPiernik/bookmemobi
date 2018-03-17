import React, { Component } from 'react';

// import connect
import { connect } from 'react-redux'

// import actions
import { registerUser } from '../actions/authActions.js'

class Register extends Component {
  unmaskPassword(){
    var passwordInput = document.getElementById("userRegisterFormPassword");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
  }
  render() {
    return (
      <div className="Register">
        
        <form action="#" onSubmit={(event) => this.props.registerUser(event)}>
                <h4>Register <br /><small>Create free account</small></h4>
                <hr />
                <div className="form-group">
                  <label htmlFor="userRegisterFormUsername">Username</label>
                  <input type="text" className="form-control" id="userRegisterFormUsername" aria-describedby="usernameHelp" placeholder="Enter your username" required/>
                </div>
                <div className="form-group">
                  <label htmlFor="userRegisterFormForename">Forename</label>
                  <input type="text" className="form-control" id="userRegisterFormForename" aria-describedby="ForenameHelp" placeholder="Enter your forename"  required/>
                </div>
                <div className="form-group">
                  <label htmlFor="userRegisterFormSurname">Surname</label>
                  <input type="text" className="form-control" id="userRegisterFormSurname" aria-describedby="surnameHelp" placeholder="Enter your surname"  required/>
                </div>
                <div className="form-group">
                  <label htmlFor="userRegisterFormEmail">Email</label>
                  <input type="email" className="form-control" id="userRegisterFormEmail" aria-describedby="emailHelp" placeholder="Enter your email"  required/>
                </div>
                <div className="form-group">
                  <label htmlFor="userRegisterFormPassword">Password</label>
                  <input type="password" className="form-control" id="userRegisterFormPassword" placeholder="Password" autocomplete="off" required/><input type="checkbox" onClick={() => this.unmaskPassword()} />Show Password
                  <small id="passwordHelp" className="form-text text-muted">Remember that your password should be strong.</small>
                </div>
                <button type="submit" className="btn btn-primary" id="signin-button" >Submit</button>
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
		registerUser: (event) => {
      event.preventDefault();
      var username = document.getElementById("userRegisterFormUsername");
      var forename = document.getElementById("userRegisterFormForename");
      var surname = document.getElementById("userRegisterFormSurname");
      var email = document.getElementById("userRegisterFormEmail");
      var password = document.getElementById("userRegisterFormPassword");

      var userData = {
        "username": username.value,
        "firstname": forename.value,
        "lastname": surname.value,
        "email": email.value,
        "password": password.value,
      }

      dispatch(registerUser(userData))

      
    }
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);