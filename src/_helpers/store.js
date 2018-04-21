import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import { alertConstants } from '../_constants';
import { history } from '../_helpers';

const loggerMiddleware = createLogger();

// middleware that helps with unit test, now actions returns promise
const authCheckMiddleware = ({dispatch, getState}) => next => action => {
    if(action.type === alertConstants.ERROR){
        // remove user from local storage to log user out
        localStorage.removeItem('user');        
    }
    return next(action);
}

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        authCheckMiddleware,
        loggerMiddleware
    )
);