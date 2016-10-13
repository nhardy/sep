import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import * as appPropTypes from 'app/components/propTypes';

import styles from './styles.styl';


const SiteHeaderNav = ({ className, items, mode = 'horizontal' }, { location }) => {
  return (
    <nav className={cx(mode === 'horizontal' ? styles.horizontal : styles.vertical, className)}>
      <ul className={styles.list}>
        {items.filter(({ to }) => to !== location.pathname).map(({ to, target, children }) => (
          <li key={to} className={cx(styles.item, { [styles.active]: to.startsWith(location.pathname) })}>
            <Link to={to} target={target}>{children}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

SiteHeaderNav.propTypes = {
  className: PropTypes.string,
  items: appPropTypes.links,
  mode: PropTypes.oneOf(['horizontal', 'vertical']),
};

SiteHeaderNav.contextTypes = {
  location: appPropTypes.location,
};

SiteHeaderNav.defaultProps = {
  items:
  [
    { to: '/add', children: 'Add Post' },
    { to: '/register', children: 'Register' },
  ],
};

export default SiteHeaderNav;
