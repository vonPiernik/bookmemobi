import { booksConstants } from '../_constants';

export function userBooks(state = {}, action) {
  switch (action.type) {
    // get all books actions
    case booksConstants.GET_BOOKS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case booksConstants.GET_BOOKS_REQUEST_AND_CLEAR:
      return {
        loading: true
      };
    case booksConstants.GET_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        args: {
          ...state.args,
          ...action.args
        },
        list: action.books
      };
    case booksConstants.GET_BOOKS_FAILURE:
      return { 
        error: action.error
      };


    // set query parameters (arguments)
    case booksConstants.SET_ARGS:
      return {
        ...state,
        args: {
          ...state.args,
          ...action.args
        }
      };

    default:
      return state
  }
}