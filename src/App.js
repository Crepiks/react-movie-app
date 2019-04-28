import React, { Component } from 'react';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Home from './components/Home';
import MoviePage from './components/MoviePage';

class App extends Component {


  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/:page?" component={Home} />
          <Route path="/movie/:id" component={MoviePage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
