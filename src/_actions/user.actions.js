import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    authCheck,
    register,
    getAll,
    confirm,
    remindPassword,
    resetPassword
    // delete: _delete
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
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
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
                    dispatch(failure(error));
                    history.push('/login');
                    dispatch(alertActions.error(error));
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
                    dispatch(failure(error));
                    history.push('/login');
                    dispatch(alertActions.error(error));
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
                    dispatch(failure(error));
                    history.push('/login');
                    dispatch(alertActions.error(error));
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
                dispatch(alertActions.error(error));
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
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        return userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}



// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));

//         return userService.delete(id)
//             .then(
//                 () => { 
//                     dispatch(success(id));
//                 },
//                 error => {
//                     dispatch(failure(id, error));
//                 }
//             );
//     };

//     function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
// }