import { authHeader, config } from '../_helpers';

export const booksService = {
    getUserBooks,
    getBook,
    downloadBook,
    uploadBook
    // upload
};

function getUserBooks() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let user = JSON.parse(localStorage.getItem('user'));

    return fetch(config.apiUrl + '/users/' + user.id + "/books", requestOptions).then(handleResponse, handleError);
}


function getBook(bookId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let user = JSON.parse(localStorage.getItem('user'));

    return fetch(config.apiUrl + '/users/' + user.id + "/books/" + bookId, requestOptions).then(handleResponse, handleError);
}


function downloadBook(bookId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let user = JSON.parse(localStorage.getItem('user'));

    return fetch(config.apiUrl + '/users/' + user.id + "/books/" + bookId + "/download", requestOptions)
    .then(
        r => r.blob(),
        error => dispatch(failure(error))
    );
}


function uploadBook(files) {
    var data = new FormData()
    files.forEach(function(file){
        data.append('file[]', file)
    })
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: data
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(config.apiUrl + '/users/' + user.id + '/books', requestOptions)
        .then(handleResponse, handleError)
        .then(files => {
            return files;
        });
}

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