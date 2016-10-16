import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Image from 'app/components/Image';
import PostControls from 'app/components/PostControls';
import thumbailImg from 'app/assets/images/thumbnail.svg';

import styles from './styles.styl';

const PostListItem = ({ id, text, score, image }) => {
  const img = image ? { src: image } : { src: thumbailImg, alt: 'placeholder' };
  return (
    <div className={styles.root}>
      <Link className={styles.link} to={`/posts/${id}`}>
        <div className={styles.post}>
          <div className={styles.image}>
            <Image {...img} aspectRatio={1} />
          </div>
          <div className={styles.text}>
            <p>{text}</p>
          </div>
        </div>
      </Link>
      <PostControls id={id} score={score} />
    </div>
  );
};

PostListItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  text: PropTypes.string.isRequired,
  score: PropTypes.number,
};

export default PostListItem;
