import { makeXHRRequest, serialize, authHeader, config } from '../_helpers';

export const tagsService = {
    getTags,
    getBookTags,
    addBookTags,
    deleteTag
};


function getTags(args) {
    if(args === undefined){ args = {} };

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    
    return fetch(config.apiUrl + '/tags?' + serialize(args), requestOptions)
    .then(handleResponse, handleError)
    .then((tags) => {
        return tags;
    });
}


function getBookTags(bookId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let user = JSON.parse(localStorage.getItem('user'));

    return fetch(config.apiUrl + '/users/' + user.id + '/books/' + bookId + '/tags', requestOptions).then(handleResponse, handleError);
}

function deleteTag(bookId, tagId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    let user = JSON.parse(localStorage.getItem('user'));

    return fetch(config.apiUrl + '/users/' + user.id + "/books/" + bookId + '/tags/' + tagId, requestOptions).then(handleResponse, handleError);
}



function addBookTags(bookId, tags) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(tags)
    };

    let user = JSON.parse(localStorage.getItem('user'));

    return fetch(config.apiUrl + '/users/' + user.id + '/books/' + bookId + '/tags', requestOptions).then(handleResponse, handleError);
}


function handleResponse(response) {
    return new Promise((resolve, reject) => {
        console.log(response)
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