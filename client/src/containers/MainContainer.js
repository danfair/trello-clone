import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import BoardsPage from './BoardsPage';
import BoardPage from './BoardPage';
import SettingsPage from './SettingsPage';

class MainContainer extends Component {
  render() {
    return (
      <div>
        <header className="app-header">
          <Link to="/">
            <h1>Trello Clone</h1>
          </Link>
        </header>
        <Route exact path={this.props.match.url} render={(props) => <HomePage {...this.props} />} />
        <Route path={`${this.props.match.url}login`} render={(props) => <LoginPage {...this.props} />} />
        <Route path={`${this.props.match.url}boards`} render={(props) => <BoardsPage {...this.props} />} />
        <Route path={`${this.props.match.url}board/:boardId`} component={BoardPage} />
        <Route path={`${this.props.match.url}settings`} component={SettingsPage} />
      </div>
    )
  }
};

export default MainContainer;