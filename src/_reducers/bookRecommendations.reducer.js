import { booksConstants } from '../_constants';

export function bookRecommendations(state = {}, action) {
  switch(action.type) {
    case booksConstants.GET_BOOK_RECOMMENDATIONS_REQUEST:
      return {
        ...state,
      };
    case booksConstants.GET_BOOK_RECOMMENDATIONS_SUCCESS:
      return {
        recommendations: action.recommendations,
      };
    case booksConstants.GET_BOOK_RECOMMENDATIONS_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}