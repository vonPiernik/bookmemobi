import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import { alertConstants } from '../_constants';

const loggerMiddleware = createLogger();

// middleware that helps with unit test, now actions returns promise
const authCheckMiddleware = ({dispatch, getState}) => next => action => {
    console.log("Auth check middleware", action.type);
    if(action.type === alertConstants.ERROR){
        console.log(action.message);
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