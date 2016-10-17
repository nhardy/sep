import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Image from 'app/components/Image';
import PostControls from 'app/components/PostControls';
import thumbailImg from 'app/assets/images/thumbnail.svg';
import cx from 'classnames';

import styles from './styles.styl';

const PostListItem = ({ id, text, score, image }) => {
  const img = image ? { src: image } : { src: thumbailImg, alt: 'placeholder' };
  return (
    <div className={styles.root}>
      <Link className={styles.link} to={`/posts/${id}`}>
        <div className={styles.post}>
          {image && (
            <div className={styles.image}>
              <Image {...img} score={score} alt={'Post image'} aspectRatio={16/9} />
            </div>
          )}
          <div className={image ? cx(styles.imageExist, styles.container) : styles.container}>
            <div className = {styles.bottom}>
              <p className={styles.text}>{text}</p>
              <div className={(score >= 0) ? cx(styles.controls, styles.positiveNum) : cx(styles.controls, styles.negativeNum)}>{score}</div>
            </div>
          </div>
        </div>
      </Link>

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
