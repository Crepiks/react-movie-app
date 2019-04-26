import React, { Component } from 'react';

import './Home.css';

import Header from './Header';
import MovieCard from './MovieCard';

class Home extends Component {

    API_KEY = 'bd42635e62d60657f430cccaf1a52512';
    baseURL = 'https://api.themoviedb.org/3/';
    configData = null;
    baseImageURL = null;

    state = {
        currentPage: 1,
        moviesList : []
    }

    _onSearchQueryChange = (searchQuery) => {
        this.setMoviesList(this.state.currentPage, searchQuery);
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

    setMoviesList = (page, searchQuery) => {
        if (searchQuery !== '') {
            var url = ''.concat(this.baseURL, 'search/movie?api_key=', this.API_KEY, '&query=', searchQuery);
        } else {
            var url = ''.concat(this.baseURL, 'movie/popular?api_key=', this.API_KEY);
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
        this.setMoviesList(this.state.currentPage, '');
    }

    render() {
        return(
            <div className="home">
                <Header rootPage={true} searchQuery={this.state.searchQuery} _onSearchQueryChange={this._onSearchQueryChange} />
                <div className="home__movies-container">
                    {this.getMoviesList()}
                </div>
            </div>
        );
    }
}

export default Home;