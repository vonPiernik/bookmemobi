import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    refreshToken,
    logout,
    authCheck,
    register,
    getAll,
    getUser,
    confirm,
    remindPassword,
    resetPassword,
    editUser
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        return userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function refreshToken(previousAction){
    return dispatch => {
        dispatch(request());
        return userService.refreshToken()
            .then(
                tokens => { 
                    dispatch(success(tokens));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request() { return { type: userConstants.TOKEN_REQUEST } }
    function success(tokens) { return { type: userConstants.TOKEN_SUCCESS, tokens } }
    function failure(error) { return { type: userConstants.TOKEN_FAILURE, error } }
}


function getUser(userId) {
    return dispatch => {
        dispatch(request());

        return userService.getUser(userId)
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request(userId) { return { type: userConstants.GET_USER_REQUEST, userId } }
    function success(user) { return { type: userConstants.GET_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_USER_FAILURE, error } }
}

function confirm(userId, token) {
    return dispatch => {
        dispatch(request({ userId }));

        return userService.confirm(userId, token)
            .then(
                response => { 
                    dispatch(success(response));
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error.message));
                    history.push('/login');
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request(userId) { return { type: userConstants.CONFIRM_REQUEST, userId } }
    function success(response) { return { type: userConstants.CONFIRM_SUCCESS, response } }
    function failure(error) { return { type: userConstants.CONFIRM_FAILURE, error } }
}


function remindPassword(userName) {
    return dispatch => {
        dispatch(request({ userName }));

        return userService.remindPassword(userName)
            .then(
                response => { 
                    dispatch(success(response));
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error.message));
                    history.push('/login');
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request(userName) { return { type: userConstants.REMIND_PASSWORD_REQUEST, userName } }
    function success(response) { return { type: userConstants.REMIND_PASSWORD_SUCCESS, response } }
    function failure(error) { return { type: userConstants.REMIND_PASSWORD_FAILURE, error } }
}

function resetPassword(password, userId, token) {
    return dispatch => {
        dispatch(request({ userId }));

        return userService.resetPassword(password, userId, token)
            .then(
                response => { 
                    dispatch(success(response));
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error.message));
                    history.push('/login');
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request(userId) { return { type: userConstants.RESET_PASSWORD_REQUEST, userId } }
    function success(response) { return { type: userConstants.RESET_PASSWORD_SUCCESS, response } }
    function failure(error) { return { type: userConstants.RESET_PASSWORD_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function authCheck(){
    return userService.authCheck()
        .then(
            user => {
                dispatch(alertActions.error("Unknown error occured. Please contact us, so we can fix it."));
            },
            error => {
                dispatch(alertActions.error(error.message));
                history.push('/login');
            }
        );
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        return userService.register(user)
            .then(
                () => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success("Registration successful"));
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


function editUser(data) {
    return dispatch => {
        dispatch(request(data));

        return userService.editUser(data)
            .then(
                () => { 
                    dispatch(success());
                    dispatch(this.getUser()); 
                    dispatch(alertActions.success('User data edited!'));
                },
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request(data) { return { type: userConstants.EDIT_REQUEST, data } }
    function success(data) { return { type: userConstants.EDIT_SUCCESS, data } }
    function failure(error) { return { type: userConstants.EDIT_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        return userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}


