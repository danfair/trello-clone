import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import boards from './boards';
import comments from './comments';

const rootReducer = combineReducers({ boards, comments, routing: routerReducer });

export default rootReducer;