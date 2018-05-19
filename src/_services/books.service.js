import { makeXHRRequest, serialize, authHeader, config } from '../_helpers';

// node cache
// const NodeCache = require( "node-cache" );
// const booksCache = new NodeCache();




export const booksService = {
    getUserBooks,
    getBook,
    downloadBook,
    uploadBook,
    deleteBook,
    sendBook,
    clearCache
};

// books cache is not working as it should be
// var booksCacheHelper = {
//     allBooks: [],
//     currentPage: [],

//     searchForPageInCache: function(pageNumber) {

//         function pageFilter(page) {
//             return page.pageNumber === pageNumber;
//         }
        
//         if(this.getBooksFromNodeCache) this.currentPage = this.allBooks.filter(pageFilter);
//     },

//     getBooksFromNodeCache: function(){
//         if(booksCache.get("books")){
//             return this.all = booksCache.get("books");
//         } 
//         return false;
//     },

//     getCurrentPage: function(){
//         return this.currentPage[0];
//     },

//     storePage: function(books){
//         console.log("NO PRZECHOWYWANKO")
//         this.allBooks.push(books);
//     },

//     pageExistsInCache: function(){
//         if(this.currentPage[0]) return true;
//         return false;
//     },

//     clearCacheHelper: function(){
//         this.allBooks = [];
//         this.currentPage = [];
//     }

// }


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
    .then(
        r => r.blob(),
        error => dispatch(failure(error))
    );
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
    // return fetch(config.apiUrl + '/users/' + user.id + '/books', requestOptions)
    //     .then(handleResponse, handleError)
    //     .then(files => {
    //         console.log("in books service", files)
    //         return files;
    //     });  
    
    // makeXHRRequest('POST', config.apiUrl + '/users/' + user.id + '/books', authHeader().Authorization);
                                                    
    return makeXHRRequest('POST', config.apiUrl + '/users/' + user.id + '/books', authHeader().Authorization, data)
        .then(handleResponse,handleError);
}

function handleResponse(response) {
    console.log("ODPOWIEDŹ ", );
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else if (response instanceof XMLHttpRequest && response.readyState == 4 && response.status === 200){
            resolve(JSON.parse(response.responseText));
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}