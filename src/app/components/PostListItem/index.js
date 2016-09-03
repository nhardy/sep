import React, { PropTypes } from 'react';
import styles from './styles.styl';

const PostListItem = ({ text, upvotes, thumbnail }) => (
  <div className={styles.container}>
    {thumbnail && <img className={styles.thumbnail} src={thumbnail} />}
    <span className={styles.text}>{text}</span>
    <span className={styles.upvote}>+{upvotes}</span>
  </div>
);

PostListItem.propTypes = {
  text: PropTypes.string,
  upvotes: PropTypes.number,
  thumbnail: PropTypes.string,
}

export default PostListItem;
