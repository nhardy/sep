import React, { Component } from 'react';
import { Link } from 'react-router';
import { Sticky } from 'react-sticky';
import cx from 'classnames';

import config from 'app/config';
import * as appPropTypes from 'app/components/propTypes';
import FontAwesome from 'app/components/FontAwesome';

import styles from './styles.styl';


const dismissEvents = ['click', 'touchstart'];

export default class SiteUpdatedHeader extends Component {
  static contextTypes = {
    location: appPropTypes.location,
  };

  componentDidMount() {
    dismissEvents.forEach(type => window.addEventListener(type, this.handleDismiss));
  }

  componentWillUnmount() {
    dismissEvents.forEach(type => window.removeEventListener(type, this.handleDismiss));
  }

  render() {
    const { pathname } = this.context.location;
    return (
      <header className={styles.root}>
        <Sticky className={styles.sticky}>
          <div className={cx(styles.column, styles.navBar)}>
            <label htmlFor="sidebarToggle" className={styles.hamburger} ref={ref => (this._label = ref)}>
              {pathname === '/' ? (
                <Link to="/map"><FontAwesome className="fa-map-pin" /></Link>
              ) : (
                <Link to="/"><FontAwesome className="fa-sticky-note" /></Link>
              )}
            </label>
            <Link to="/" className={styles.siteName}>{config.appName}</Link>
            <div className={styles.addPost}>
              {pathname === '/add' ? (
                <Link to="/"><FontAwesome className="fa-close" /></Link>
              ) : (
                <Link to="/add"><FontAwesome className="fa-pencil-square" /></Link>
              )}
            </div>
          </div>
        </Sticky>
        <input
          id="sidebarToggle"
          type="checkbox"
          className={styles.checkbox}
          ref={ref => (this._toggle = ref)} />
      </header>
    );
  }
}
