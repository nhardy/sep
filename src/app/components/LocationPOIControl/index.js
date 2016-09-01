import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import cx from 'classnames';

import styles from 'app/assets/stylus/common.styl';

const LocationPOIControl = () => (
  <FontIcon className={cx('material-icons', styles.icon)}>
    crop free
  </FontIcon>
);

export default LocationPOIControl;
