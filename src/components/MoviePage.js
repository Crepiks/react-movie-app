import React, {Component} from 'react';

import Header from './Header';

import './MoviePage.css';

class MoviePage extends Component {

    API_KEY = 'bd42635e62d60657f430cccaf1a52512';
    baseURL = 'https://api.themoviedb.org/3/';
    configData = null;
    baseImageURL = 'https://image.tmdb.org/t/p/';

    state = {
        id: null,
        image: '',
        title: '',
        date: '',
        desc: '',
        starred: false
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
    setMovieInfo = (id) => {
        var url;
        url = ''.concat(this.baseURL, 'movie/' + id + '?api_key=', this.API_KEY);
        fetch(url)
        .then(result=>result.json())
        .then((data)=>{
            this.setStarredState(data.id);
            this.setState({
                ...this.state,
                id: data.id,
                title: data.title,
                date: data.release_date,
                desc: data.overview,
                image: this.baseImageURL + 'w300' + data.poster_path
            });
        })
    }

    toggleStarred = () => {
        this.setState({
            ...this.state,
            starred: !this.state.starred
        });
    }

    getStarredIcon = () => {
        if (this.state.starred) {
            return <i className="fas fa-star movie-page__icon" onClick={this.toggleStarred}></i>;
        } else {
            return <i className="far fa-star movie-page__icon" onClick={this.toggleStarred}></i>;
        }
    }

    setStarredState = (id) => {
        console.log(this.getStarredMoviesList(), id);
        if (this.getStarredMoviesList().includes(id)) {
            this.setState({
                ...this.state,
                starred: true
            });
        }
    }

    getStarredMoviesList = () => {
        if (window.localStorage.getItem('starredMovies') === null) {
            return [];
        } else {
            return JSON.parse(window.localStorage.getItem('starredMovies'));
        }
    }

    componentDidMount() {
        console.log('Ids list: ' + this.getStarredMoviesList());
        this.getConfig();
        this.setMovieInfo(this.props.match.params.id);
    }

    storeMovieList = (movieList) => {
        movieList = JSON.stringify(movieList);
        window.localStorage.setItem('starredMovies', movieList);
    }

    componentWillUnmount() {
        let starredMoviesList = this.getStarredMoviesList();
        if (!starredMoviesList.includes(this.state.id) && this.state.starred) {
            starredMoviesList.push(this.state.id);
            this.storeMovieList(starredMoviesList);
        } else if (starredMoviesList.includes(this.state.id) && !this.state.starred) {
            starredMoviesList.splice(starredMoviesList.indexOf(this.state.id), 1);
            this.storeMovieList(starredMoviesList);
        }
    }
    
    
    render() {
        return(
            <div className="movie-page">
                <Header rootPage={false} />
                <h1 className="movie-page__title">{this.state.title}</h1>
                <img className="movie-page__image" src={this.state.image} alt={this.state.title} />
                <div className="movie-page__row">
                    <time>{this.state.date}</time>
                    {this.getStarredIcon()}
                </div>
                <p className="movie-page__paragraph">{this.state.desc}</p>
            </div>
        );
    }
}

export default MoviePage;