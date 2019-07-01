/* Load Dependencies */
import React from 'react';
import { connect } from 'react-redux';

/* Load Components */
import Loading from './Loading';

/* Load Actions */
import { fetchMovie } from '../actions/movies';

/* Load Styles */
import '../../styles/detail.scss';

/* Load Images */
import LogoRotten from '../../media/logo-rotten-tomatoes.svg';
import LogoImdb from '../../media/logo-imdb.svg';
import FavoriteEmpty from '../../media/icon-heart-grey.svg';
import FavoriteFull from '../../media/icon-heart-full.svg';

/* Load Config */
import { LSName } from '../config';

const mapStateToProps = state => {
    return {
        movieDetail: state.movie
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadPageInfo: value => {
            if (value.length > 3) {
                dispatch(fetchMovie(value));
            }
        }
    }
}


class DetailComponent extends React.Component {

    componentWillMount() {
        this.props.loadPageInfo(this.props.match.params.id);
        this.loadFavorites();
    }

    toggleFavorite() {
        let favorites = window.localStorage.getItem(LSName);
        const { imdbID } = this.props.movieDetail.data;
        if (favorites) {
            let currentFavs = JSON.parse(favorites) || [];
            if (currentFavs.includes(imdbID)) {
                let index = currentFavs.indexOf(imdbID);
                if (index > -1) {
                    currentFavs.splice(index, 1);
                }
            } else {
                currentFavs.push(imdbID);
            }

            localStorage.setItem(LSName, JSON.stringify(currentFavs));
        } else {
            localStorage.setItem(LSName, JSON.stringify([imdbID]));
        }
        this.loadFavorites();
    }

    loadFavorites() {
        let favorites = window.localStorage.getItem(LSName);
        this.setState({
            favorites: favorites || []
        });
    }

    checkIfFavorite() {
        const { imdbID } = this.props.movieDetail.data;
        return this.state.favorites.includes(imdbID);
    }

    render() {
        const { movieDetail } = this.props;
        const isFavorite = this.checkIfFavorite();
        
        return (
            <div className="detail-page">
                <div className="back-button">
                    <button onClick={() => this.props.history.push('/')}></button>
                </div>
                {!movieDetail.isFetching && Object.keys(movieDetail.data).length > 0 &&
                    <div className="details-container">
                        <div className="details-info">
                        <p>{movieDetail.data.Runtime} · {movieDetail.data.Year} · <span>{movieDetail.data.Rated}</span></p>
                            <h1>{movieDetail.data.Title}</h1>
                            <div className="badges">
                                <div className="imdb-badge">
                                    <div className="logo">
                                        <img src={LogoImdb} alt="imdb" />
                                    </div>
                                    <p>
                                        {movieDetail.data.imdbRating}/10
                                    </p>
                                </div>
                                <div className="rotten-badge">
                                    <div className="logo">
                                        <img src={LogoRotten} alt="rotten-tomatoes" />
                                    </div>
                                    <p>
                                        {movieDetail.data.Ratings.map((item, i) => {
                                            if (item.Source === 'Rotten Tomatoes') {
                                                return item.Value;
                                            } else {
                                                return null
                                            }
                                        })}
                                    </p>
                                </div>
                            <div className={`favorite-badge ${isFavorite && 'favorite'}`} onClick={() => this.toggleFavorite()}>
                                    <div>
                                        <img src={isFavorite ? FavoriteFull : FavoriteEmpty} alt="favorite" />
                                    </div>
                                    <p>{isFavorite ? 'Added' : 'Add to Favorites'}</p>
                                </div>
                            </div>
                            <div>
                                <span>Plot</span>
                                <p>{movieDetail.data.Plot}</p>
                            </div>
                            <div className="detail-multi-column">
                                <div>
                                    <span>Cast</span>
                                    <ul>
                                        {movieDetail.data.Actors.split(',').map((item, i) => {
                                            return (
                                                <li key={i}>
                                                    {item}
                                                    <br/>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div>
                                    <span>Genre</span>
                                    <ul>
                                        {movieDetail.data.Genre.split(',').map((item, i) => {
                                            return (
                                                <li key={i}>
                                                    {item}
                                                    <br />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div>
                                    <span>Director</span>
                                    <ul>
                                        {movieDetail.data.Director.split(',').map((item, i) => {
                                            return (
                                                <li key={i}>
                                                    {item}
                                                    <br />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="details-poster">
                            <img src={movieDetail.data.Poster} alt="Poster"></img>
                        </div>
                    </div>
                }
                {movieDetail.isFetching && <Loading />}
            </div>
        );
    }
}

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailComponent);

export default Detail;
