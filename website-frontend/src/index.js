import React from 'react';
import './styles/index.css';
import App from './App';
import { render } from 'react-dom'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
