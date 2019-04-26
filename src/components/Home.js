import React, { Component } from 'react';

import './Home.css';

import Header from './Header';
import MovieCard from './MovieCard';

class Home extends Component {

    render() {
        return(
            <div className="home">
                <Header rootPage={true} />
                <div className="home__movies-container">
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                </div>
            </div>
        );
    }
}

export default Home;