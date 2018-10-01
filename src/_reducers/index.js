import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { getBook } from './getBook.reducer';
import { userBooks } from './userBooks.reducer';
import { downloadBook } from './downloadBook.reducer';
import { uploadBook } from './uploadBook.reducer';
import { sendBook } from './sendBook.reducer';
import { bookRecommendations } from './bookRecommendations.reducer';
import { goodreadsMetadata } from './goodreadsMetadata.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  getBook,
  userBooks,
  downloadBook,
  uploadBook,
  sendBook,
  bookRecommendations,
  goodreadsMetadata,
});

export default rootReducer;