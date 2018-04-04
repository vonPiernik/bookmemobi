import { booksConstants } from '../_constants';
import { booksService } from '../_services';
import { alertActions } from './';
import { userActions } from './';

const { authCheck } = userActions;

export const booksActions = {
    getUserBooks,
    getBook,
    downloadBook,
    uploadBook
};


// get list of all books that belongs to logged user
function getUserBooks() {
    return dispatch => {
        dispatch(request());

        return booksService.getUserBooks()
            .then(
                books => {
                    dispatch(success(books));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    dispatch(userActions.authCheck);
                }
            );
    };

    function request() { return { type: booksConstants.GET_BOOKS_REQUEST } }
    function success(books) { return { type: booksConstants.GET_BOOKS_SUCCESS, books } }
    function failure(error) { return { type: booksConstants.GET_BOOKS_FAILURE, error } }
}

// get details of single book
function getBook(bookId) {
    return dispatch => {
        dispatch(request());

        return booksService.getBook(bookId)
            .then(
                book => {
                    dispatch(success(book));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    dispatch(userActions.authCheck);
                }
            );
    };

    function request() { return { type: booksConstants.GET_BOOK_REQUEST } }
    function success(book) { return { type: booksConstants.GET_BOOK_SUCCESS, book } }
    function failure(error) { return { type: booksConstants.GET_BOOK_FAILURE, error } }
}


// download book with given ID
function downloadBook(book) {
    console.log("BOOK", book);
    return dispatch => {
        dispatch(request());
        dispatch(alertActions.waiting("Downloading..."));

        return booksService.downloadBook(book.id)
            .then(() => {
                showFile();
                dispatch(alertActions.success("Download started"));
            })
    };

    function request() { return { type: booksConstants.DOWNLOAD_BOOK_REQUEST } }
    function success() { return { type: booksConstants.DOWNLOAD_BOOK_SUCCESS, download: "Download started" } }
    function failure(error) { return { type: booksConstants.DOWNLOAD_BOOK_FAILURE, error } }

    
    function showFile(blob){
        var newBlob = new Blob([blob], {type: "application/x-mobipocket-mobi"})

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
        } 

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        link.href = data;
        link.download=book.fileName;
        link.click();
        setTimeout(function(){
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data)
        , 100})

    }
}

function uploadBook(files) {
    return dispatch => {
        dispatch(request({ files }));
        dispatch(alertActions.waiting("Uploading..."));

        return booksService.uploadBook(files)
            .then(
                files => { 
                    dispatch(this.getUserBooks());
                    dispatch(success(files));
                    dispatch(alertActions.success("Uploaded!"));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(files) { return { type: booksConstants.UPLOAD_REQUEST, files } }
    function success(files) { return { type: booksConstants.UPLOAD_SUCCESS, files } }
    function failure(error) { return { type: booksConstants.UPLOAD_FAILURE, error } }
}

