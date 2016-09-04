import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';

import config from 'app/config';
import DefaultLayout from 'app/layouts/Default';
import { clearPost, addPost } from 'app/actions/posts';
import { getLocation } from 'app/actions/location';

import styles from './styles.styl';


@asyncConnect([{
  promise: ({ store: { dispatch } }) => Promise.resolve(dispatch(clearPost())),
}])
@connect((state) => ({
  location: {
    latitude: state.location.latitude,
    longitude: state.location.longitude,
  },
  post: state.posts.post,
}), { getLocation, addPost })
export default class AddPostView extends Component {
  static propTypes = {
    getLocation: PropTypes.func,
    addPost: PropTypes.func,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  };

  componentDidMount() {
    this.props.getLocation();
  }

  submit = () => {
    const text = this.refs.text.value;
    const { latitude, longitude } = this.props.location;
    this.props.addPost({ text, location: { latitude, longitude } });
  };

  render() {
    return (
      <DefaultLayout className={styles.root}>
        <Helmet title={`Add Post | ${config.appName}`} />
        <h1>Add Post</h1>
        <form>
          <textarea ref="text" />
          <input type="button" onClick={this.submit} />
        </form>
      </DefaultLayout>
    );
  }
}
