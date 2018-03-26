import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './BooksList.css';

class BooksList extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    render() {
        return (
            <div className="booksList">
                <table className="books-list">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Book name</th>
                            <th>Author(s)</th>
                            <th>Format</th>
                            <th>Added</th>
                            <th>On Kindle?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span className="book-letter-indicator">P</span></td>
                            <td>W poszukiwaniu straconego czasu</td>
                            <td>Proust, Marcel</td>
                            <td>.mobi</td>
                            <td>yesterday</td>
                            <td><span className="on-kindle">Yes</span></td>
                        </tr>
                        <tr>
                            <td><span className="book-letter-indicator book-letter-indicator--green">M</span></td>
                            <td>Mike Tyson Autobiografia</td>
                            <td>Mike Tyson</td>
                            <td>.azw3</td>
                            <td>two days ago</td>
                            <td><span className="on-kindle">No</span></td>
                        </tr>
                        <tr>
                            <td><span className="book-letter-indicator">P</span></td>
                            <td>Czas odnaleziony</td>
                            <td>Proust, Marcel</td>
                            <td>.mobi</td>
                            <td>12.03.2018</td>
                            <td><span className="on-kindle">Yes</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
// export default BooksList;
function mapStateToProps(state) {
    const { book } = state;
    return {
        book
    };
}

const connectedBooksList = connect(mapStateToProps)(BooksList);
export { connectedBooksList as BooksList }; 