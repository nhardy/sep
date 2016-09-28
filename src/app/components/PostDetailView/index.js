import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'app/components/FontAwesome';

import styles from './styles.styl';

const PostDetailView = ({ id, text, upvotes, image }) => (
  <div className={styles.container}>
    {image && (
      <img className={styles.image} src={image} alt="Post" />
    )}
    <span className={styles.postbody}>{text}</span>
    <div className={styles.bottombar}>
      <span className={styles.votecount}> {(upvotes > 0) && '+'} {upvotes || 0}</span>
      <FontAwesome className="fa-arrow-circle-o-up" />
      <FontAwesome className="fa-arrow-circle-o-down" />
    </div>
  </div>
);

PostDetailView.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  upvotes: PropTypes.number,
  image: PropTypes.string,
};

export default PostDetailView;
