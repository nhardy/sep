import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import config from 'app/config';
import { getposts } from 'app/actions/postsActions';
import DefaultLayout from 'app/layouts/Default';
import PostListItemView from 'app/components/PostListItem';

import styles from './styles.styl';

@connect((state) => ({
  posts: state.posts.items,
}), { getposts })
export default class PostsView extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    posts: PropTypes.array,
    getposts: PropTypes.func,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.setState({
        latitude,
        longitude,
      });

      console.log('this.props', this.props);
      console.log('actions', getposts);

      this.props.getposts({
        latitude,
        longitude,
      });
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <DefaultLayout className={styles.root}>
          <Helmet title={config.appname} />
          <PostListItemView text= "TES TITLE" upvotes={35}/>
      </DefaultLayout>
    );
  }
}
