import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import thumbailImg from 'app/assets/images/thumbnail.svg';

import styles from './styles.styl';

const PostListItem = ({ id, text, upvotes, image }) => (
  <div className={styles.container}>
    {image ? (
      <img className={styles.thumbnail} src={image} alt="Post" />
    ) : (
      <img className={styles.thumbnail} src={thumbailImg} alt="No Thumbnail" />
    )}
    <Link className={styles.text} to={`/posts/${id}`}>{text}</Link>
    <span className={styles.upvote}>+{upvotes || 0}</span>
  </div>
);

PostListItem.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  upvotes: PropTypes.number,
  image: PropTypes.string,
};

export default PostListItem;
