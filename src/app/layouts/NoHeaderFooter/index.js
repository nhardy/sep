import React, { PropTypes } from 'react';
import { StickyContainer } from 'react-sticky';
import cx from 'classnames';

import SiteFooter from 'app/components/SiteFooter';
import SiteHeader from 'app/components/SiteHeader';

import styles from './styles.styl';


const NoHeaderFooterLayout = ({ children, className }) => (
  <StickyContainer className={styles.root}>
    <main className={cx(styles.main, className)}>
      {children}
    </main>
  </StickyContainer>
);

NoHeaderFooterLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default NoHeaderFooterLayout;
