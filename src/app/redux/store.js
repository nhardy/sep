import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import fetchMiddleware from 'app/middleware/fetch';
import reducer from '../reducers';


export default function create(history, data) {
  const middleware = [thunk, fetchMiddleware];
  const finalCreateStore = applyMiddleware(...middleware)(createStore);
  const store = finalCreateStore(reducer, data);

  if (__DEVELOPMENT__) {
    if (module.hot) { // `module.hot` is injected by Webpack
      // Enable hot module reducer replacement
      module.hot.accept('../reducers', () => {
        store.replaceReducer(require('../reducers'));
      });
    }
  }

  return store;
}
