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
  //posts: state.posts.items,
  posts:[
    {id:1, text:'Some stuff', location:{latitude: 138.00001, longitude: 64.000001}, upvote:35, image:''},
    {id:2, text:'Some other stuff with an image', location:{latitude: 138.00001, longitude: 64.000001}, upvote:35, image:'http://theisens.cachefly.net/getDynamicImage.aspx?path=M1922.jpg&h=460&w=430'},
    {id:3, text:'Some more stuffff', location:{latitude: 138.00001, longitude: 64.000001}, upvote:25, image:''}
  ]
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
      <DefaultLayout>
          <Helmet title={config.appname} />
          {posts.map((post)=>(
            <PostListItemView key={post.id} text={post.text} thumbnail={post.image} upvotes={post.upvote}/>
          ))}
      </DefaultLayout>
    );
  }
}
