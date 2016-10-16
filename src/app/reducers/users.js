import { last } from 'lodash-es';

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from 'app/actions/users';

const initialState = {
  username: null,
  token: null,
  loading: false,
  loaded: false,
};

export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        username: last(action.headers.location.split('/')),
      };

    case REGISTER_USER_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        username: action.username,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        token: action.response.token,
        loaded: true,
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
