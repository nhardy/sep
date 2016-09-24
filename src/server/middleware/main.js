import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { last } from 'lodash-es';
import { createMemoryHistory, match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { Provider } from 'react-redux';

import assetManifest from 'server/lib/assetManifest';
import createStore from 'app/redux/store';
import getRoutes from 'app/routes';
import Html from 'app/components/Html';


export default function mainMiddleware(req, res, next) {
  const history = createMemoryHistory(req.url);
  const store = createStore();

  match({ history, routes: getRoutes(store), location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(`${redirectLocation.pathname}${redirectLocation.search}`);
      return;
    }

    if (error) {
      error.status = 500;
      next(error);
      return;
    }

    if (!renderProps) {
      const err = new Error('No matching route defined');
      err.status = 404;
      next(err);
      return;
    }

    const { status } = last(renderProps.routes);
    if (status) {
      const err = new Error('Route defined a status code:', status);
      err.status = status;
      next(err);
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
    }).catch((err) => {
      err.status = 500;
      next(err);
    });
  });
}
