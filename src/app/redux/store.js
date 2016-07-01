import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import fetchMiddleware from 'app/middleware/fetch';
import reducer from '../reducers';


export default function create(initialState) {
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk, fetchMiddleware),
    __CLIENT__ && __DEVELOPMENT__ && window.devToolsExtension
      ? window.devToolsExtension()
      : f => f
  ));

  if (__DEVELOPMENT__) {
    if (module.hot) { // `module.hot` is injected by Webpack
      // Enable hot module reducer replacement
      module.hot.accept('../reducers', () => {
        store.replaceReducer(require('../reducers').default);
      });
    }
  }

  return store;
}
