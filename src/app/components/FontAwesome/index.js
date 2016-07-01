import React, { PropTypes } from 'react';
import cx from 'classnames';


const FontAwesome = ({ className, size = 32 }) => (
  <i className={cx('fa', className)} style={{ fontSize: `${size}px` }} />
);

FontAwesome.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

export default FontAwesome;
