import { baseUrl } from 'app/lib/api';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';


export function addUser(user) {
  return {
    types: [ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE],
    endpoint: {
      url: `${baseUrl()}/users`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  };
}

export function getUser(id) {
  return {
    types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE],
    id,
    endpoint: {
      url: `${baseUrl()}/users/${id}`,
    },
  };
}
