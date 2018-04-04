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
    render() {
        const book = this.props.book;
        const uploadDate = new Date(book.uploadDate);
        return (
            <tr onClick={this.props.onClick}>
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

class BooksList extends React.Component {
    constructor(props) {
        super(props);

        // console.log(this.props);
    }

    componentDidMount(){
        this.props.dispatch(booksActions.getUserBooks())
        
    }

    // downloadBook(book){
    //     this.props.dispatch(booksActions.downloadBook(book))
    // }

    getBook(bookId){
        this.props.dispatch(booksActions.getBook(bookId))
    }

    render() {
        const { user, userBooks } = this.props;
        const rows = [];
        if( userBooks.list ){
            userBooks.list.items.forEach((book) => {
                rows.push(
                    <BooksListRow
                        key={book.id}
                        book={book} 
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
                        { userBooks.loading && <tr><td></td><td>Loading books...</td></tr> }
                        { userBooks.list && userBooks.list.totalItems == 0 && <tr><td></td><td>You don't have any books. Add one now!</td></tr> }
                        { rows }
                        
                    </tbody>
                </table>
            </div>
        );
    }
}
// export default BooksList;
function mapStateToProps(state) {
    const { userBooks, downloadBook, authentication } = state;
    const { user } = authentication;
    return {
        userBooks,
        downloadBook,
        user
    };
}

const connectedBooksList = connect(mapStateToProps)(BooksList);
export { connectedBooksList as BooksList }; 