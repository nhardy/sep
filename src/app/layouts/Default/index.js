import React, { PropTypes } from 'react';
import { StickyContainer } from 'react-sticky';
import cx from 'classnames';

import SiteFooter from 'app/components/SiteFooter';
import SiteHeader from 'app/components/SiteHeader';

import styles from './styles.styl';


const DefaultLayout = ({ children, className }) => (
  <StickyContainer className={styles.root}>
    <SiteHeader />
    <main className={cx(styles.main, className)}>
      {children}
    </main>
    <SiteFooter />
  </StickyContainer>
);

DefaultLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default DefaultLayout;
