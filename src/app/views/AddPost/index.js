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
    post: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    router: routerShape,
  };

  state = {};
  _submitting = false;

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
    this.updateErrorState();
  };

  updateErrorState = () => {
    const { latitude, longitude } = this.props.location;
    const error = (!(latitude && longitude) || (this._text.value === ''));
    this.setState({ postError: error });
    return error;
  };

  submit = async () => {
    if (this._submitting) return;
    console.log('About to submit', this._submitting);

    const { latitude, longitude } = this.props.location;
    const text = this._text.value;
    const { image } = this.state;

    if (this.updateErrorState()) return;
    this._submitting = true;
    await this.props.addPost({
      location: { latitude, longitude },
      text,
      image,
    });

    const { post } = this.props;
    post && this.props.router.push(`/posts/${post}`);
  };

  render() {
    const { latitude, longitude } = this.props.location;
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
          {this.state.postError && (
            <div className={styles.msgContainer}>
              <span className={styles.error}>
                {!(latitude && longitude) ? 'Unable to retrieve location!' : 'Enter text to be posted!'}
              </span>
            </div>
          )}
        </form>
      </DefaultLayout>
    );
  }
}
