import { booksConstants } from '../_constants';

export function uploadBook(state = {}, action) {
  switch (action.type) {
    // download book actions
    case booksConstants.UPLOAD_REQUEST:
      return {
        uploading: true
      };
    case booksConstants.UPLOAD_SUCCESS:
      return {
        book: action.book
      };
    case booksConstants.UPLOAD_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}