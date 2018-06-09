import { authHeader, config } from '../_helpers';

export const userService = {
    login,
    confirm,
    getUser,
    remindPassword,
    resetPassword,
    logout,
    authCheck,
    register,
    getAll,
    upload,
    editUser
};


function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(config.apiUrl + '/users/login', requestOptions)
        .then(handleResponse, handleError)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function confirm(userId, token) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(config.apiUrl + '/users/' + userId + '/confirm?token=' + token, requestOptions)
        .then(handleResponse, handleError)
        .then(response => {
            return response;
        });
}

function getUser(userId = false) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    if(!userId) userId = JSON.parse(localStorage.getItem('user')).id;

    return fetch(config.apiUrl + '/users/' + userId, requestOptions)
        .then(handleResponse, handleError);
}

function remindPassword(username) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( username )
    };
    return fetch(config.apiUrl + '/users/remindPassword', requestOptions)
        .then(handleResponse, handleError);
}


function resetPassword(newPassword, userId, token) {
    console.log("reset ", userId);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({newPassword, token})
    };
    return fetch(config.apiUrl + '/users/' + userId +  '/resetPassword', requestOptions)
        .then(handleResponse, handleError);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function authCheck(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(config.apiUrl + '/users/' + user.id , requestOptions).then(handleResponse, handleError);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/users', requestOptions).then(handleResponse, handleError);
}


function editUser(data) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    let user = JSON.parse(localStorage.getItem('user'));

    return fetch(config.apiUrl + '/users/' + user.id, requestOptions).then(handleResponse, handleError);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(config.apiUrl + '/users', requestOptions).then(handleResponse, handleError);
}



function upload(files, userId) {
    var data = new FormData()
    files.forEach(function(file){
        data.append('file[]', file)
    })
    const requestOptions = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: data
    };
    console.log(requestOptions);
    return fetch(config.apiUrl + '/' + userId + '/files', requestOptions)
        .then(handleResponse, handleError)
        .then(files => {
            return files;
        });
}

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(config.apiUrl + '/users/' + user.id, requestOptions).then(handleResponse, handleError);
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch(config.apiUrl + '/users/' + id, requestOptions).then(handleResponse, handleError);
// }

function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}