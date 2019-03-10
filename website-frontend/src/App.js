import React, { Component } from 'react';
import './styles/App.css';
import Router from './routes/index.js';

class App extends Component {

  render() {
    return(
      <div>
        <Router />
      </div>
    );
  }
}

export default App;
