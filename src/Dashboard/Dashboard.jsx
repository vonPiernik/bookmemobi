import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionBar } from './ActionBar';
import { SideBar } from './SideBar';
import { BooksList } from './BooksList';
import { WeatherChart } from './WeatherChart';
import { userActions } from '../_actions';
import { booksActions } from '../_actions';
import Dropzone from 'react-dropzone';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import './Dashboard.css';

// var fileDownload = require('js-file-download');

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            dropzoneActive: false,
            files: [],
            sidebarVisible: false
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
        if(files[0]){
            this.uploadBook(files);
        }
    }
    
    toggleSidebar() {
        this.setState({
            sidebarVisible: (this.state.sidebarVisible ? false : true)
        });
       
    }
    showSidebar() {
        this.setState({
            sidebarVisible: true
        });
       
    }

    uploadBook(files,){
        this.props.dispatch(booksActions.uploadBook(files))
    }

    render() {
        const { user, users, uploadBook, alert } = this.props;
        const { files, dropzoneActive } = this.state;
        let dropzoneRef;
        return (
            <Dropzone
                disableClick
                style={{position: "relative"}}
                onDrop={this.onDrop.bind(this)}
                ref={(node) => { dropzoneRef = node; }}
                accept=".mobi"
                onDragEnter={this.onDragEnter.bind(this)}
                onDragLeave={this.onDragLeave.bind(this)}
            >
            { dropzoneActive && <div className="dropzone-overlay">Drop files...</div> }
            <ContextMenuTrigger id="context_dashboard_main">
            <div className={"dashboard-wrapper " + (this.state.sidebarVisible ? "dashboard-wrapper-side-bar-show" : "")}>
        

                <ActionBar />
                
                <div className="container">
                    <h1 className="bold-title">Hi {user.firstName}!</h1>
                    <p>This is your dashboard where you can see all your books.</p>
                    {/* <WeatherChart /> */}
                    <button type="button" className="button button-standard button-open-file-chooser" onClick={() => { dropzoneRef.open() }}>
                        Upload Book
                    </button>

                    <BooksList 
                        showSidebar={this.showSidebar.bind(this)}
                        sidebarVisible={this.state.sidebarVisible} />
                    
                    <br/>
                
                </div>
                
                {this.state.sidebarVisible &&
                <div className="side-bar-overlay" onClick={this.toggleSidebar.bind(this)}></div>
                }                
                <SideBar    sidebarVisible={this.state.sidebarVisible}  
                            toggleSidebar={this.toggleSidebar.bind(this)}/>

            </div>

            <ContextMenu id="context_dashboard_main">
                <MenuItem onClick={() => { dropzoneRef.open() }}> 
                    <img src="/public/img/icons/cloud-computing.png" alt="Upload book"/>
                    Upload book
                </MenuItem>
                <MenuItem data={ "some_data"}> ContextMenu Item 2
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={ "some_data"}> ContextMenu Item 3
                </MenuItem>
            </ContextMenu>
            </ContextMenuTrigger>
            </Dropzone>


        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, uploadBook, alert } = state;
    const { user } = authentication;
    return {
        user,
        users,
        uploadBook,
        alert
    };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };