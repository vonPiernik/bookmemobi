import { bookConstants } from '../_constants';

const initialState = {
  sidebarOpened: false
}

export function book(state = initialState, action) {
  switch (action.type) {
    case bookConstants.SHOW_SIDEBAR:
      return {
        sidebarOpened: true,
      };
    case bookConstants.HIDE_SIDEBAR:
      return {
        sidebarOpened: false,
      }
    case bookConstants.BOOK_ACTIVATE:
      return {
        book: action.book
      };
    default:
      return state
  }
}