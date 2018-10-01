import { booksConstants } from '../_constants';

export function goodreadsMetadata(state = {}, action) {
  switch(action.type) {
    case booksConstants.GET_GOODREADS_METADATA_REQUEST:
      return {
        ...state,
        metadataListLoading: true,
      };
    case booksConstants.GET_GOODREADS_METADATA_SUCCESS:
      return {
        metadataList: action.metadata,
      };
    case booksConstants.GET_GOODREADS_METADATA_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}