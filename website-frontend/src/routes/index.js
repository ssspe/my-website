import { Switch, Route } from 'react-router-dom'
import Home from '../views/Home.js'
import React, { Component } from 'react';

class Router extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </main> );
    }

}

export default Router
