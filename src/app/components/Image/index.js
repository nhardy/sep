import React, { PropTypes } from 'react';
import cx from 'classnames';

import styles from './styles.styl';


const Image = ({ className, src, alt, aspectRatio = 16 / 9 }) => (
  <div
    className={cx(className, styles.wrapper)}
    style={{ paddingBottom: `${100 / aspectRatio}%` }}>
    <img
      className={styles.image}
      src={src}
      alt={alt} />
  </div>
);

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number,
};

export default Image;
