import React from 'react';
import { connect } from 'react-redux';
import { booksActions } from '../../_actions';
import { Spinner } from '../../_components';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import './BooksList.css';

 
// Create relative date/time formatter.
TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US')

class BooksListRow extends React.Component {
    
    getDateWithTimezoneOffset(date){
        let dateWithoutOffset = new Date(date);
        let offsetInMiliseconds = (dateWithoutOffset.getTimezoneOffset() * 60 * 1000);
        return(new Date(dateWithoutOffset.getTime() -    offsetInMiliseconds));
    }

    render() {
        const book = this.props.book;
        const bookRowActive = this.props.bookRowActive;
        const uploadDate = this.getDateWithTimezoneOffset(book.uploadDate);
        return (
            <div>
            <ContextMenuTrigger id={"context_books_list_item" + book.id}>
            <div onClick={this.props.onClick} className={"books-list-row" + (bookRowActive ? " active" : "")}>
                {/* <div>
                    <span className="book-letter-indicator">P</span>
                    <img src={ book.coverUrl } alt={ book.title }/>
                </div> */}
                <div className="books-list-column column-title">
                    {book.title}
                </div>
                <div className="books-list-column column-author">
                    {book.author}
                </div>
                <div className="books-list-column column-format">
                    .{ book.format }
                </div>
                <div className="books-list-column column-size">
                    {book.size}MB
                </div>
                {/* <div>
                    {book.publishingDate}
                </div> */}
                <div className="books-list-column column-upload-date">
                    {timeAgo.format(uploadDate)}
                </div>
            </div>
            </ContextMenuTrigger>
            
            
            {/* Context menu */}
            <ContextMenu id={"context_books_list_item" + book.id}>
                <MenuItem onClick={() => { this.props.getBook(); }}>  
                    Book details
                </MenuItem>
            </ContextMenu>
            </div>
      );
    }
}

class Pagination extends React.Component {
    render() {
        const {list, getUserBooks} = this.props;
        return (
            <div className="pagination">
                <button 
                    className="button button-pagination button-pagination-prev"
                    disabled={list.hasPreviousPage ? "" : "disabled" }
                    onClick={() => getUserBooks({ pageNumber: (list.pageNumber - 1)})} //get previous page
                    >
                    Previous page
                </button>
                <div className="pagination-counter">
                    <span className="current">{ list.pageNumber }</span>
                    /
                    <span className="total">{ list.totalPages }</span>
                </div>
                <button 
                    className="button button-pagination button-pagination-next"
                    disabled={list.hasNextPage ? "" : "disabled" }
                    onClick={() => getUserBooks({ pageNumber: (list.pageNumber + 1)})} //get next page
                    >
                    Next page
                </button>
            </div>
        )
    }
}

class BooksListColumnHeader extends React.Component {
    render() {
        const   {title, slug, orderingType, orderBy} = this.props;
        return(
            <div className={"books-list-column column-" + slug} onClick={() => { this.props.sortBooks({orderBy: slug}) }}>
                    { title }

                    {orderingType === "asc" && orderBy === slug &&
                        <div className="arrow-up"></div>    
                    }
                    {orderingType === "desc" && orderBy === slug &&
                        <div className="arrow-down"></div>
                    }
            </div>
        );
    }
}

class BooksList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortingArgs: {
                orderBy: "",
                orderingType: "asc" 
            }
        }
    }

    componentDidMount(){
        this.getUserBooks();
    }

    sortBooks(args){
        if(args && args.orderBy){
            this.setState((prevState,props) => ({
                sortingArgs: {
                    orderBy: args.orderBy,
                    orderingType: (prevState.sortingArgs.orderingType === "asc" ? "desc" : "asc")
                }
            }), () => {
                this.getUserBooks();
            });
        }
    }

    getUserBooks(args = {}){
        console.log(args)
        args = {
            ...this.props.userBooks.args,
            ...args,
            orderBy: (this.state.sortingArgs.orderBy + " " + this.state.sortingArgs.orderingType)
        };
        console.log(args);
        this.props.dispatch(booksActions.getUserBooks(args));
    }

    getBook(bookId){
        this.props.dispatch(booksActions.getBook(bookId));
    }

    setArgs(args){
        this.props.dispatch(booksActions.setArgs(args));
    }

    render() {
        const   { getBook, user, userBooks, sidebarVisible } = this.props,
                { orderingType, orderBy } = this.state.sortingArgs,
                rows = [];
        let bookRowActive = false;

        if( userBooks.list ){
            userBooks.list.items.forEach((book) => {

                // if a book is selected (and fetched from the server) and the sidebar is open
                // set the current book (row) as active
                if(getBook.book && sidebarVisible && getBook.book.id === book.id){
                    bookRowActive = true;
                } else {
                    bookRowActive = false;
                }

                rows.push(
                    <BooksListRow
                        key={book.id}
                        book={book} 
                        bookRowActive={bookRowActive}
                        getBook={() => { 
                            this.getBook(book.id); //fetch book with specified id
                            this.props.showSidebar(); //show the sidebar
                        } }
                        onClick={() => { 
                                    this.getBook(book.id); //fetch book with specified id
                                    this.props.showSidebar(); //show the sidebar
                                } } />
                );

            })
        }
        return (
            <div className="booksList">
                <div className="booksList-nav">
                    <div className="all-books-tab">Your books</div>
                    <div className="deleted-books-tab">Deleted</div>
                </div>

                {/* book upload progress indicator */}
                <div id="progressBox">
                    <div id="progressIndicator"></div>
                </div>

                <div className={"books-list" + ( userBooks.loading ? " loading" : "" ) }>
                    <div className="books-list-header">
                        <BooksListColumnHeader sortBooks={this.sortBooks.bind(this)} orderingType={orderingType} orderBy={orderBy} title="Book name" slug="title" />
                        <BooksListColumnHeader sortBooks={this.sortBooks.bind(this)} orderingType={orderingType} orderBy={orderBy} title="Author(s)" slug="author" />
                        <BooksListColumnHeader sortBooks={this.sortBooks.bind(this)} orderingType={orderingType} orderBy={orderBy} title="Format" slug="format" />
                        <BooksListColumnHeader sortBooks={this.sortBooks.bind(this)} orderingType={orderingType} orderBy={orderBy} title="File size" slug="size" />
                        <BooksListColumnHeader sortBooks={this.sortBooks.bind(this)} orderingType={orderingType} orderBy={orderBy} title="Added" slug="uploadDate" />
                    </div>
                    <div className="books-list-body">
                       { rows }
                    </div>
                </div> 
                { userBooks.loading && <Spinner role="books-list" /> }
                {/* If books list didn't contain any books display an info message */}
                { userBooks.list && userBooks.list.totalItems == 0 && 
                    <p className="no-books">You don't have any books. Add one now</p> 
                }
                
                {/* If books list contains at least one page render pagination */}
                { userBooks.list && userBooks.list.totalPages > 0 &&
                    <Pagination list={userBooks.list}
                                getUserBooks={this.getUserBooks.bind(this)} />
                }
            </div>
        );
    }
}
// export default BooksList;
function mapStateToProps(state) {
    const { getBook, userBooks, downloadBook, authentication } = state;
    const { user } = authentication;
    return {
        getBook,
        userBooks,
        downloadBook,
        user
    };
}

const connectedBooksList = connect(mapStateToProps)(BooksList);
export { connectedBooksList as BooksList }; 