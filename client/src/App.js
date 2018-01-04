import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store, { history } from './store';

import AppContainer from './containers/AppContainer';

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={AppContainer} />
      </Switch>
    </Router>
  </Provider>
)

export default App;
