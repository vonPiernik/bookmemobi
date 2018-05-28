import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RemindPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            submitted: false
        };

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
        const { username } = this.state;
        const { dispatch } = this.props;
        if (username) {
            dispatch(userActions.remindPassword(username));
        }
    }

    render() {
        const { username, submitted } = this.state;
        return (
            <div className="auth-form-wrapper">
                <h2>Remind Password</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="button button-standard">Remind Me Password</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const connectedRemindPasswordPage = connect(mapStateToProps)(RemindPasswordPage);
export { connectedRemindPasswordPage as RemindPasswordPage }; 