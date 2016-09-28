import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'app/components/FontAwesome';
import cx from 'classnames';

import styles from './styles.styl';

const PostDetailView = ({ id, text, upvotes, image }) => (
  <div className={styles.container}>
  { /* Needs to be replaced with user, location, now - time */}
  <div className={styles.postinfo}>
  <span>{'Test User'} @ {'UTS'} {'(1h)'}</span>
  </div>
    {image && (
      <div className={styles.imagecontainer}>
        <img className={styles.image} src={image} alt="Post" />
        <div className={styles.imagetoolbar}>
          <div className={cx(styles.button, styles.expandimage)}>
            <FontAwesome className="fa-arrows-alt" />
          </div>
        </div>
      </div>
    )}
    <span className={styles.postbody}>{text}</span>
    <div className={styles.bottombar}>
      <span className={cx(styles.votecount, (upvotes < 0 ? styles.negative:styles.positive))}>
        {(upvotes > 0) && '+'} {upvotes || 0}
      </span>
      <div className={cx(styles.button, styles.positive)}>
        <FontAwesome className="fa-plus-circle" />
      </div>
      <div className={cx(styles.button, styles.negative)}>
        <FontAwesome className="fa-minus-circle" />
      </div>
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
