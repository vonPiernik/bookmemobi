import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { booksActions } from '../../_actions';


import TimeAgo from 'javascript-time-ago'
 
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'
 
// Add locale-specific relative date/time formatting rules.
TimeAgo.locale(en)
 
// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')

import './BooksList.css';

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
            <tr onClick={this.props.onClick} className={(bookRowActive) ? "active" : ""}>
                <td><span className="book-letter-indicator">P</span></td>
                <td>
                    {book.title}
                </td>
                <td>
                    {book.author}
                </td>
                <td>
                    .{ book.format }
                </td>
                <td>
                    {book.size}MB
                </td>
                {/* <td>
                    {book.publishingDate}
                </td> */}
                <td>
                    {timeAgo.format(uploadDate)}
                </td>
            </tr>
      );
    }
}

class Pagination extends React.Component {
    render() {
        const list = this.props.list;
        return (
            <div className="pagination">
            <button 
                className="button button-pagination button-pagination-prev"
                disabled={list.hasPreviousPage ? "" : "disabled" }
                onClick={() => this.getUserBooks({ pageNumber: (list.pageNumber - 1)})}
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
                onClick={() => this.getUserBooks({ pageNumber: (list.pageNumber + 1)})}
                >
                Next page
            </button>
            </div>
        )
    }
}

class BooksList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.getUserBooks();
    }

    getUserBooks(args){
        this.props.dispatch(booksActions.getUserBooks(args));
    }

    getBook(bookId){
        this.props.dispatch(booksActions.getBook(bookId));
    }

    render() {
        const { getBook, user, userBooks, sidebarVisible } = this.props;
        const rows = [];
        let bookRowActive = false;
        if( userBooks.list ){
            userBooks.list.items.forEach((book) => {
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
                        onClick={() => { 
                                    this.getBook(book.id);
                                    this.props.showSidebar();
                                } } />
                );
            })
        }
        return (
            <div className="booksList">
                <table className="books-list">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Book name</th>
                            <th>Author(s)</th>
                            <th>Format</th>
                            <th>File size</th>
                            {/* <th>Published</th> */}
                            <th>Added</th>
                        </tr>
                    </thead>
                    <tbody>
                       { rows }
                        
                    </tbody>
                </table> 
                { userBooks.loading && <p>Loading books...</p> }
                { userBooks.list && userBooks.list.totalItems == 0 && 
                    <p className="no-books">You don't have any books. Add one now</p> }
                        
                { userBooks.list && userBooks.list.totalPages > 0 &&
                    <Pagination list={userBooks.list} />
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