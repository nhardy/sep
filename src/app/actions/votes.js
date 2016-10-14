import { baseUrl } from 'app/lib/api';


export const GET_VOTES_REQUEST = 'GET_VOTES_REQUEST';
export const GET_VOTES_SUCCESS = 'GET_VOTES_SUCCESS';
export const GET_VOTES_FAILURE = 'GET_VOTES_FAILURE';

export const VOTE_REQUEST = 'VOTE_REQUEST';
export const VOTE_SUCCESS = 'VOTE_SUCCESS';
export const VOTE_FAILURE = 'VOTE_FAILURE';

export function getVotes(id) {
  return {
    types: [GET_VOTES_REQUEST, GET_VOTES_SUCCESS, GET_VOTES_FAILURE],
    id,
    endpoint: {
      url: `${baseUrl()}/posts/${id}/votes`,
    },
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
    const token = getState().users.token;
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
