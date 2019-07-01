/* Load Dependencies */
import React from 'react';

/* Load Styles */
import '../../styles/list.scss';

/* Load Images */
import FavoriteIcon from '../../media/icon-heart.svg';
import FavoriteIconFull from '../../media/icon-heart-full.svg';

/* Load Config */
import { LSName } from '../config';

class List extends React.Component {

    constructor() {
        super();
        this.checkIfFavorite = this.checkIfFavorite.bind(this);
    }

    renderMovie(movie, i) {
        const isFavorite = this.checkIfFavorite(movie.imdbID);
        return (
            <li className="movie-item" key={i} onClick={(e) => this.props.goToMovieDetail(movie.imdbID)}>
                <div style={{backgroundImage: 'url(' + movie.Poster + ')'}}>
                    <div className="overlay">
                        <div className="favorite-status">
                            <img src={isFavorite ? FavoriteIconFull : FavoriteIcon} alt="Favorite" />
                        </div>
                        <p>{movie.Title}</p>
                        <span>{movie.Year}</span>
                    </div>
                </div>
            </li>
        )
    }

    componentWillMount() {
        this.loadFavorites();
    }

    loadFavorites() {
        let favorites = window.localStorage.getItem(LSName);
        this.setState({
            favorites: favorites || []
        });
    }

    checkIfFavorite(imdbID) {
        return this.state.favorites.includes(imdbID);
    }

    render() {
        const { movieList } = this.props;

        return (
            <ul className="movies-list">
                { movieList.data.map((movie, i) => this.renderMovie(movie, i)) }
            </ul>
        );
    }

}

export default List;
