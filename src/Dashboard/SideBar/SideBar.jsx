import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { booksActions } from '../../_actions';

import './SideBar.css';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    downloadBook(book){
        this.props.dispatch(booksActions.downloadBook(book))
    }

    deleteBook(bookId){
        this.props.dispatch(booksActions.deleteBook(bookId))
    }

    render() {
        const { getBook, book } = this.props;
        return (
            <div className={"side-bar " + (this.props.sidebarShow ? "side-bar-show" : "side-bar-hide")} >
                <div className="side-bar-header">
                    <button className="side-bar-close-button" onClick={() => this.props.toggleSidebar()} >
                        <span></span><span></span>
                    </button>
                    Book details
                </div>
                {getBook && getBook.loading &&
                    <p>Loading...</p>
                }
                {book &&
                    <div className="book-details">
                        <h3>{ book.title }</h3>
                        <p><small>{ book.fileName } ( { book.size }MB )</small></p>
                        <div className="book-cover">
                            <span>This book has no cover.</span>
                        </div>
                        <p><strong>Author: </strong> { book.author } </p>
                        <p><strong>Publishing Date: </strong> { book.publishingDate }</p>
                        <br />
                        <button     className="button button-less-important" 
                                    onClick={() => this.downloadBook(book)}>
                                    Download book file
                        </button>
                        <button     className="button button-danger" 
                                    onClick={() => this.deleteBook(book.id)}>
                                    Delete this book
                        </button>
                    </div>


                }
            </div>
        );
    }
}
// export default SideBar;
function mapStateToProps(state) {
    const { getBook } = state;
    const { book } = getBook;
    return {
        getBook,
        book
    };
}

const connectedSideBar = connect(mapStateToProps)(SideBar);
export { connectedSideBar as SideBar }; 