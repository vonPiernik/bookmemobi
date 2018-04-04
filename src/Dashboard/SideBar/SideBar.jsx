import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { booksActions } from '../../_actions';

import './SideBar.css';

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    downloadBook(book){
        this.props.dispatch(booksActions.downloadBook(book))
    }

    render() {
        const { book } = this.props;
        return (
            <div className={"side-bar " + (this.props.sidebarShow ? "side-bar-show" : "side-bar-hide")} >
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
                        <button className="button button-less-important" onClick={() => this.downloadBook(book)}>Download book file</button>
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
        book
    };
}

const connectedSideBar = connect(mapStateToProps)(SideBar);
export { connectedSideBar as SideBar }; 