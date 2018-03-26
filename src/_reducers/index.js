import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { files } from './files.reducer';
import { book } from './book.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  files,
  book
});

export default rootReducer;