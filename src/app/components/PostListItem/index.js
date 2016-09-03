import React, { PropTypes } from 'react';
import style from './styles.styl';

const PostListItem = ({ text, upvotes, thumbnail }) => (
  <div>
    {thumbnail && <img src={ thumbnail }/>}
    <span>{ text }</span><br />
    <span>Up : { upvotes }</span>
  </div>
);

PostListItem.propTypes = {
  text: PropTypes.string,
  upvotes: PropTypes.number,
  thumbnail: PropTypes.string,
}

export default PostListItem;
