import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import scriptsManager from 'redux-scripts-manager';

import createStore from 'app/redux/store';

import Root from './Root';


const store = createStore(window.__data);
scriptsManager(store);
const history = syncHistoryWithStore(browserHistory, store);
const mountPoint = document.getElementById('root');

function render(Component = Root) {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    mountPoint
  );
}

render();

if (module.hot) {
  module.hot.accept('./Root', () => {
    render(require('./Root').default); // eslint-disable-line global-require
  });
}

if (__DEVELOPMENT__) {
  // Enable helpful React warnings/errors
  window.React = React;
}
