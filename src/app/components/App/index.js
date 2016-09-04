import React, { Component, PropTypes } from 'react';

import * as appPropTypes from 'app/components/propTypes';
import Geolocation from 'app/components/Geolocation';

import 'app/assets/stylus/reset.styl';
import 'app/assets/stylus/fonts.styl';
import 'font-awesome/css/font-awesome.min.css';
import styles from './styles.styl';


export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: appPropTypes.location,
  };

  static childContextTypes = {
    location: appPropTypes.location,
  };

  getChildContext() {
    return {
      location: this.props.location,
    };
  }

  render() {
    return (
      <div className={styles.root}>
        <Geolocation />
        {this.props.children}
      </div>
    );
  }
}
