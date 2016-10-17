import React, { PropTypes } from 'react';
import { StickyContainer } from 'react-sticky';
import cx from 'classnames';

import SiteFooter from 'app/components/SiteFooter';
import SiteUpdatedHeader from 'app/components/SiteUpdatedHeader';

import styles from './styles.styl';


const UpdatedStyleDefaultLayout = ({ children, className }) => (
  <StickyContainer className={styles.root}>
    <SiteUpdatedHeader />
    <main className={cx(styles.main, className)}>
      {children}
    </main>
  </StickyContainer>
);

UpdatedStyleDefaultLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default UpdatedStyleDefaultLayout;
