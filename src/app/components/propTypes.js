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
