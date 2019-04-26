import React, {Component} from 'react';

import Header from './Header';

import './MoviePage.css';

class MoviePage extends Component {

    state = {
        image: '',
        title: '',
        date: '',
        desc: ''
    }

    componentDidMount() {

    }
    
    render() {
        return(
            <div className="movie-page">
                <Header rootPage={false} />
                <h1>This is Movie page</h1>
            </div>
        );
    }
}

export default MoviePage;