import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import { alertConstants, userConstants } from '../_constants';
import { history } from '../_helpers';
import { userActions } from '../_actions';

const loggerMiddleware = createLogger();

// middleware that helps with unit test, now actions returns promise
const tokenCheck = ({dispatch, getState}) => next => action => {
    console.log(this);
    if(action.type === alertConstants.ERROR){
        // remove user from local storage to log user out
        // localStorage.removeItem('user'); 
        if(action.status === 401){
            dispatch(userActions.refreshToken());
        }
    }
    if(action.type === userConstants.TOKEN_FAILURE){
        // remove user from local storage to log user out
        localStorage.removeItem('user'); 
    }
    return next(action);
}

export const store = createStore(
    rootReducer,
    applyMiddleware(    
        thunkMiddleware,
        tokenCheck,
        loggerMiddleware
    )
);