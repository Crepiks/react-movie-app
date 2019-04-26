import React, { Component } from 'react';

import './Home.css';

import Header from './Header';
import MovieCard from './MovieCard';
import Pagination from './Pagination';
import { isUndefined } from 'util';

class Home extends Component {

    API_KEY = 'bd42635e62d60657f430cccaf1a52512';
    baseURL = 'https://api.themoviedb.org/3/';
    configData = null;
    baseImageURL = null;

    state = {
        currentPage: 1,
        searchQuery: '',
        moviesList : []
    }

    _onSearchQueryChange = (searchQuery) => {
        this.setState({
            ...this.state,
            searchQuery: searchQuery
        });
    }

    getConfig = () => {
        let url = "".concat(this.baseURL, 'configuration?api_key=', this.API_KEY); 
        fetch(url)
        .then((result)=>{
            return result.json();
        })
        .then((data)=>{
            this.baseImageURL = data.images.secure_base_url;
            this.configData = data.images;
        })
        .catch(function(err){
            alert(err);
        });
    }

    setMoviesList = () => {
        var url;
        if (!isUndefined(this.props.match.params.query) && !isUndefined(this.props.match.params.page)) {
            url = ''.concat(this.baseURL, 'search/movie?api_key=', this.API_KEY, '&query=', this.props.match.params.query, '&page=', this.props.match.params.page);
        } else if (!isUndefined(this.props.match.params.query)) {
            url = ''.concat(this.baseURL, 'search/movie?api_key=', this.API_KEY, '&query=', this.props.match.params.query);
        } else {
            url = ''.concat(this.baseURL, 'movie/popular?api_key=', this.API_KEY, '&page=', this.state.currentPage);
        }
        fetch(url)
        .then(result=>result.json())
        .then((data)=>{
            this.setState({
                ...this.state,
                moviesList: data.results
            });
        })
    }

    getMoviesList = () => {
        let moviesList = this.state.moviesList;
        if (moviesList.length > 0) {
            return moviesList.map((movie) => {
                movie.poster = this.baseImageURL + 'w300' + movie.poster_path;
                return <MovieCard movie={movie} key={movie.id} />
            });
        } else {
            return <h3>Not found</h3>
        }
    }

    componentDidMount() {
        this.getConfig();
        this.setMoviesList();
    }

    render() {
        return(
            <div className="home">
                <Header rootPage={true} searchQuery={this.state.searchQuery} _onSearchQueryChange={this._onSearchQueryChange} />
                <div className="home__movies-container">
                    {this.getMoviesList()}
                </div>

                <Pagination currentPage={this.props.match.params.page} query={this.props.match.params.query} />
            </div>
        );
    }
}

export default Home;