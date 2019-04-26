import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './MovieCard.css';

class MovieCard extends Component {

    render() {
        let { title, release_date, poster, id } = this.props.movie;
        return(
            <div className="movie-card">
                <img src={poster} alt={this.props.movie.title} />
                <h3 className="movie-card__heading">{title}</h3>
                <time className="movie-card__date">{release_date}</time>
                <Link to={"/movie/" + id} className="movie-card__link">More</Link>
            </div>
        );
    }
}

MovieCard.defaultProps = {
    movie: {
        id: null,
        image: null,
        title: null,
        date: null,
        description: null
    }
}

export default MovieCard;