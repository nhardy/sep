import React, { PropTypes } from 'react';
import cx from 'classnames';

import styles from './styles.styl';


const Button = ({ className, children, ...props }) => (
  <button className={cx(styles.root, className)} {...props}>
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
