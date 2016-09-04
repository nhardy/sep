import React, { PropTypes } from 'react';

import thumbailImg from 'app/assets/images/thumbnail.svg';

import styles from './styles.styl';

const PostListItem = ({ text, upvotes, image }) => (
  <div className={styles.container}>
    {image ? (
      <img className={styles.thumbnail} src={image} alt="Post" />
    ) : (
      <img className={styles.thumbnail} src={thumbailImg} alt="No Thumbnail" />
    )}
    <span className={styles.text}>{text}</span>
    <span className={styles.upvote}>+{upvotes || 0}</span>
  </div>
);

PostListItem.propTypes = {
  text: PropTypes.string,
  upvotes: PropTypes.number,
  image: PropTypes.string,
};

export default PostListItem;
