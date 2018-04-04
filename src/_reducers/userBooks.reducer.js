import { booksConstants } from '../_constants';

export function userBooks(state = {}, action) {
  switch (action.type) {
    // get all books actions
    case booksConstants.GET_BOOKS_REQUEST:
      return {
        loading: true
      };
    case booksConstants.GET_BOOKS_SUCCESS:
      return {
        list: action.books
      };
    case booksConstants.GET_BOOKS_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}