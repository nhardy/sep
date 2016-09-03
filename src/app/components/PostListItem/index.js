import React, { PropTypes } from 'react';
import styles from './styles.styl';

const PostListItem = ({ text, upvotes, thumbnail }) => (
  <div className={styles.container}>
    {thumbnail ? <img className={styles.thumbnail} src={thumbnail} /> : <img className={styles.thumbnail} src='http://www.anchoredmarketing.co.za/wp-content/plugins/social-feeds1/img/no-img.png' />}
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
