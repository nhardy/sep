import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cx from 'classnames';

import * as appPropTypes from 'app/components/propTypes';

import styles from './styles.styl';


@connect(state => ({
  loggedIn: !!state.users.token,
}))
export default class SiteHeaderNav extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    className: PropTypes.string,
    items: appPropTypes.links,
    mode: PropTypes.oneOf(['horizontal', 'vertical']),
    loggedIn: PropTypes.bool,
  };

  static contextTypes = {
    location: appPropTypes.location,
  };

  static defaultProps = {
    mode: 'horizontal',
  };

  render() {
    const { className, mode, loggedIn } = this.props;
    const { location } = this.context;
    return (
      <nav className={cx(mode === 'horizontal' ? styles.horizontal : styles.vertical, className)}>
        <ul className={styles.list}>
          {!['/login', 'register'].includes(location.pathname) && !loggedIn && (
            <li className={cx(styles.item, { [styles.active]: ['/login', 'register'].includes(location.pathname) })}>
              <Link to="/login">Login</Link>
            </li>
          )}
          {location.pathname !== '/add' && (
            <li className={cx(styles.item, { [styles.active]: location.pathname === '/add' })}>
              <Link to="/add">Add Post</Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}
