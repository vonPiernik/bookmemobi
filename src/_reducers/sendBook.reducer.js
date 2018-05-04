import { booksConstants } from '../_constants';

export function sendBook(state = {}, action) {
  switch (action.type) {
    // download book actions
    case booksConstants.SEND_BOOK_REQUEST:
      return {
        loading: true
      };
    case booksConstants.SEND_BOOK_SUCCESS:
      return {
        sent: true
      };
    case booksConstants.SEND_BOOK_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}