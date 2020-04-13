import React, { Component } from 'react';
import { Dispatch } from 'redux';
import logo from './logo.svg';
import './App.css';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { getUserByToken } from './actions/UserActions';
import { GetCompetitionTypes } from './actions/FilterActions';
import { fetchCompetitions } from './actions/CompetitionsActions';

import Loader from './components/widgets/Loader';
import Competitions from './components/views/Competitions';
import Results from './components/views/Results';
import Header from './components/views/Header';
import Login from './components/views/Login';
import Registrate from './components/views/Registrate';

import './styles/_buttons.scss';
import './styles/_style.scss';
import { IUser } from './@Types/types';

interface appComponentState {
  showLoginForm: boolean;
  showRegForm: boolean;
}
interface appComponentProps {
  isUserFetching: boolean;
  selectedType: number;
  isCompetitionFetching: boolean;
  areTypesFetching: boolean;
  getUserByToken: () => void;
  getCompetitionTypes: () => void;
  getCompetitions: () => void;
}

class App extends Component<appComponentProps, appComponentState> {
  constructor(props: appComponentProps) {
    super(props);
    this.state = {
      showLoginForm: false,
      showRegForm: false
    }
  }
  componentDidMount() {
    this.props.getCompetitionTypes();
    this.props.getCompetitions();
    if (localStorage.getItem('access_token')) {
      this.props.getUserByToken();
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          {
            this.props.isCompetitionFetching
              || this.props.isUserFetching
              || this.props.areTypesFetching ?
              <Loader />
              : null
          }
          <Header
            showLoginForm={this.state.showLoginForm}
            changeShowLoginFormStatus={() => this.setState({ showLoginForm: true })}
            changeShowRegFormStatus={() => this.setState({ showRegForm: true })} />
          {this.state.showLoginForm ?
            <Login
              close={() => this.setState({ showLoginForm: false })} />
            : null
          }
          {this.state.showRegForm ?
            <Registrate
              close={() => this.setState({ showRegForm: false })} />
            : null
          }
          <main className="container">
            <Switch>
              <Route
                exact
                path="/"
                component={Competitions}
              />
              <Route
                exact
                path="/results"
                component={Results}
              />
            </Switch>
          </main>
        </div>
      </Router >
    );
  }
}

const mapStateToProps = (state: any) => ({
  isUserFetching: state.user.isFetching,
  selectedType: state.filter.selectedType,
  isCompetitionFetching: state.competition.isFetching,
  areTypesFetching: state.filter.isFetching
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserByToken: () => dispatch(getUserByToken() as any),
  getCompetitionTypes: () => dispatch(GetCompetitionTypes() as any),
  getCompetitions: () => dispatch(fetchCompetitions() as any)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
