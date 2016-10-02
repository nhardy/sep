import React, { Component, PropTypes } from 'react';
import { first } from 'lodash-es';
import { withRouter } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';

import config from 'app/config';
import { clearPost, addPost } from 'app/actions/posts';
import DefaultLayout from 'app/layouts/Default';
import FontAwesome from 'app/components/FontAwesome';

import styles from './styles.styl';


@asyncConnect([{
  promise: ({ store: { dispatch } }) => Promise.resolve(dispatch(clearPost())),
}])
@connect(state => ({
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

  state = {};

  pick = (e) => {
    e.preventDefault();
    this._image.click();
  };

  readImage = () => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.setState({ image: reader.result });
    });

    const image = first(this._image.files);
    if (!image) {
      this.setState({ image: null });
      return;
    }
    reader.readAsDataURL(image);
  };

  textChange = () => {
    this.state.blankPost = (this._text.value === '');
  };

  submit = async () => {
    const { latitude, longitude } = this.props.location;
    const text = this._text.value;
    const { image } = this.state;
    const { blankPost } = this.state;

    if (!(text && latitude && longitude)) {
      this.setState({ blankPost: true });
      return;
    }
    await this.props.addPost({
      location: { latitude, longitude },
      text,
      image,
    });

    // FIXME: Ideally this would redirect to the new Post
    this.props.router.push('/');
  };

  render() {
    const { image } = this.state;
    return (
      <DefaultLayout className={styles.root}>
        <Helmet title={`Add Post | ${config.appName}`} />
        <form className={styles.form}>
          <h1 className={styles.heading}>Add Post</h1>
          <input className={styles.upload} type="file" id="image" accept="image/*" ref={ref => (this._image = ref)} onChange={this.readImage} />
          <button className={styles.button} onClick={this.pick}>
            <FontAwesome className="fa-upload" size={16} />
            <span>{image ? 'Change image' : 'Upload image'}</span>
          </button>
          {image && <img className={styles.image} src={image} alt="Your upload" />}
          <label className={styles.label} htmlFor="text">Your post</label>
          <textarea id="text" ref={ref => (this._text = ref)} className={styles.textarea} onChange={this.textChange} />
          <input className={styles.button} type="button" onClick={this.submit} value="Add" />
          {this.state.blankPost && (<div className={styles.msgContainer}>
            <span className={styles.error}>Enter text to be posted!</span>
            </div>)}
        </form>
      </DefaultLayout>
    );
  }
}
