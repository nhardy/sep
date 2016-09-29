import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Image from 'app/components/Image';
import FontAwesome from 'app/components/FontAwesome';
import thumbailImg from 'app/assets/images/thumbnail.svg';

import styles from './styles.styl';

const PostListItem = ({ id, text, upvotes, image }) => {
  const img = { src: image } || { src: thumbailImg, alt: 'placeholder' };
  return (
    <div className={styles.root}>
      <div className={styles.post}>
        <div className={styles.image}>
          <Image {...img} aspectRatio={1} />
        </div>
        <div className={styles.text}>
          <p><Link className={styles.text} to={`/posts/${id}`}>{text}</Link></p>
        </div>
      </div>
      <div className={styles.controls}>
        <span className={styles.hot}>{upvotes || 0}</span>
        <a className={styles.button} role="button">
          <FontAwesome className="fa-arrow-circle-up" />
        </a>
        <a className={styles.button} role="button">
          <FontAwesome className="fa-arrow-circle-down" />
        </a>
      </div>
    </div>
  );
};

PostListItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  text: PropTypes.string.isRequired,
  upvotes: PropTypes.number,
};

export default PostListItem;
