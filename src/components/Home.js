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
    baseImageURL = 'https://image.tmdb.org/t/p/';

    state = {
        currentPage: 1,
        lastPage: 1,
        searchQuery: '',
        moviesList : []
    }

    // Return current page number according on routing 
    getCurrentPage = () => {
        if(isUndefined(this.props.match.params.page)) {
            return 1;
        } else {
            return +this.props.match.params.page
        }
    }

    // When user input query => update movie list
    _onSearchQueryChange = (searchQuery) => {
        this.setMoviesList(searchQuery, 1);
        
    }

    // Get configuration data from API
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

    // Set state according to query and page
    // Search query and page are stored too to be available when page update
    setMoviesList = (query, page) => {
        var url;
        if (query === '') {
            url = ''.concat(this.baseURL, 'movie/popular?api_key=', this.API_KEY, '&page=', page);
        } else {
            url = ''.concat(this.baseURL, 'search/movie?api_key=', this.API_KEY, '&query=', query, '&page=', page);
        }
        fetch(url)
        .then(result=>result.json())
        .then((data)=>{
            this.setState({
                ...this.state,
                moviesList: data.results,
                searchQuery: query, 
                currentPage: page, 
                lastPage: data.total_pages
            });
        })
    }

    // Render movies by list stored in state
    getMoviesList = () => {
        let moviesList = this.state.moviesList;
        if (moviesList.length > 0) {
            return moviesList.map((movie) => {
                movie.poster = this.baseImageURL + 'w300' + movie.poster_path;
                return <MovieCard movie={movie} key={movie.id} />
            });
        } else {
            // if there is no items in the list return message
            return <h3>Not found</h3>
        }
    }

    // Set configuration and initial movie list
    componentDidMount() {
        this.getConfig();
        this.setMoviesList(this.state.searchQuery, this.getCurrentPage());
    }

    componentDidUpdate() {
        // Reload movie list if page has been changed
        if (this.state.currentPage !== this.getCurrentPage()) {
            this.setMoviesList(this.state.searchQuery, this.getCurrentPage());
        }
    }

    render() {
        return(
            <div className="home">
                <Header rootPage={this.state.currentPage === 1 ? true : false} searchQuery={this.state.searchQuery} _onSearchQueryChange={this._onSearchQueryChange} />
                <div className="home__movies-container">
                    {this.getMoviesList()}
                </div>
                <Pagination currentPage={this.getCurrentPage()} lastPage={this.state.lastPage} />
            </div>
        );
    }
}

export default Home;