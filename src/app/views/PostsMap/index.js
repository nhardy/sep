import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { findDOMNode } from 'react-dom';
import { loadScript } from 'redux-scripts-manager';

import config from 'app/config';
import { getPosts } from 'app/actions/posts';
import * as appPropTypes from 'app/components/propTypes';
import DefaultLayout from 'app/layouts/Default';
import PostListItem from 'app/components/PostListItem';

import styles from './styles.styl';


@connect(state => ({
  posts: state.posts.items,
  location: {
    latitude: state.location.latitude,
    longitude: state.location.longitude,
  },
  mapsLoaded: state.scripts.loaded.includes(config.scripts.googleMaps),
}), { getPosts, loadScript })
export default class PostsMapView extends Component {
  static propTypes = {
    posts: appPropTypes.posts,
    getPosts: PropTypes.func,
    loadScript: PropTypes.func,
    mapsLoaded: PropTypes.bool,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    googleMap: PropTypes.object,
  };

  initMap = (posts) => {
        const myLatLng = {lat: -25.363, lng: 131.044};

        // Create a map object and specify the DOM element for display.
        this.props.googleMap = new google.maps.Map(this.refs.map, {
          center: myLatLng,
          scrollwheel: false,
          zoom: 4
        });
  }

  updateMap = () => {
    const map = this.props.googleMap;
    this.props.posts.map((post) => {
      const { latitude, longitude } = post.location;
      const marker = new google.maps.Marker({
        map: map,
        position: { lat: latitude, lng: longitude },
        title: 'Hello World!'
      });
    });
  }

  componentDidMount() {
    this.props.loadScript(config.scripts.googleMaps);
    const { latitude, longitude } = this.props.location;
    latitude && longitude && this.props.getPosts({
      latitude,
      longitude,
    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.mapsLoaded && this.props.mapsLoaded) this.initMap(this.props.posts);
    if (this.props.posts.length > 0) this.updateMap();
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
        <div ref="map" className={styles.map} />
      </DefaultLayout>
    );
  }
}
