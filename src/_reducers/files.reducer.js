import { userConstants } from '../_constants';

export function files(state = {}, action) {
  switch (action.type) {
    case userConstants.UPLOAD_REQUEST:
      return {
        loading: true
      };
    case userConstants.UPLOAD_SUCCESS:
      return {
        items: action.files
      };
    case userConstants.UPLOAD_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}