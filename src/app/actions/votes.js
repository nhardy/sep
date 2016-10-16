import { baseUrl } from 'app/lib/api';


export const GET_VOTES_REQUEST = 'GET_VOTES_REQUEST';
export const GET_VOTES_SUCCESS = 'GET_VOTES_SUCCESS';
export const GET_VOTES_FAILURE = 'GET_VOTES_FAILURE';

export const VOTE_REQUEST = 'VOTE_REQUEST';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';

export const UNVOTE_REQUEST = 'UNVOTE_REQUEST';
export const UNVOTE_SUCCESS = 'UNVOTE_SUCCESS';
export const UNVOTE_FAILURE = 'UNVOTE_FAILURE';

export const GET_MY_VOTES_REQUEST = 'GET_MY_VOTES_REQUEST';
export const GET_MY_VOTES_SUCCESS = 'GET_MY_VOTES_SUCCESS';
export const GET_MY_VOTES_FAILURE = 'GET_MY_VOTES_FAILURE';

function _getVotes({ id, token }) {
  return {
    types: [GET_VOTES_REQUEST, GET_VOTES_SUCCESS, GET_VOTES_FAILURE],
    id,
    endpoint: {
      url: `${baseUrl()}/posts/${id}/votes`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function getVotes(id) {
  return (dispatch, getState) => {
    const { token } = getState().users;
    if (!token) return;
    dispatch(_getVotes({ id, token }));
  };
}

function _vote({ id, value, token }) {
  return {
    types: [VOTE_REQUEST, VOTE_SUCCESS, VOTE_FAILURE],
    id,
    endpoint: {
      url: `${baseUrl()}/posts/${id}/votes`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value,
      }),
    },
  };
}

function vote({ id, value }) {
  return async (dispatch, getState) => {
    const { token } = getState().users;
    if (!token) return;
    await dispatch(_vote({ id, value, token }));
  };
}

export function upvote(id) {
  return vote({ id, value: 1 });
}

export function downvote(id) {
  return vote({ id, value: -1 });
}

function _unvote({ id, token }) {
  return {
    types: [UNVOTE_REQUEST, UNVOTE_SUCCESS, UNVOTE_FAILURE],
    id,
    endpoint: {
      url: `${baseUrl()}/posts/${id}/votes`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function unvote(id) {
  return (dispatch, getState) => {
    const { token } = getState().users;
    if (!token) return;
    dispatch(_unvote({ id, token }));
  };
}

function _getMyVotes({ username, token }) {
  return {
    types: [GET_MY_VOTES_REQUEST, GET_MY_VOTES_SUCCESS, GET_MY_VOTES_FAILURE],
    endpoint: {
      url: `${baseUrl()}/users/${username}/votes`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function getMyVotes() {
  return async (dispatch, getState) => {
    const { username, token } = getState().users;
    if (!username || !token) return;
    dispatch(_getMyVotes({ username, token }));
  };
}
