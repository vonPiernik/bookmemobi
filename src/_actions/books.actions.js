import { booksConstants } from '../_constants';
import { booksService } from '../_services';
import { alertActions } from './';
import { userActions } from './';

export const booksActions = {
    getUserBooks,
    getBook,
    downloadBook,
    uploadBook,
    editBook,
    deleteBook,
    sendBook,
    setArgs
};


// get list of all books that belongs to logged user
function getUserBooks(args, receivedBook = false) {
    return dispatch => {

        if(receivedBook){
            dispatch(success(receivedBook));
        } else {

            if(args.deleted || args.deleted === false){  
                dispatch(requestAndClear());
            } else {
                dispatch(request());
            }

            return booksService.getUserBooks(args)
                .then(
                    books => {
                        dispatch(success(books, args));
                    },
                    error => {
                        dispatch(failure(error.message));
                        dispatch(alertActions.error(error.message, error.status));
                        
                    }
                );
        }
    };
    
    function request() { return { type: booksConstants.GET_BOOKS_REQUEST } }
    function requestAndClear() { return { type: booksConstants.GET_BOOKS_REQUEST_AND_CLEAR } }
    function success(books, args) { return { type: booksConstants.GET_BOOKS_SUCCESS, books, args } }
    function failure(error) { return { type: booksConstants.GET_BOOKS_FAILURE, error } }
}


// set arguments that will be used for all next queries
function setArgs(args) {
    return dispatch => {
        dispatch( set(args) );
    };

    function set(args) { return { type: booksConstants.SET_ARGS, args } }
}

// get details of single book
function getBook(bookId, receivedBook = false) {
    return dispatch => {
        dispatch(request());

        if(receivedBook){
            dispatch(success(receivedBook));
        } else {
            return booksService.getBook(bookId)
                .then(
                    book => {
                        dispatch(success(book));
                    },
                    error => {
                        dispatch(failure(error.message));
                        dispatch(alertActions.error(error.message, error.status));
                        
                    }
                );
        }
    };

    function request() { return { type: booksConstants.GET_BOOK_REQUEST } }
    function success(book) { return { type: booksConstants.GET_BOOK_SUCCESS, book } }
    function failure(error) { return { type: booksConstants.GET_BOOK_FAILURE, error } }
}

// delete single book
function deleteBook(bookId) {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.waiting("Deleting..."));

        return booksService.deleteBook(bookId)
            .then(
                book => {
                    dispatch(alertActions.success("Book deleted"));
                    dispatch(this.getUserBooks()); // refresh books list after deleting
                    dispatch(this.getBook(book.id, book)); // refresh book
                    dispatch(success(book));
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message, error.status));
                    
                }
            );
    };

    function request() { return { type: booksConstants.DELETE_REQUEST } }
    function success(book) { return { type: booksConstants.DELETE_SUCCESS, book } }
    function failure(error) { return { type: booksConstants.DELETE_FAILURE, error } }
}


// send book
function sendBook(bookId) {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.waiting("Sending..."));

        return booksService.sendBook(bookId)
            .then(
                books => {
                    dispatch(alertActions.success("Book has been sent"));
                    dispatch(this.getUserBooks({}, books)); // refresh books list after deleting
                    dispatch(success(books));
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message, error.status));
                }
            );
    };

    function request() { return { type: booksConstants.SEND_BOOK_REQUEST } }
    function success(books) { return { type: booksConstants.SEND_BOOK_SUCCESS, books } }
    function failure(error) { return { type: booksConstants.SEND_BOOK_FAILURE, error } }
}


// download book with given ID
function downloadBook(book) {
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.waiting("Downloading..."));

        return booksService.downloadBook(book.id)
            .then((book) => {
                showFile(book);
                dispatch(alertActions.success("Download started"));
            })
    };

    // create a link and simulate clicking on it
    function showFile(book){
        var link = document.createElement('a');
        link.href = book.url;
        link.download=book.url;
        link.click();

    }

    function request() { return { type: booksConstants.DOWNLOAD_BOOK_REQUEST } }
    function success() { return { type: booksConstants.DOWNLOAD_BOOK_SUCCESS, download: "Download started" } }
    function failure(error) { return { type: booksConstants.DOWNLOAD_BOOK_FAILURE, error } }

}

function uploadBook(files) {
    return dispatch => {
        dispatch(request({ files }));
        dispatch(alertActions.waiting("Uploading..."));

        return booksService.uploadBook(files)
            .then(
                files => { 
                    dispatch(this.getUserBooks()); // refresh books list
                    dispatch(success(files));
                    dispatch(alertActions.success("Uploaded!"));
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message, error.status));
                }
            );
    };

    function request(files) { return { type: booksConstants.UPLOAD_REQUEST, files } }
    function success(files) { return { type: booksConstants.UPLOAD_SUCCESS, files } }
    function failure(error) { return { type: booksConstants.UPLOAD_FAILURE, error } }
}

function editBook(bookId, data) {
    return dispatch => {
        dispatch(request(bookId));
        dispatch(alertActions.waiting("Saving..."));

        return booksService.editBook(bookId, data)
            .then(
                book => { 
                    dispatch(this.getUserBooks()); // refresh books list
                    dispatch(this.getBook(bookId)); // refresh book
                    dispatch(success());
                    dispatch(alertActions.success("Saved!"));
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message, error.status));
                }
            );
    };

    function request(bookId) { return { type: booksConstants.EDIT_REQUEST, bookId } }
    function success() { return { type: booksConstants.EDIT_SUCCESS } }
    function failure(error) { return { type: booksConstants.EDIT_FAILURE, error } }
}

