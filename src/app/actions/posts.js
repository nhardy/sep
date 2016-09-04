export const CLEAR_POST = 'CLEAR_POST';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';


export function clearPost() {
  return {
    type: CLEAR_POST,
  };
}

export function addPost(post) {
  return {
    types: [ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE],
    endpoint: {
      url: '/api/posts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    },
  };
}
