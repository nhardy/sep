import React, { Component } from 'react';
import { Link } from 'react-router';
import { Sticky } from 'react-sticky';
import cx from 'classnames';

import config from 'app/config';
import * as appPropTypes from 'app/components/propTypes';
import FontAwesome from 'app/components/FontAwesome';

import Nav from './Nav';
import styles from './styles.styl';


const dismissEvents = ['click', 'touchstart'];

export default class SiteHeader extends Component {
  static contextTypes = {
    location: appPropTypes.location,
  };

  componentDidMount() {
    dismissEvents.forEach(type => window.addEventListener(type, this.handleDismiss));
  }

  componentWillUnmount() {
    dismissEvents.forEach(type => window.removeEventListener(type, this.handleDismiss));
  }

  handleDismiss = (e) => {
    if (!this._toggle.checked) return;
    if (this._sidebar.contains(e.target)) return;
    if (this._label.contains(e.target)) return;
    if (this._toggle.contains(e.target)) return;
    this._toggle.checked = false;
  };

  render() {
    const { pathname } = this.context.location;
    return (
      <header className={styles.root}>
        <Sticky className={styles.sticky} stickyClassName={styles.isSticky}>
          <div className={cx(styles.column, styles.navBar)}>
            <label htmlFor="sidebarToggle" className={styles.hamburger} ref={ref => (this._label = ref)}>
              <FontAwesome className="fa-bars" />
            </label>
            <Link to="/" className={styles.siteName}>{config.appName}</Link>
            <div className={styles.addPost}>
              {pathname === '/add' ? (
                <Link to="/"><FontAwesome className="fa-close" /></Link>
              ) : (
                <Link to="/add"><FontAwesome className="fa-plus" /></Link>
              )}
            </div>
            <Nav className={styles.nav} />
          </div>
        </Sticky>
        <input
          id="sidebarToggle"
          type="checkbox"
          className={styles.checkbox}
          ref={ref => (this._toggle = ref)} />
        <aside className={styles.aside} ref={ref => (this._sidebar = ref)}>
          <label className={styles.close} htmlFor="sidebarToggle">
            <FontAwesome className="fa-close" />
          </label>
          <Nav mode="vertical" />
        </aside>
      </header>
    );
  }
}
