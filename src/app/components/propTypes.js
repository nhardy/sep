import { PropTypes } from 'react';


export const link = PropTypes.shape({
  to: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
});

export const links = PropTypes.arrayOf(link);

export const location = PropTypes.shape({
  pathname: PropTypes.string,
  search: PropTypes.string,
  hash: PropTypes.string,
  query: PropTypes.object,
});

export const coordinates = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
});

// TODO: Use a custom validator
export const timestamp = PropTypes.string;

export const post = PropTypes.shape({
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  location: coordinates.isRequired,
  image: PropTypes.string,
});

export const posts = PropTypes.arrayOf(post);
