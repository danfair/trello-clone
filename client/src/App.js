import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store, { history } from './store';

import AppContainer from './containers/AppContainer';

const App = () => (
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/" component={AppContainer} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default App;
