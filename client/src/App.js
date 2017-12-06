import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import api from './api';

import { Provider } from 'react-redux';
import store, { history } from './store';

import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import BoardsPage from './containers/BoardsPage';
import BoardPage from './containers/BoardPage';
import SettingsPage from './containers/SettingsPage';

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <div className="app-container">
        <header className="app-header">
          <Link to="/">
            <h1>Trello Clone</h1>
          </Link>
        </header>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/boards" component={BoardsPage} />
          <Route path="/boards/:boardId" component={BoardPage} />
          <Route path="/settings" component={SettingsPage} />
        </Switch>
      </div>
    </Router>
  </Provider>
)

export default App;
