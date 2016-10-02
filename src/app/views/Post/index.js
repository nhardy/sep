import React, { Component } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import config from 'app/config';
import { setRouteError } from 'app/actions/routeError';
import { getPost } from 'app/actions/posts';
import * as appPropTypes from 'app/components/propTypes';
import DefaultLayout from 'app/layouts/Default';
import PostDetail from 'app/components/PostDetail';


@asyncConnect([
  {
    promise: async ({ store: { dispatch, getState }, params: { id } }) => {
      const post = () => getState().posts.posts[id] || {};

      if (!post().loaded) {
        await dispatch(getPost(id));
      }

      const { loaded, error } = post();
      if (!loaded) {
        dispatch(setRouteError({ status: error && error.response.status === 404 ? 404 : 500 }));
        return;
      }
    },
  },
])
@connect((state, { params: { id } }) => ({
  post: state.posts.posts[id],
}))
export default class PostView extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    post: appPropTypes.post,
  };

  render() {
    return (
      <DefaultLayout>
        <Helmet title={config.appName} />
        <PostDetail {...this.props.post} />
      </DefaultLayout>
    );
  }
}
