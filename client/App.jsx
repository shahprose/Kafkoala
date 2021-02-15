import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';

const App = () => {
  // useState
  // useEffect
  return (
    <main>
      <Switch>
        <Route path='/'>
          <Home />
        </Route>
        <Route component={Error} />
      </Switch>
      {/* <Navbar></Navbar> */}
    </main>
  );
};

export default App;
