import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { clearRouteError } from 'app/actions/routeError';
import App from 'app/components/App';
import ErrorView from 'app/views/Error';
import PostsView from 'app/views/Posts';
import AddPostView from 'app/views/AddPost';
import PostView from 'app/views/Post';
import RegistrationView from 'app/views/Registration';
import LoginView from 'app/views/Login';

export default function getRoutes(store) {
  const onChange = () => {
    store.dispatch(clearRouteError());
  };
  return (
    <Route path="/" component={App} onChange={onChange}>
      <Route path="/__404" component={ErrorView} status={404} />
      <Route path="/__500" component={ErrorView} status={500} />
      <IndexRoute component={PostsView} />
      <Route path="/add" component={AddPostView} />
      <Route path="/login" component={LoginView} />
      <Route path="/posts/:id" component={PostView} />
      <Route path="/register" component={RegistrationView} />
      <Route path="*" component={ErrorView} status={404} />
    </Route>
  );
}
