import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'app/components/App';
import Home from 'app/views/Home';


export default function getRoutes(store) { // eslint-disable-line no-unused-vars
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="*" component={null} status={404} />
    </Route>
  );
}
