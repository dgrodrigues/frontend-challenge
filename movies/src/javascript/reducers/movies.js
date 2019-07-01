export function movies(state = {
    isFetching: false,
    data: {},
    error: undefined,
    page: 1,
    finished: false,
    search: undefined,
    total: 0
}, action) {
    switch (action.type) {
        case 'REQUEST_MOVIES':
            return Object.assign({}, state, {
                isFetching: true,
                search: action.search
            });
        case 'RECEIVE_MOVIES':
            console.log('RECEIVE_MOVIES', action.movies);
            return Object.assign({}, state, {
                isFetching: false,
                data: action.movies,
                error: action.error,
                total: action.total,
                page: 1,
                finished: action.movies.length >= action.total ? true : false
            });
        case 'RECEIVE_MORE_MOVIES':
            return Object.assign({}, state, {
                isFetching: false,
                data: action.movies === [] ? state.data : state.data.concat(action.movies),
                error: action.error,
                page: state.page+1,
                total: action.total,
                finished: (state.data.length + action.movies.length) < action.total ? false : true
            });
        case 'INVALIDATE_MOVIES':
            return Object.assign({}, state, {
                isFetching: false,
                data: {},
                error: undefined,
                page: 1,
                finished: false,
                search: undefined,
                total: 0
            });
        default:
            return state;
    }
}

export function movie(state = {
    isFetching: false,
    data: {},
    imdbID: undefined,
    error: undefined
}, action) {
    switch (action.type) {
        case 'REQUEST_MOVIE_DETAIL':
            return Object.assign({}, state, {
                isFetching: true,
                imdbID: action.imdbID
            });
        case 'RECEIVE_MOVIE_DETAIL':
            return Object.assign({}, state, {
                isFetching: false,
                data: action.movie,
                error: action.error
            });
        default:
            return state;
    }
}