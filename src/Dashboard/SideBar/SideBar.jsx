import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { booksActions } from '../../_actions';
import { Button, Spinner } from '../../_components';

import './SideBar.css';


function DeletedBookOverlay(props){
    return(
        <div>
            {props.book && props.book.isDeleted &&
                <div className="deleted-book-overlay">
                    <p>This book is in trash.</p>
                    {/* <Button 
                        text="Restore"
                        type="less-important"
                        role="restore-book" 
                    /> */}
                </div>
            }
        </div>
    );
}

function BookLoadingSpinner(props){
    return(
        <div>
        {props.getBook && props.getBook.loading &&
            <Spinner role="side-bar" />
        }
        </div>
    )
}

function SideBarHeader(props){
    return(
        <div className="side-bar-header">
            <button className="side-bar-close-button" onClick={() => props.toggleSidebar()} >
                <span></span><span></span>
            </button>
            Book details
        </div>
    );
}

function BookTitle(props){
    return(
        <h3>{ props.title }</h3>
    );
}

function BookFile(props){
    return(
        <p><small>{ props.fileName } ( { props.size }MB )</small></p>
    );
}

function BookCover(props){
    return(
        <div className="book-cover">
            { props.coverUrl &&
                <img src={ props.coverUrl } alt={ props.title } />
            }
            { !props.coverUrl && <span>This book has no cover.</span> }
        </div>
    );
}

function SingleBook(props){
    const book = props.book;
    const getBook = props.getBook;
    const bookEditor = props.bookEditor;
    

    return(
        <div>
        {book &&
            <div className={"book-details"
                    + ((getBook && getBook.loading) ? " loading" : "")
                    + ((book && book.isDeleted) ? " deleted" : "")}>
    
            
                <BookTitle title={book.title} />
    
                <BookFile fileName={book.fileName} size={book.size} />

                <BookCover coverUrl={book.coverUrl} title={book.title} />
    
                {!bookEditor &&
                <p><strong>Author: </strong> { book.author } </p>
                }
                {bookEditor &&
                <p><strong>Author: </strong> <input type="text" name="author" value={this.state.author} onChange={this.handleChange} /> </p>
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
    )
}

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookEditor: false,
            edited: false,
            author: ""
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
        const { getBook, book, sidebarVisible, toggleSidebar } = this.props;
        const bookEditor = this.state.bookEditor;
        return (
            <div className={"side-bar " + (sidebarVisible ? "side-bar-show" : "side-bar-hide")} >

                <SideBarHeader toggleSidebar={toggleSidebar} />

                <BookLoadingSpinner getBook={getBook} />

                <DeletedBookOverlay book={book} />

                <a onClick={this.toggleBookEditor}>Edit book metadata</a>

                <SingleBook book={book}
                            getBook={getBook}
                            bookEditor={bookEditor} />
                
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