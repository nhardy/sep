import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';

import config from 'app/config';
import DefaultLayout from 'app/layouts/Default';
import { clearPost, addPost } from 'app/actions/posts';

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
}), { addPost })
@withRouter
export default class AddPostView extends Component {
  static propTypes = {
    getLocation: PropTypes.func,
    addPost: PropTypes.func,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    router: routerShape,
  };

  submit = () => {
    const text = this.refs.text.value;
    const { latitude, longitude } = this.props.location;
    if (!(text && latitude && longitude)) return; // TODO: Notify user

    this.props.addPost({ text, location: { latitude, longitude } }).then(() => {
      // FIXME: Ideally this would redirect to the new Post
      this.props.router.push('/');
    });
  };

  render() {
    return (
      <DefaultLayout className={styles.root}>
        <Helmet title={`Add Post | ${config.appName}`} />
        <form className={styles.form}>
          <h1 className={styles.heading}>Add Post</h1>
          <textarea ref="text" className={styles.textarea} />
          <input className={styles.button} type="button" onClick={this.submit} value="Add" />
        </form>
      </DefaultLayout>
    );
  }
}
