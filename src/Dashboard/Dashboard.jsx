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
import './Dashboard.css';

// var fileDownload = require('js-file-download');

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            dropzoneActive: false,
            files: [],
            sidebarShow: false
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
            sidebarShow: (this.state.sidebarShow ? false : true)
        });
       
    }
    showSidebar() {
        this.setState({
            sidebarShow: true
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
            <div className={"dashboard-wrapper " + (this.state.sidebarShow ? "dashboard-wrapper-side-bar-show" : "")}>
                <ActionBar />
                
                <div className="container">
                    <h1 className="bold-title">Hi {user.firstName}!</h1>
                    <p>This is your dashboard where you can see all your books.</p>
                    {/* <WeatherChart /> */}
                    <button type="button" className="button button-standard button-open-file-chooser" onClick={() => { dropzoneRef.open() }}>
                        Upload Book
                    </button>

                    <BooksList showSidebar={this.showSidebar.bind(this)}/>
                    
                    <br/>
                
                </div>
                
                {this.state.sidebarShow &&
                <div className="side-bar-overlay" onClick={this.toggleSidebar.bind(this)}></div>
                }                
                <SideBar    sidebarShow={this.state.sidebarShow}  
                            toggleSidebar={this.toggleSidebar.bind(this)}/>

            </div>
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