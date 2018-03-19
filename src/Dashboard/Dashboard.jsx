import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionBar } from './ActionBar';
import { userActions } from '../_actions';
import Dropzone from 'react-dropzone';

import './Dashboard.css';

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            dropzoneActive: false,
            files: []
        }
    }
    onDragEnter() {
        this.setState({
            dropzoneActive: true
        });
    }

    onDragLeave() {
        this.setState({
            dropzoneActive: false
        });
    }

    onDrop(files) {
        this.setState({
            files,
            dropzoneActive: false
        });
        console.log(files)
        if(files[0]){
            this.props.dispatch(userActions.upload(files, this.props.user.id));
        }
    }

    render() {
        const { user, users } = this.props;
        const { files, dropzoneActive } = this.state;
        return (
            <Dropzone
                disableClick
                style={{position: "relative"}}
                onDrop={this.onDrop.bind(this)}
                accept=".mobi"
                onDragEnter={this.onDragEnter.bind(this)}
                onDragLeave={this.onDragLeave.bind(this)}
            >
            { dropzoneActive && <div className="dropzone-overlay">Drop files...</div> }
            <div className="dashboard-wrapper">
                <ActionBar />
                
                <div className="col-md-6 col-md-offset-3">
                    <h1>Hi {user.firstName}!</h1>
                    <p>This is dashboard</p>
                    <p>
                        <Link to="/login" className="button button-less-important">Logout</Link>
                        <Link to="/landing" className="button button-standard">Landing</Link>
                    </p>
                </div>
            </div>
            </Dropzone>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, files } = state;
    const { user } = authentication;
    return {
        user,
        users,
        files
    };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };