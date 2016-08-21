import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'app/components/App';
import HomeView from 'app/views/Home';
import ErrorView from 'app/views/Error';


export default function getRoutes(store) { // eslint-disable-line no-unused-vars
  return (
    <Route path="/" component={App}>
      <Route path="/__404" component={ErrorView} status={404} />
      <IndexRoute component={HomeView} />
      <Route path="*" component={ErrorView} status={404} />
    </Route>
  );
}
