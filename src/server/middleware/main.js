import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory, match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import { Provider } from 'react-redux';

import assetManifest from 'server/lib/assetManifest';
import createStore from 'app/redux/store';
import getRoutes from 'app/routes';
import Html from 'app/components/Html';


export default function mainMiddleware(req, res) {
  const history = createMemoryHistory(req.url);
  const store = createStore();

  match({ history, routes: getRoutes(store), location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
      return;
    } else if (error) {
      console.error('ROUTER ERROR:', error); // eslint-disable-line no-console
      res.status(500);
      res.send('Server Error');
      // TODO: Render using the React app
    } else if (renderProps) {
      loadOnServer(renderProps, store).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        const html = ReactDOMServer.renderToString(<Html assets={assetManifest(__DEVELOPMENT__)} component={component} store={store} />);

        res.send(`<!DOCTYPE html>\n${html}`);
      }).catch(err => {
        console.error('RENDERING ERROR:', err.stack || err); // eslint-disable-line no-console
        res.status(500);
        res.send('Server Error');
        // TODO: Render using the React app
      });
    } else {
      console.error('HTTP 404:', error); // eslint-disable-line no-console
      res.status(404);
      res.send('Not Found');
      // TODO: Render using the React app
    }
  });
}
