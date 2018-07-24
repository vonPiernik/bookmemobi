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
    if(!props.bookEditor){
        return(
            <h3>{ props.title }</h3>
        );
    } else {
        return(
            <h3>
                <input type="text" name="title" value={props.title} onChange={props.handleChange} />
            </h3>
        );
    }
}

function BookAuthor(props){
    if(!props.bookEditor){
        return(
            <p><strong>Author: </strong> { props.author } </p>
        );
    } else {
        return(
            <p><strong>Author: </strong> <input type="text" name="author" value={props.author} onChange={props.handleChange} /> </p>
        );
    }
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
    const user = props.user;
    const getBook = props.getBook;
    const bookEditor = props.bookEditor;
    

    return(
        <div>
        {book &&
            <div className={"book-details"
                    + ((getBook && getBook.loading) ? " loading" : "")
                    + ((book && book.isDeleted) ? " deleted" : "")}>
    

                <form onSubmit={() => props.editBook()} >
                <BookTitle title={props.title} handleChange={props.handleChange} bookEditor={bookEditor} />
    
                <BookFile fileName={book.fileName} size={book.size} />

                <BookCover coverUrl={book.coverUrl} title={book.title} />
    
                <BookAuthor author={props.author} handleChange={props.handleChange} bookEditor={bookEditor} />

                <p><strong>Publishing Date: </strong> { (book.publishingDate != null) ? book.publishingDate : "No data" }</p>
                
                {bookEditor &&
                <button type="submit" className="button button-default" onClick={() => props.editBook()} >Save metadata</button>
                }
                </form>
                
                <br />
                {!bookEditor &&
                <div>
                    {!book.isSentToKindle &&
                        <button className="button-with-icon" 
                                onClick={() => props.sendBook(book.id)} 
                                title={ !user.isVerifiedAmazonConnection ? "Connection with Amazon not verified" : "Send book on Kindle"}
                                disabled={ !user.isVerifiedAmazonConnection && "disabled" } >
                            <img src="/public/img/icons/icon-send.png" alt="Send book"/>
                        </button>
                    }
                    {book.isSentToKindle &&
                        <button className="button-with-icon" 
                                onClick={() => props.sendBook(book.id)}
                                title={ !user.isVerifiedAmazonConnection ? "Connection with Amazon not verified" : "Send book on Kindle (already sent at least once)" }
                                disabled={ !user.isVerifiedAmazonConnection && "disabled" } >
                            <img src="/public/img/icons/icon-send-b.png" alt="Send book"/>
                        </button>
                    }
                <button className="button-with-icon" onClick={() => props.toggleBookEditor()} title="Edit book metadata"><img src="/public/img/icons/icon-edit-b.png" alt="Edit book"/></button>
                <button className="button-with-icon" onClick={() => props.downloadBook(book)} title="Download book file"><img src="/public/img/icons/icon-download-b.png" alt="Download book"/></button>
                <button className="button-with-icon" onClick={() => props.deleteBook(book.id)} title="Delete book"><img src="/public/img/icons/icon-delete-b.png" alt="Delete book"/></button>
                </div>
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
            bookLoaded: false,
            bookEditor: false,
            title: "",
            author: ""
        }
        
        this.toggleBookEditor = this.toggleBookEditor.bind(this);
        
        this.handleChange = this.handleChange.bind(this);
        this.editBook = this.editBook.bind(this);
    }

    componentDidUpdate(){
        if(this.props.book && !this.state.bookLoaded){
            this.setState( (prevState, props) => ({ 
                bookLoaded: true,
                title: this.props.book.title,
                author: this.props.book.author
            }) );
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    editBook() {
        this.setState({ bookEditor: false });
        const { dispatch } = this.props;
        dispatch(booksActions.editBook(this.props.book.id, {
            title: this.state.title,    
            author: this.state.author
        }));
        this.setState({ bookEditor: false });
    }

    downloadBook(book){
        this.props.dispatch(booksActions.downloadBook(book));
    }

    deleteBook(bookId){
        this.props.dispatch(booksActions.deleteBook(bookId));
    }

    sendBook(bookId){
        this.props.dispatch(booksActions.sendBook(bookId));
    }

    getBook(bookId){
        this.props.dispatch(booksActions.getBook(bookId));
    }

    toggleBookEditor(){
        this.setState( (prevState) => ({ 
            bookEditor: !prevState.bookEditor,
            title: this.props.book.title,
            author: this.props.book.author
        }) );
    }

    render() {
        const { getBook, book, sidebarVisible, toggleSidebar, user } = this.props;
        const bookEditor = this.state.bookEditor;
        return (
            <div className={"side-bar " + (sidebarVisible ? "side-bar-show" : "side-bar-hide")} >

                <SideBarHeader toggleSidebar={toggleSidebar} />

                <BookLoadingSpinner getBook={getBook} />

                <DeletedBookOverlay book={book} />

                <SingleBook book={book}
                            user={user}
                            getBook={getBook}
                            bookEditor={bookEditor} 
                            title={this.state.title}
                            author={this.state.author}
                            handleChange={this.handleChange}
                            sendBook={ bookId => this.sendBook(bookId) }
                            deleteBook={ bookId => this.deleteBook(bookId) }
                            downloadBook={ bookId => this.downloadBook(bookId) }
                            editBook={this.editBook}
                            toggleBookEditor={this.toggleBookEditor}
                             />
                
            </div>
        );
    }
}

// export default SideBar;
function mapStateToProps(state) {
    const { getBook, authentication } = state;
    const { book } = getBook;
    const { user } = authentication;
    return {
        getBook,
        book,
        user
    };
}

const connectedSideBar = connect(mapStateToProps)(SideBar);
export { connectedSideBar as SideBar }; 