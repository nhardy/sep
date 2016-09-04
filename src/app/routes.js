import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'app/components/App';
import ErrorView from 'app/views/Error';
import PostsView from 'app/views/Posts';
import AddPostView from 'app/views/AddPost';


export default function getRoutes(store) { // eslint-disable-line no-unused-vars
  return (
    <Route path="/" component={App}>
      <Route path="/__404" component={ErrorView} status={404} />
      <IndexRoute component={PostsView} />
      <Route path="/add" component={AddPostView} />
      <Route path="*" component={ErrorView} status={404} />
    </Route>
  );
}
