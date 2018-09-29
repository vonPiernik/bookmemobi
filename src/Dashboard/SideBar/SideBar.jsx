import React from 'react';
import { connect } from 'react-redux';
import { booksActions, tagsActions } from '../../_actions';
import { Spinner } from '../../_components';
import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css'

import './SideBar.css';

function autoGrow(event) {
  const { target } = event;
  if (target.scrollHeight > target.clientHeight) {
    target.style.height = target.scrollHeight + "px";
  }
}
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

class BookTitle extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    if(this.titleEditRef) {
      this.titleEditRef.addEventListener('keydown', autoGrow);
      this.titleEditRef.dispatchEvent(new Event('keydown'));
    }
  }
  componentWillUnmount() {
    this.titleEditRef.removeEventListener('keydown', autoGrow);
  }
  render() {
    if (!this.props.bookEditor) {
      return (
        <h3>{this.props.title}</h3>
      );
    } else {
      return (
        <h3>
          <textarea ref={node => {this.titleEditRef = node}} className="side-bar-edit-input title" rows="1" name="title" value={this.props.title} onChange={this.props.handleChange} />
        </h3>
      );
    }
  }

}

class BookAuthor extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    if(this.authorEditRef) {
      this.authorEditRef.addEventListener('keydown', autoGrow);
      this.authorEditRef.dispatchEvent(new Event('keydown'));
    }
  }
  componentWillUnmount() {
    this.authorEditRef.removeEventListener('keydown', autoGrow);
  }
  render() {
    if (!this.props.bookEditor) {
      return (
        <p><strong className="author-label">Author: </strong> {this.props.author} </p>
      );
    } else {
      return (
        <p><strong className="author-label">Author: </strong> <textarea ref={node => {this.titleEditRef = node}} className="side-bar-edit-input author" name="author" value={this.props.author} onChange={this.props.handleChange} /> </p>
      );
    }
  }
}

class BookPublishingDate extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    if(this.publishingDateEditRef) {
      this.publishingDateEditRef.addEventListener('keydown', autoGrow);
      this.publishingDateEditRef.dispatchEvent(new Event('keydown'));
    }
  }
  componentWillUnmount() {
    this.titleEditRef.removeEventListener('keydown', autoGrow);
  }
  render() {
    if (!this.props.bookEditor) {
      return (
        <p><strong className="publishing-label">Publishing Date: </strong> { (this.props.publishingDate != null) ? this.props.publishingDate : "No data" }</p>
      );
    } else {
      return (
        <p><strong className="publishing-label">Publishing Date: </strong> <textarea ref={node => {this.publishingDateEditRef = node}} rows="1" className="side-bar-edit-input publishingDate" name="publishingDate" value={this.props.publishingDate} onChange={this.props.handleChange} /> </p>
      );
    }
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

function SingleBook(props) {
    const { book, user, getBook, bookEditor, addBookTags, getBookRecommendations, openBookRecommendationsModal } = props;
    let id;

    if (book) {
      id = book.id;
    }

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
                <BookPublishingDate publishingDate={props.publishingDate} handleChange={props.handleChange} bookEditor={bookEditor} />
                {bookEditor &&
                <button type="submit" className="button button-standard book-edit-button" onClick={() => props.editBook()} >Save metadata</button>
                }
                </form>
                <TagsInput
                    value={props.tagsList}
                    onChange={addBookTags}
                    addKeys="[13,9]"
                    onlyUnique
                    tagProps={{
                        className: 'react-tagsinput-tag',
                        classNameRemove: 'react-tagsinput-remove',
                        'data-tag-id': 'stringo'
                      }} />

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
                {
                  props.tagsList.length > 0 &&
                    <button className="button button-standard recommendations" onClick={() => {
                      getBookRecommendations(id);
                      openBookRecommendationsModal();
                    }}>
                    Get book recommendations
                    </button>
                }

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
            author: "",
            publishingDate: "",
            tags: [],
        }

        this.toggleBookEditor = this.toggleBookEditor.bind(this);
        this.addBookTags = this.addBookTags.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editBook = this.editBook.bind(this);
    }
    componentDidUpdate(){
        if(this.props.book && !this.state.bookLoaded) {
            this.setState( () => ({
                bookLoaded: true,
                title: this.props.book.title,
                author: this.props.book.author,
                publishingDate: this.props.book.publishingDate,
                tags: this.props.book.tags,

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
            author: this.state.author,
            publishingDate: this.state.publishingDate,
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

    getBookTags(bookId){
        return this.props.dispatch(tagsActions.getBookTags(bookId));
    }

    addBookTags(tags, tagsChanged){
        let deletedTag = this.state.tags.filter( tag => tag.tagName == tagsChanged[0] );
        if(deletedTag[0]){
            this.deleteTag( deletedTag[0].id );
        } else {
            this.props.dispatch(tagsActions.addBookTags(this.props.book.id, tags));
        }
    }

    deleteTag(tagId){
        this.props.dispatch(tagsActions.deleteTag(this.props.book.id, tagId));
    }

    toggleBookEditor(){
        this.setState( (prevState) => ({
            bookEditor: !prevState.bookEditor,
            title: this.props.book.title,
            author: this.props.book.author
        }) );
    }

    render() {
        const { getBook, book, sidebarVisible, toggleSidebar, user, openBookRecommendationsModal, getBookRecommendations } = this.props;
        const bookEditor = this.state.bookEditor;
        let tagsList = [];
        if( book && book.tags ) {
            book.tags.forEach(tag => {
                tagsList.push(tag.tagName);
            });
        }

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
                            publishingDate={this.state.publishingDate}
                            handleChange={this.handleChange}
                            sendBook={ bookId => this.sendBook(bookId) }
                            deleteBook={ bookId => this.deleteBook(bookId) }
                            downloadBook={ bookId => this.downloadBook(bookId) }
                            editBook={this.editBook}
                            toggleBookEditor={this.toggleBookEditor}
                            addBookTags={this.addBookTags}
                            recommendations={this.props.recommendations}
                            tagsList={tagsList}
                            openBookRecommendationsModal={openBookRecommendationsModal}
                            getBookRecommendations={getBookRecommendations}
                            />

            </div>
        );
    }
}

// export default SideBar;
function mapStateToProps(state) {
    const { getBook, authentication, bookRecommendations } = state;
    const { book } = getBook;
    const { user } = authentication;
    return {
        getBook,
        book,
        user,
    };
}

const connectedSideBar = connect(mapStateToProps)(SideBar);
export { connectedSideBar as SideBar };