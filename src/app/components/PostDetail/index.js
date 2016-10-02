import React, { PropTypes } from 'react';

import Image from 'app/components/Image';
import Button from 'app/components/Button';
import FontAwesome from 'app/components/FontAwesome';
import PostControls from 'app/components/PostControls';

import styles from './styles.styl';


const PostDetail = ({ id, text, upvotes, image }) => (
  <div className={styles.root}>
    { /* TODO: Needs to be replaced with user, location, now - time */}
    <div className={styles.info}>
      <span>{'Test User'} @ {'UTS'} {'(1h)'}</span>
    </div>
    {image && (
      <div className={styles.imageWrapper}>
        <Image src={image} alt="Post" />
        <Button className={styles.expand} onClick={() => {}}>
          <FontAwesome className="fa-arrows-alt" />
        </Button>
      </div>
    )}
    <PostControls id={id} hot={upvotes} />
    <div className={styles.body}>{text}</div>
  </div>
);

PostDetail.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  upvotes: PropTypes.number,
  image: PropTypes.string,
};

export default PostDetail;
