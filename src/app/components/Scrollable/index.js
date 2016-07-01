import React, { PropTypes } from 'react';
import GeminiScrollbar from 'react-gemini-scrollbar';
import cx from 'classnames';

import styles from './styles.styl';


const Scrollable = ({ className, wrapperClassName, horizontal = false, vertical = true, children }) => (
  <GeminiScrollbar className={cx({ [styles.hideHorizontal]: !horizontal, [styles.hideVertical]: !vertical }, className)}>
    <div className={styles.wrapper}>
      <div className={wrapperClassName}>
        {children}
      </div>
    </div>
  </GeminiScrollbar>
);

Scrollable.propTypes = {
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  children: PropTypes.node,
};

export default Scrollable;
