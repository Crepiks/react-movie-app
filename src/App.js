import React from 'react';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Home from './components/Home';
import MoviePage from './components/MoviePage';

function App() {



  return (
    <Router>
      <Switch>
        <Route exact path="/:page?/:query?" component={Home} />
        <Route path="/movie/:id" component={MoviePage} />
      </Switch>
    </Router>
  );
}

export default App;
