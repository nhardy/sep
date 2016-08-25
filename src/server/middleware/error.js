import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory, match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { Provider } from 'react-redux';

import assetManifest from 'server/lib/assetManifest';
import createStore from 'app/redux/store';
import getRoutes from 'app/routes';
import Html from 'app/components/Html';


// Express determines the type of middleware by number of arguments,
// so we instruct eslint to ignore the unused parameter(s) here
export default function errorMiddleware(error, req, res, next) { // eslint-disable-line no-unused-vars
  const status = error.status || 500;
  res.status(status);

  const unrecoverable = () => {
    res.send('Unrecoverable Server Error');
  };

  const location = status === 404 ? '/__404' : '/__500';
  const store = createStore();
  const history = createMemoryHistory(req.url);

  match({ history, routes: getRoutes(store), location }, (err, redirectLocation, renderProps) => {
    if (err) {
      unrecoverable();
      return;
    }

    loadOnServer({ ...renderProps, store }).then(() => {
      const inner = (
        <Provider store={store} key="provider">
          <ReduxAsyncConnect {...renderProps} />
        </Provider>
      );
      const component = (
        <Html
          assets={assetManifest()}
          component={inner}
          store={store} />
      );

      res.send(`<!DOCTYPE html>\n${ReactDOMServer.renderToString(component)}`);
    }).catch(() => {
      unrecoverable();
    });
  });
}
