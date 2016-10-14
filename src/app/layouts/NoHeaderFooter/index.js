import React, { PropTypes } from 'react';
import { StickyContainer } from 'react-sticky';
import cx from 'classnames';

import styles from './styles.styl';


const NoHeaderFooterLayout = ({ children, className }) => (
  <div className={styles.root}>
    <main className={cx(styles.main, className)}>
      {children}
    </main>
  </div>
);

NoHeaderFooterLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default NoHeaderFooterLayout;
