import { makeXHRRequest, serialize, authHeader, config } from '../_helpers';

export const booksService = {
    getUserBooks,
    getBook,
    downloadBook,
    uploadBook,
    deleteBook,
    sendBook,
    editBook,
    clearCache,
    getBookRecommendations,
    getGoodreadsMetadata,
};


function clearCache(key){
    if(key === 'books') booksCacheHelper.clearCacheHelper();

    return booksCache.del( key );
}


function getUserBooks(args) {
    if(args === undefined){ args = {} };

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    let user = JSON.parse(localStorage.getItem('user'));

    return fetch(config.apiUrl + '/users/' + user.id + '/books?' + serialize(args), requestOptions)
    .then(handleResponse, handleError)
    .then((books) => {
        return books;
    });
}


function getBook(bookId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let user = JSON.parse(localStorage.getItem('user'));

    return fetch(config.apiUrl + '/users/' + user.id + "/books/" + bookId, requestOptions).then(handleResponse, handleError);
}

function deleteBook(bookId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    let user = JSON.parse(localStorage.getItem('user'));

    return fetch(config.apiUrl + '/users/' + user.id + "/books/" + bookId, requestOptions).then(handleResponse, handleError);
}

function sendBook(bookId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let user = JSON.parse(localStorage.getItem('user'));

    return fetch(config.apiUrl + '/users/' + user.id + "/books/" + bookId + "/send", requestOptions).then(handleResponse, handleError);
}


function downloadBook(bookId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let user = JSON.parse(localStorage.getItem('user'));

    return fetch(config.apiUrl + '/users/' + user.id + "/books/" + bookId + "/download", requestOptions)
    .then(handleResponse, handleError);
}


function uploadBook(files) {
    let data = new FormData()
    files.forEach(function(file){
        data.append('file[]', file)
    })
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: data
    };
    let user = JSON.parse(localStorage.getItem('user'));

    return makeXHRRequest('POST', config.apiUrl + '/users/' + user.id + '/books', authHeader().Authorization, data)
        .then(handleResponse,handleError);
}


function editBook(bookId, data) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(data)
    };

    let user = JSON.parse(localStorage.getItem('user'));

    return fetch(config.apiUrl + '/users/' + user.id + '/books/' + bookId, requestOptions).then(handleResponse, handleError);
}

function getBookRecommendations(bookId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return fetch(`${config.apiUrl}/users/${user.id}/books/${bookId}/recommended`, requestOptions).then(handleResponse, handleError);
}


function getGoodreadsMetadata(bookId) {
    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
    };
  
    const user = JSON.parse(localStorage.getItem('user'));
  
    return fetch(`${config.apiUrl}/users/${user.id}/books/${bookId}/goodreads`, requestOptions).then(handleResponse, handleError);
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
        } else if (response instanceof XMLHttpRequest){
            resolve(JSON.parse(response.responseText));
        } else {
            // return error message from response body
            reject({ message: response.statusText, status: response.status });
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}