import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { findDOMNode } from 'react-dom';
import { withRouter } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';
import { loadScript } from 'redux-scripts-manager';

import config from 'app/config';
import { getPosts } from 'app/actions/posts';
import * as appPropTypes from 'app/components/propTypes';
import UpdatedStyleDefaultLayout from 'app/layouts/UpdatedStyleDefault';
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
@withRouter
export default class PostsMapView extends Component {
  static propTypes = {
    router: routerShape,
    posts: appPropTypes.posts,
    getPosts: PropTypes.func,
    loadScript: PropTypes.func,
    mapsLoaded: PropTypes.bool,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  };

  _markers = [];
  _prevLocation = {};

  initMap = () => {
    const myLatLng = {lat: -25.363, lng: 131.044};

    // Create a map object and specify the DOM element for display.
    this._map = new google.maps.Map(this.refs.map, {
      center: myLatLng,
      scrollwheel: true,
      zoom: 15
    });
    this._map.setClickableIcons(true);
  }

  updateMap = () => {
    const { latitude, longitude } = this.props.location;

    // If the location has not been changed don't bother
    if (this._prevLocation.latitude === latitude && this._prevLocation.longitude === longitude) return;

    for (var i = 0; i < this._markers.length; i++) {
      this._markers[i].setMap(null);
    }
    this._markers = [];
    this._map.setCenter({ lat: latitude, lng: longitude });

    const cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.20,
      map: this._map,
      center: { lat: latitude, lng: longitude },
      radius: config.viewRadius,
    });

    this._markers.push(cityCircle);

    const userLocation = new google.maps.Marker({
      map: this._map,
      position: { lat: latitude, lng: longitude },
      shape: {
        type: 'circle',
        coords: [0, 0, 60],
      },
      zIndex: 1,
      icon: 'http://maps.google.com/mapfiles/ms/micons/man.png',
    });
    this._markers.push(userLocation);

    this.props.posts.forEach((post) => {
      const { latitude, longitude } = post.location;
      console.log(post);
      const marker = new google.maps.Marker({
        map: this._map,
        position: { lat: latitude, lng: longitude },
        title: `${post.id}`,
        zIndex: 0,
      });

      google.maps.event.addListener(marker, 'click', () => {
        this.props.router.push(`/posts/${marker.title}`);
      });
      this._markers.push(marker);
    });
    this._prevLocation = { latitude, longitude };
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
    const { latitude, longitude } = this.props.location;
    if (!prevProps.mapsLoaded && this.props.mapsLoaded) this.initMap();
    if ((this.props.posts.length > 0) && latitude && longitude) this.updateMap();
    const prevLocation = prevProps.location;
    if (!latitude || !longitude || prevLocation.latitude === latitude || prevLocation.longitude === longitude) return;
    this.props.getPosts({
      latitude,
      longitude,
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <UpdatedStyleDefaultLayout className={styles.root}>
        <Helmet title={`Map | ${config.appName}` } />
        <div ref="map" className={styles.map} />
      </UpdatedStyleDefaultLayout>
    );
  }
}
