import { baseUrl } from 'app/lib/api';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';


function registerUser({ username, password, mobile }) {
  return {
    types: [REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE],
    endpoint: {
      url: `${baseUrl()}/users`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password: btoa(password),
        mobile,
      }),
    },
  };
}

export function loginUser({ username, password }) {
  return {
    types: [LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE],
    username,
    endpoint: {
      url: `${baseUrl()}/users/${username}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: btoa(password),
      }),
    },
  };
}

export function registerAndLoginUser({ username, password, mobile }) {
  return async (dispatch, getState) => {
    const getUser = () => getState().users.username;
    if (getUser()) return;
    await dispatch(registerUser({ username, password, mobile }));
    if (!getUser()) return;
    await dispatch(loginUser({ username, password }));
  };
}
