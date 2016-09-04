import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import config from 'app/config';
import { getPosts } from 'app/actions/posts';
import DefaultLayout from 'app/layouts/Default';
import PostListItemView from 'app/components/PostListItem';

// import styles from './styles.styl';

@connect((state) => ({
  posts: state.posts.items,
  location: {
    latitude: state.location.latitude,
    longitude: state.location.longitude,
  },
}), { getPosts })
export default class PostsView extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    posts: PropTypes.array,
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
        {posts.map((post) => (
          <PostListItemView key={post.id} {...post} />
        ))}
      </DefaultLayout>
    );
  }
}
