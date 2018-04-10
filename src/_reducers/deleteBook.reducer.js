import { booksConstants } from '../_constants';

export function deleteBook(state = {}, action) {
  switch (action.type) {
    // get all books actions
    case booksConstants.DELETE_REQUEST:
      return {
        loading: true
      };
    case booksConstants.DELETE_SUCCESS:
      return {
        book: action.book
      };
    case booksConstants.DELETE_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}