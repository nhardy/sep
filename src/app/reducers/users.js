import { last } from 'lodash-es';

import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from 'app/actions/users';


const initialState = {
  items: [],
  loaded: false,
  loading: false,
  user: null,
};

export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_USER_REQUEST:
      return {
        ...state,
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        user: last(action.headers.location.split('/')),
      };

    case ADD_USER_FAILURE:
      return {
        ...state,
      };

    case GET_USER_REQUEST:
      return {
        ...state,
        users: {
          ...state.users,
          [action.id]: {
            ...state.users[action.id],
            loading: true,
          },
        },
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          [action.id]: {
            ...state.users[action.id],
            ...action.response.item,
            loading: false,
            loaded: true,
          },
        },
      };

    case GET_USER_FAILURE:
      console.log(action);
      return {
        ...state,
        users: {
          ...state.users,
          [action.id]: {
            ...state.users[action.id],
            error: action.error,
            loading: false,
          },
        },
      };

    default:
      return state;
  }
}
