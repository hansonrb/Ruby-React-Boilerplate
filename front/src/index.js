
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from 'redux/createStore';
import routes from 'routes';

import 'index.css';

import registerServiceWorker from 'registerServiceWorker';

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
    />
  </Provider>,
  document.getElementById('root'), // eslint-disable-line
);

registerServiceWorker();
