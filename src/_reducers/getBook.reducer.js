import { booksConstants } from '../_constants';

export function getBook(state = {}, action) {
  switch (action.type) {
    // get all books actions
    case booksConstants.GET_BOOK_REQUEST:
      return {
        loading: true
      };
    case booksConstants.GET_BOOK_SUCCESS:
      return {
        book: action.book
      };
    case booksConstants.GET_BOOK_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}