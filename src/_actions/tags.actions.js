import { tagsConstants } from '../_constants';
import { tagsService } from '../_services';
import { alertActions } from './';

export const booksActions = {
    getTags,
    getBookTags,
    addBookTags,
    deleteTag
};


// get list of all books that belongs to logged user
function getTags(args) {
    return dispatch => {
        dispatch(request());

        return tagsService.getTags(args)
            .then(
                tags => {
                    dispatch(success(tags, args));
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message, error.status));
                    
                }
            );
    };

    function request() { return { type: tagsConstants.GET_TAGS_REQUEST } }
    function success(tags, args) { return { type: tagsConstants.GET_TAGS_SUCCESS, tags, args } }
    function failure(error) { return { type: tagsConstants.GET_TAGS_FAILURE, error } }
}


// get details of single book
function getBookTags(bookId) {
    return dispatch => {
        dispatch(request());

        return tagsService.getBookTags(bookId)
            .then(
                tags => {
                    dispatch(success(tags));
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message, error.status));
                    
                }
            );
    };

    function request() { return { type: tagsConstants.GET_BOOK_TAGS_REQUEST } }
    function success(tags) { return { type: tagsConstants.GET_BOOK_TAGS_SUCCESS, tags } }
    function failure(error) { return { type: tagsConstants.GET_BOOK_TAGS_FAILURE, error } }
}

// delete single book
function deleteTag(bookId, tagId) {
    return dispatch => {
        dispatch(request());

        return tagsService.deleteTag(bookId, tagId)
            .then(
                tags => {
                    dispatch(alertActions.success("Tag deleted"));
                    dispatch(this.getBook(bookId)); // refresh book
                    dispatch(success(tags));
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message, error.status));
                    
                }
            );
    };

    function request() { return { type: tagsConstants.DELETE_REQUEST } }
    function success(tags) { return { type: tagsConstants.DELETE_SUCCESS, tags } }
    function failure(error) { return { type: tagsConstants.DELETE_FAILURE, error } }
}



function addBookTags(bookId, tags) {
    return dispatch => {
        dispatch(request(bookId));
        dispatch(alertActions.waiting("Saving..."));

        return tagsService.addBookTags(bookId, tags)
            .then(
                tags => { 
                    dispatch( booksActions.getBook(bookId) ); // refresh book
                    dispatch(success());
                    dispatch(alertActions.success("Saved!"));
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message, error.status));
                }
            );
    };

    function request(bookId) { return { type: tagsConstants.ADD_BOOK_TAGS_REQUEST, bookId } }
    function success() { return { type: tagsConstants.ADD_BOOK_TAGS_SUCCESS } }
    function failure(error) { return { type: tagsConstants.ADD_BOOK_TAGS_FAILURE, error } }
}

