import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import styles from './styles/styles.scss';

render(
  <Router>
    <App />
  </Router>,
  document.querySelector('#root')
);
