import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { findDOMNode } from 'react-dom';

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
export default class PostsMapView extends Component {
  static propTypes = {
    posts: appPropTypes.posts,
    getPosts: PropTypes.func,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  };

  initMap = () => {
        const myLatLng = {lat: -25.363, lng: 131.044};

        // Create a map object and specify the DOM element for display.
        const map = new google.maps.Map(findDOMNode(this._map), {
          center: myLatLng,
          scrollwheel: false,
          zoom: 4
        });

        // Create a marker and set its position.
        const marker = new google.maps.Marker({
          map: map,
          position: myLatLng,
          title: 'Hello World!'
        });
  }

  componentDidMount() {
    const { latitude, longitude } = this.props.location;
    latitude && longitude && this.props.getPosts({
      latitude,
      longitude,
    });
    window.initMap = this.initMap;
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
        <Helmet
          script={[
            {"src": `https://maps.googleapis.com/maps/api/js?key=${config.mapsAPIKey}&callback=initMap`, "type": "text/javascript"},
          ]}
        />
        <div id="map" ref={this._map} />
      </DefaultLayout>
    );
  }
}
