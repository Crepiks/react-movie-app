import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './MovieCard.css';

class MovieCard extends Component {

    render() {
        return(
            <div className="movie-card">
                <img src="https://image.tmdb.org/t/p/w200/kqjL17yufvn9OVLyXYpvtyrFfak.jpg" alt="mad max" />
                <h3 className="movie-card__heading">Mad Max</h3>
                <time className="movie-card__date">2019-03-02</time>
                <p className="movie-card__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</p>
                <Link to="/" className="movie-card__link">More</Link>
            </div>
        );
    }
}

export default MovieCard;