import { apiInfo } from '../config';

/*------------------------------------*\
    MOVIES - Fetch and Fetching State
\*------------------------------------*/

function requestMovies(title) {
    return {
        type: 'REQUEST_MOVIES',
        search: title
    }
}

export function invalidateMovies() {
    return {
        type: 'INVALIDATE_MOVIES'
    }
}

function receiveMovies(json) {
    return {
        type: 'RECEIVE_MOVIES',
        movies: json.Search === undefined ? [] : json.Search,
        error: json.Error,
        total: json.totalResults
    }
}

function receiveMoviesPage(json) {
    return {
        type: 'RECEIVE_MORE_MOVIES',
        movies: json.Search === undefined ? [] : json.Search,
        error: json.Error,
        total: json.totalResults
    }
}

export function fetchMovies(title) {
    return dispatch => {
        dispatch(requestMovies(title));
        return fetch(`${apiInfo.url}/?apikey=${apiInfo.key}&s=${title.trim()}&type=movie&page=1`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json())
        .then(json => dispatch(receiveMovies(json)))
    }
}

export function fetchNextMoviesPage() {
    return (dispatch, getState) => {
        const movies = getState().movies;
        dispatch(requestMovies(movies.search))
        return fetch(`${apiInfo.url}/?apikey=${apiInfo.key}&s=${movies.search.trim()}&type=movie&page=${movies.page+1}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json())
            .then(json => dispatch(receiveMoviesPage(json)))
    }
}


/*------------------------------------*\
    MOVIE - Fetch and Fetching Movie Detail
\*------------------------------------*/

function requestMovie(id) {
    return {
        type: 'REQUEST_MOVIE_DETAIL',
        imdbID: id
    }
}

function receiveMovie(json) {
    return {
        type: 'RECEIVE_MOVIE_DETAIL',
        movie: json.Response === 'False' ? [] : json,
        error: json.Error
    }
}

export function fetchMovie(imdbID) {
    return dispatch => {
        dispatch(requestMovie(imdbID));
        return fetch(`${apiInfo.url}/?apikey=${apiInfo.key}&i=${imdbID}&plot=short&type=movie`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json())
            .then(json => dispatch(receiveMovie(json)))
    }
}
