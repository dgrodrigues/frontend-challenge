/* Load Dependencies */
import React from 'react';
import { connect } from 'react-redux';

/* Load Components */
import SearchInput from './SearchInput';
import InitialPlaceholder from './InitialPlaceholder';
import Loading from './Loading';
import List from './List';

/* Load Actions */
import { fetchMovies, 
    fetchNextMoviesPage, 
    invalidateMovies } from '../actions/movies';

/* Load Styles */
import '../../styles/home.scss';


const mapStateToProps = state => {
    return {
        movieList: state.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        inputChanged: value => {
            if(value.length > 3) {
                dispatch(fetchMovies(value));
            } else {
                dispatch(invalidateMovies());
            }
        },
        loadMoreMovies: () => {
            dispatch(fetchNextMoviesPage());
        }
    }
}

class HomeComponent extends React.Component {
    
    constructor() {
        super();

        this.goToMovieDetail = this.goToMovieDetail.bind(this);
    }

    goToMovieDetail(imdbID) {
        this.props.history.push('/detail/' + imdbID);
    }

    render() {
        const { movieList } = this.props;

        return (
            <div className="home-page">
                <SearchInput typeAction={this.props.inputChanged} />
                <div className="results-container">
                    {(Object.keys(movieList.data).length === 0 && !movieList.isFetching) && <InitialPlaceholder error={movieList.error}/> }
                    {(Object.keys(movieList.data).length === 0 && movieList.isFetching) && <Loading />}
                    {(Object.keys(movieList.data).length > 0) && <List movieList={movieList} goToMovieDetail={this.goToMovieDetail} />}
                    {(Object.keys(movieList.data).length > 0 && !movieList.finished) && <button onClick={(e) => this.props.loadMoreMovies()}>Load More</button>}
                </div>
            </div>
        );
    }

}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export default Home;
