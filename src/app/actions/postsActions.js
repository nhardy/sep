export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const GET_POST_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POST_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POST_FAILURE = 'GET_POSTS_FAILURE';

export const SET_POST = 'SET_POST';


export function getPosts({ latitude, longitude }) {
  return {
    types: [GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE],
    endpoint: {
      url: `/api/posts?lat=${latitude}&lon=${longitude}`,
    },
  };
}

export function getPost(id) {
  return {
    types: [GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE],
    endpoint: {
      url: `/api/posts/${id}`,
    },
  };
}

export function setPost(id) {
  return {
    type: SET_POST,
    id,
  };
}
