import config from 'app/config';


export const CLEAR_POST = 'CLEAR_POST';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const GET_POST_REQUEST = 'GET_POST_REQUEST';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';

export const SET_POST = 'SET_POST';


export function clearPost() {
  return {
    type: CLEAR_POST,
  };
}

export function addPost(post) {
  return {
    types: [ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE],
    endpoint: {
      url: `${config.api.baseUrl}/posts`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    },
  };
}


export function getPosts({ latitude, longitude }) {
  return {
    types: [GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE],
    endpoint: {
      url: `${config.api.baseUrl}/posts?lat=${latitude}&lon=${longitude}`,
    },
  };
}

export function getPost(id) {
  return {
    types: [GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE],
    id,
    endpoint: {
      url: `${config.api.baseUrl}/posts/${id}`,
    },
  };
}

export function setPost(id) {
  return {
    type: SET_POST,
    id,
  };
}
