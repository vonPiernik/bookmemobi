import React from 'react';
import './UserPage.css';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class UserPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: this.props.user.firstName,
            lastname: this.props.user.lastName,
            email: this.props.user.email,
            kindleEmail: this.props.user.kindleEmail
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

        const { firstname, lastname, email, kindleEmail } = this.state;
        const { dispatch } = this.props;
        dispatch(userActions.editUser({
            firstName: firstname,
            lastName: lastname,
            email: email,
            kindleEmail: kindleEmail
        }));
    }

    render() {
        const { firstname, lastname, email, kindleEmail } = this.state;
        return (
            <div className="user-page-wrapper">
                <div className="container">
                
                        <h1 className="bold-title">Edit user data</h1>
                        <p>You can edit here your account details.</p>

                        <div className="user-edit-core">
                            <form name="form" onSubmit={this.handleSubmit}>
                            <h3>Personal data</h3>
                                <div className={'form-group'}>
                                    <label htmlFor="firstname">First Name</label>
                                    <input type="text" className="form-control" name="firstname" value={firstname} onChange={this.handleChange} />
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" className="form-control" name="lastname" value={lastname} onChange={this.handleChange} />
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="email">Email Address</label>
                                    <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                                </div>

                            <h3>Kindle Email Settings</h3>
                                <div className={'form-group'}>
                                    <label htmlFor="kindleEmail">Kindle Email Address</label>
                                    <input type="text" className="form-control" name="kindleEmail" value={kindleEmail} onChange={this.handleChange} />
                                </div>

                            
                            <div className="form-group">
                                    <button className="button button-standard">Save</button>
                            </div>
                            </form>
                        </div>
                </div>
            </div>
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

const connectedUserPage = connect(mapStateToProps)(UserPage);
export { connectedUserPage as UserPage };