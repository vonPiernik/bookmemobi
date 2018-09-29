import React from 'react';
import { connect } from 'react-redux';
import { SideBar } from './SideBar';
import { BooksList } from './BooksList';
import { booksActions } from '../_actions';
import BookRecommendationsModal from './BookRecommendationsModal/BookRecommendationsModal';

import { Button } from '../_components';

import Dropzone from 'react-dropzone';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import './Dashboard.css';
import { bookRecommendations } from '../_reducers/bookRecommendations.reducer';

// var fileDownload = require('js-file-download');

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            dropzoneActive: false,
            files: [],
            sidebarVisible: false,
            bookRecommendationsModalIsOpen: false,
        }

        this.openBookRecommendationsModal = this.openBookRecommendationsModal.bind(this);
        this.closeBookRecommendationsModal = this.closeBookRecommendationsModal.bind(this);
        this.getBookRecommendations = this.getBookRecommendations.bind(this);

    }

    // When you drag file(s) into drop area then activate Dropzone
    onDragEnter() {
        this.setState({
            dropzoneActive: true
        });
    }

    // When you stop draging files over drop area then disable Dropzone
    onDragLeave() {
        this.setState({
            dropzoneActive: false
        });
    }

    // When you drop files in drop area (Dropzone)
    onDrop(files) {
        this.setState({
            files,
            dropzoneActive: false
        });

        // If there are any files then run upload
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

    clearCache(key){
        this.props.dispatch(booksActions.clearCache(key))
    }

    uploadBook(files){
        this.props.dispatch(booksActions.uploadBook(files))
    }

    openBookRecommendationsModal() {
      this.setState({bookRecommendationsModalIsOpen: true});
    }

    closeBookRecommendationsModal() {
      this.setState({bookRecommendationsModalIsOpen: false});
    }

    getBookRecommendations(bookId) {
      this.props.dispatch(booksActions.getBookRecommendations(bookId));
    }

    render() {
        const { user, recommendations, bookRecommendations } = this.props;
        console.log(recommendations);
        console.log(`BookRecommendations: ${bookRecommendations}`);
        const { files, dropzoneActive, bookRecommendationsModalIsOpen } = this.state;
        let dropzoneRef;
        return (
            // Wrap whole dashboard in dropzone, so if you drop files anywhere in dashboard
            // upload will start
            <Dropzone
                disableClick
                style={{position: "relative"}}
                onDrop={this.onDrop.bind(this)}
                ref={(node) => { dropzoneRef = node; }} // allows triggering dropzone with button
                accept=".mobi"
                onDragEnter={this.onDragEnter.bind(this)}
                onDragLeave={this.onDragLeave.bind(this)}
            >

            {/* Dropzone overlay that shows up when you drag files over dashboard */}
            { dropzoneActive && <div className="dropzone-overlay">Drop files...</div> }

            {/*
              * Wrap whole dashboard in context menu trigger,
              * so right clicking anywhere in dashboard will trigger #context_dashboard_main menu
            */}
            <ContextMenuTrigger id="context_dashboard_main">

                {/* Give the wrapper class depending on sidebar visibility
                    It lets add padding to the wrapper when sidebar is open  */}
                <div className={"dashboard-wrapper "
                                + (this.state.sidebarVisible
                                ? "dashboard-wrapper-side-bar-show" : "")}>

                    {/* Render action bar */}
                    {/* <ActionBar /> */}

                    {/* Main dashboard container */}
                    <div className="container">

                        {/* Welcome message */}
                        <h1 className="bold-title">Hi {user.firstName}!</h1>
                        <p>This is your dashboard where you can see all your books.</p>

                        {/* Weahter chart, completely useless component */}
                        {/* <WeatherChart /> */}

                        {/* {files.map((file, i) => {
                            return (<p key={i}>{file.name}</p>)
                        })} */}

                        <div className="dropzone-previews"></div>

                        {/* Dropzone files counter */}
                        <div className="dropzone-progress">
                            {files.forEach((file) => {
                                <div className="file-progress">{file}</div>
                            })}
                        </div>



                        {/* Book upload button */}
                        <Button
                            text="Upload Book"
                            role="open-file-chooser"
                            onClick={() => { dropzoneRef.open() }}
                        />
                        {/* Show kindle email configuration manual */}
                        {/* <Button
                            text="Clear cache"
                            role="clear-cache"
                            onClick={() => { this.clearCache("books") }}
                        /> */}


                        {/* Books list */}
                        <BooksList
                            showSidebar={this.showSidebar.bind(this)}
                            sidebarVisible={this.state.sidebarVisible} />

                        <br/>

                    </div>

                    {/* If sidebar is open render an overlay (visible only on mobile) */}
                    {this.state.sidebarVisible &&
                        <div className="side-bar-overlay" onClick={this.toggleSidebar.bind(this)}></div>
                    }

                    {/* Sidebar */}
                    <SideBar    sidebarVisible={this.state.sidebarVisible}
                                toggleSidebar={this.toggleSidebar.bind(this)}
                                openBookRecommendationsModal={this.openBookRecommendationsModal}
                                getBookRecommendations={this.getBookRecommendations}
                                />
                    <BookRecommendationsModal
                      bookRecommendationsModalIsOpen={bookRecommendationsModalIsOpen}
                      closeBookRecommendationsModal={this.closeBookRecommendationsModal}
                      recommendations={recommendations}
                      bookRecommendations={bookRecommendations} />

                </div>

                {/* Context menu */}
                <ContextMenu id="context_dashboard_main">
                    <MenuItem onClick={() => { dropzoneRef.open() }}>
                        <img src="/public/img/icons/icon-upload-b.png" alt="Upload book"/>
                        Upload book
                    </MenuItem>
                    <MenuItem> ContextMenu Item 2 </MenuItem>
                    <MenuItem divider />
                    <MenuItem> ContextMenu Item 3 </MenuItem>
                </ContextMenu>

            </ContextMenuTrigger>
            </Dropzone>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, uploadBook, alert, bookRecommendations  } = state;
    const { user } = authentication;
    const { recommendations } = bookRecommendations;
    return {
        bookRecommendations,
        user,
        users,
        uploadBook,
        alert,
        recommendations,
    };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };