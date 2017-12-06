import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
// import { browserHistory } from 'react-router';
import { createBrowserHistory } from 'history';

// import the root reducer
import rootReducer from './redux/reducers/index';

// import comments from './data/comments';
// import posts from './data/posts';

// create an object for the default data
const defaultState = {
  // posts,
  // comments
  user: {
    id: null
  }
};

const store = createStore(rootReducer, defaultState);


export const history = syncHistoryWithStore(createBrowserHistory(), store);

if (module.hot) {
  module.hot.accept('./redux/reducers/', () => {
    const nextRootReducer = require('./redux/reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;