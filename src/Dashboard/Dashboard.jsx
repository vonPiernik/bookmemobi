import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionBar } from './ActionBar';
import { SideBar } from './SideBar';
import { BooksList } from './BooksList';
import { WeatherChart } from './WeatherChart';
import { userActions } from '../_actions';
import { bookActions } from '../_actions';
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

    componentWillMount(){
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

    toggleSidebar() {
        (this.props.book.sidebarOpened) ? this.props.dispatch(bookActions.hideSidebar()) : this.props.dispatch(bookActions.showSidebar());
    }

    render() {
        const { user, users, book } = this.props;
        const { files, dropzoneActive } = this.state;
        console.log(user);
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
            <div className={"dashboard-wrapper " + (book.sidebarOpened ? "dashboard-wrapper-side-bar-show" : "")}>
                <ActionBar />
                
                    <div className="container">
                    <h1 className="bold-title">Hi {user.firstName}!</h1>
                    <p>This is your dashboard where you can see all your books.</p>
                    <WeatherChart />
                    <ul>
                        {
                        files.map(f => <li>{f.name} - {f.size} bytes</li>)
                        }
                    </ul>

                    <BooksList />
                    
                    <br/>
                    <button className="button button-standard" onClick={this.toggleSidebar.bind(this)}>Toggle sidebar</button>
                
                    </div>
                
                <SideBar />
            </div>
            </Dropzone>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, files, book } = state;
    const { user } = authentication;
    return {
        user,
        users,
        files,
        book
    };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };