import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from 'app/redux/store';
import getRoutes from 'app/routes';


const mountPoint = document.getElementById('root');
const store = createStore(window.__data);

const component = (
  <Router
    render={props => (<ReduxAsyncConnect {...props} />)}
    history={syncHistoryWithStore(browserHistory, store)}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  mountPoint
);

if (__DEVELOPMENT__) {
  // Enable helpful React warnings/errors
  window.React = React;
}
