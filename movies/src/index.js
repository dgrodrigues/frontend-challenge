/* Load Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, 
    applyMiddleware, 
    combineReducers } from 'redux';
import { BrowserRouter as Router, 
    Route, 
    Link, 
    Switch } from "react-router-dom";

/* Load Components */
import Home from './javascript/components/Home';
import Detail from './javascript/components/Detail';
import NoMatch from './javascript/components/NoMatch';

/* Load Images */
import logo from './media/logo.svg';

/* Load Styles */
import './styles/app.scss';

/* Load Reducers */
import { movies, movie } from './javascript/reducers/movies';

const store = createStore(combineReducers({
    movies: movies,
    movie: movie
}), applyMiddleware(thunk));

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <div className="significa-movies">
                <header className="movies-header">
                    <Link to="/">
                        <img src={logo} className="app-logo" alt="logo" />
                    </Link>
                </header>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/detail/:id" component={Detail} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </div>
        </Router>
    </Provider>
), document.getElementById('root'));
