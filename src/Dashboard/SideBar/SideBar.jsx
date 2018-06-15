import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { booksActions } from '../../_actions';
import { Button, Spinner } from '../../_components';

import './SideBar.css';

class BookEditor extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){

        return(
            <div>Test</div>
        );
    }
}


class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookEditor: false,
            edited: false,
            author: this.props.book ? this.props.book.author  : ''
        }
        
        this.toggleBookEditor = this.toggleBookEditor.bind(this);
        
        this.handleChange = this.handleChange.bind(this);
        this.editBook = this.editBook.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    editBook() {

        this.setState({ edited: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        dispatch(booksActions.editBook(this.props.book.id, {
            author: this.state.author
        }));
    }

    downloadBook(book){
        this.props.dispatch(booksActions.downloadBook(book))
    }

    deleteBook(bookId){
        this.props.dispatch(booksActions.deleteBook(bookId))
    }

    sendBook(bookId){
        this.props.dispatch(booksActions.sendBook(bookId))
    }

    toggleBookEditor(){
        this.setState( (prevState, props) => ({ bookEditor: !prevState.bookEditor }) )
    }

    render() {
        const { getBook, book } = this.props;
        const bookEditor = this.state.bookEditor;
        return (
            <div className={"side-bar " + (this.props.sidebarVisible ? "side-bar-show" : "side-bar-hide")} >

                {/* Sidebar header, by default visible only on mobile */}
                <div className="side-bar-header">
                    <button className="side-bar-close-button" onClick={() => this.props.toggleSidebar()} >
                        <span></span><span></span>
                    </button>
                    Book details
                </div>

                {getBook && getBook.loading &&
                    <Spinner role="side-bar" />
                }
                {book && book.isDeleted &&
                    <div className="deleted-book-overlay">
                        <p>This book is in trash.</p>
                        <Button 
                            text="Restore"
                            type="less-important"
                            role="restore-book" 
                        />
                    </div>
                }
                <a onClick={this.toggleBookEditor}>Edit book metadata</a>

                {/* If the book exist (is fetched with success) */}
                {book &&
                    <div className={"book-details"
                            + ((getBook && getBook.loading) ? " loading" : "")
                            + ((book && book.isDeleted) ? " deleted" : "")}>

                    
                        <h3>{ book.title }</h3>

                        <p><small>{ book.fileName } ( { book.size }MB )</small></p>

                        <div className="book-cover">
                            { book.coverUrl &&
                                <img src={ book.coverUrl } alt={ book.title } />
                            }
                            { !book.coverUrl && <span>This book has no cover.</span> }
                        </div>
                        {!bookEditor &&
                        <p><strong>Author: </strong> { book.author } </p>
                        }
                        {bookEditor &&
                        <p><strong>Author: </strong> <input type="text" name="author" value={book.author} onChange={this.handleChange} /> </p>
                        }
                        <p><strong>Publishing Date: </strong> { (book.publishingDate != null) ? book.publishingDate : "No data" }</p>

                        <br />
                        {!bookEditor &&
                        <div>
                        <Button 
                            text="Send book"
                            type="standard"
                            role="send-book" 
                            disabled={ book.isSentToKindle ? "disabled" : "" }
                            onClick={() => this.sendBook(book.id)}
                        />
                        <Button 
                            text="Download book file"
                            type="less-important"
                            role="download-book" 
                            onClick={() => this.downloadBook(book)}
                        />
                        <Button 
                            text="Delete this book"
                            type="danger"
                            role="delete-book" 
                            onClick={() => this.deleteBook(book.id)}
                        />
                        </div>
                        }
                        {bookEditor &&
                        <Button text="Save metadata" onClick={() => this.editBook()} />
                        }

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