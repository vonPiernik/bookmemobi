import { booksConstants } from '../_constants';

export function downloadBook(state = {}, action) {
  switch (action.type) {
    // download book actions
    case booksConstants.DOWNLOAD_BOOK_REQUEST:
      return {
        loading: true
      };
    case booksConstants.DOWNLOAD_BOOK_SUCCESS:
      return {
        downloading: true
      };
    case booksConstants.DOWNLOAD_BOOK_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}