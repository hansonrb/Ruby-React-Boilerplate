
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { middleware as awaitMiddleware } from 'redux-await';
import { browserHistory } from 'react-router';

import rootReducer from './reducer';

const session = localStorage.getItem('tmz_session'); // eslint-disable-line
const initialState = {};

if (session) {
  const sessionObj = JSON.parse(session);
  if (sessionObj.headers.expiry * 1000 < Date.now()) {
    // expiry timeout
    localStorage.removeItem('tmz_session');
  } else {
    initialState.session = sessionObj;
  }
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(
      thunkMiddleware,
      awaitMiddleware,
      routerMiddleware(browserHistory),
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,  // eslint-disable-line
  ),
);

export default () => store;
