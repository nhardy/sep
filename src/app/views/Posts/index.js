import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import config from 'app/config';
import { getPosts } from 'app/actions/posts';
import * as appPropTypes from 'app/components/propTypes';
import DefaultLayout from 'app/layouts/Default';
import PostListItem from 'app/components/PostListItem';

@connect(state => ({
  posts: state.posts.items,
  location: {
    latitude: state.location.latitude,
    longitude: state.location.longitude,
  },
}), { getPosts })
export default class PostsView extends Component {
  static propTypes = {
    posts: appPropTypes.posts,
    getPosts: PropTypes.func,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  };

  componentDidMount() {
    const { latitude, longitude } = this.props.location;
    latitude && longitude && this.props.getPosts({
      latitude,
      longitude,
    });
  }

  componentDidUpdate(prevProps) {
    const prevLocation = prevProps.location;
    const { latitude, longitude } = this.props.location;
    if (!latitude || !longitude || prevLocation.latitude === latitude || prevLocation.longitude === longitude) return;
    this.props.getPosts({
      latitude,
      longitude,
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <DefaultLayout>
        <Helmet title={config.appName} />
        {posts.map(post => (
          <PostListItem key={post.id} {...post} />
        ))}
      </DefaultLayout>
    );
  }
}
