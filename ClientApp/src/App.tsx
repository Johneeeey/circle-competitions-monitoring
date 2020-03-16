import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";


import Competitions from './components/views/Competitions/Competitions'
import Header from './components/views/Header/Header';
import Login from './components/views/Login/Login';

import './styles/_buttons.scss';

interface appComponentState {
  showLoginForm: boolean
}

class App extends Component<{}, appComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showLoginForm: false
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header
            showLoginForm={this.state.showLoginForm}
            changeShowLoginFormStatus={() => this.setState({ showLoginForm: !this.state.showLoginForm })}/>
          {this.state.showLoginForm ?
            <Login
              close={() => this.setState({ showLoginForm: !this.state.showLoginForm })} />
            : null
          }
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
      </Router >
    );
  }
}

export default App;
