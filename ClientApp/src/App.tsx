import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";


import Competitions from './components/views/Competitions/Competitions'


function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Switch>
            <Route
              exact
              path="/"
              component={Competitions}
            />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
