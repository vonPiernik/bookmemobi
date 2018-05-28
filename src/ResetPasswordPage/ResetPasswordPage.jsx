import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class ResetPasswordPage extends React.Component {
    constructor() {
        super();

        this.state = {
            userId: "",
            token: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { password, userId, token } = this.state;
        const { dispatch } = this.props;
        if (password && userId && token) {
            dispatch(userActions.resetPassword(password, userId, token));
        }
    }

    showPassword() {
        var x = document.getElementById("password-field");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    componentDidMount() {

        let url = new URL(window.location.href);
        let userId = url.searchParams.get('userId');
        let token = url.searchParams.get('token');
        // this.props.dispatch(userActions.resetPassword(userId, token));
        this.setState({
            userId: userId,
            token: token
        })
    }

    render() {
        const { password, submitted } = this.state;
        return (
            <div className="auth-form-wrapper">
                <h2>Set new password</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Your new password</label>
                        <input type="password" id="password-field" autoComplete="false" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        <label className="show-password-input-label"><input type="checkbox" onClick={this.showPassword} /> Show Password</label>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="button button-standard">Set password</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const connectedResetPasswordPage = connect(mapStateToProps)(ResetPasswordPage);
export { connectedResetPasswordPage as ResetPasswordPage };