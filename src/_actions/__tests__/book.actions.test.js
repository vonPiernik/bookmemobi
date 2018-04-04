import { booksConstants } from '../../_constants';
import { config } from '../../_helpers';
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk';
import {alertConstants} from '../../_constants/alert.constants';
const { booksActions } = require('../');

// middleware that helps with unit test, now actions returns promise
const promisifyMiddleware = ({dispatch, getState}) => next => action => {
    return new Promise( (resolve) => resolve(next(action)) )
}

const middlewares = [promisifyMiddleware, thunkMiddleware];
const mockStore = configureMockStore(middlewares);

var fetchMock = require('fetch-mock');

// just an example id, used as userId or bookId, or anything else
const testId = 0;

// example error
const testErrorMessage = "Error occured";
// example book object
const book = {
    "id": 0,
    "title": "string",
    "author": "string",
    "fileName": "string",
    "size": 0,
    "format": "string",
    "publishingDate": "2018-03-31T10:19:01.258Z",
    "uploadDate": "2018-03-31T10:19:01.258Z"
}

// example book list object
const books = {
    "totalItems": 0,
    "pageNumber": 0,
    "pageSize": 0,
    "totalPages": 0,
    "hasPreviousPage": true,
    "hasNextPage": true,
    "nextPageNumber": 0,
    "previousPageNumber": 0,
    "items": [
      {
        "id": 0,
        "title": "string",
        "author": "string",
        "fileName": "string",
        "size": 0,
        "format": "string",
        "publishingDate": "2018-03-31T19:17:29.197Z",
        "uploadDate": "2018-03-31T19:17:29.197Z"
      }
    ]
}

describe('async books actions', () => {
    beforeEach(() => {
        // or individually reset a mock used
        localStorage.setItem('user',JSON.stringify({
            "id": testId
          }));
      });
       
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    }) 

    // single book fetch tests
    it('dispatches GET_BOOK_DETAILS_SUCCESS when fetching single book details has been done', () => {
        fetchMock.getOnce(config.apiUrl + '/users/'+ testId +'/books/' + testId, {
            body: book, headers: { 'content-type': 'application/json' }
        });
        const expectedActions = [
            { type: booksConstants.GET_BOOK_REQUEST },
            { type: booksConstants.GET_BOOK_SUCCESS, book }
        ];
        const store = mockStore({}); 
        return store.dispatch(booksActions.getBook(testId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
    it('dispatches GET_BOOK_DETAILS_FAILURE when fetching single book details has been done WITH ERROR', () => {
        fetchMock.getOnce(config.apiUrl + '/users/'+ testId +'/books/' + testId, {
            body: testErrorMessage, status: 500
        });
        const expectedActions = [
            { type: booksConstants.GET_BOOK_REQUEST },
            { type: booksConstants.GET_BOOK_FAILURE, error: testErrorMessage },
            { type: alertConstants.ERROR, message: testErrorMessage}
        ];
        const store = mockStore({}); 
        return store.dispatch(booksActions.getBook(testId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    // get user books tests
    it('dispatches GET_USER_BOOKS_SUCCESS when fetching all user books has been done', () => {
        fetchMock.getOnce(config.apiUrl + '/users/' + testId + '/books', {
            body: books, headers: { 'content-type': 'application/json' }
        });
        const expectedActions = [
            { type: booksConstants.GET_BOOKS_REQUEST },
            { type: booksConstants.GET_BOOKS_SUCCESS, books }
        ];
        const store = mockStore({}); 
        return store.dispatch(booksActions.getUserBooks()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
})