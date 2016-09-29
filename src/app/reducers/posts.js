import { last } from 'lodash-es';

import {
  CLEAR_POST,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  SET_POST,
} from 'app/actions/posts';


const initialState = {
  items: [],
  loaded: false,
  loading: false,
  posts: {},
  post: null,
};

export default function postsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR_POST:
      return {
        ...state,
        post: null,
      };

    case ADD_POST_REQUEST:
      return {
        ...state,
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        post: last(action.headers.location.split('/')),
      };

    case ADD_POST_FAILURE:
      return {
        ...state,
      };

    case GET_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_POSTS_SUCCESS:
      return {
        ...state,
        items: action.response.items,
        loading: false,
        loaded: true,
      };

    case GET_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case GET_POST_REQUEST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.id]: {
            ...state.posts[action.id],
            loading: true,
          },
        },
      };

    case GET_POST_SUCCESS:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.id]: {
            ...state.posts[action.id],
            ...action.response.item,
            loading: false,
            loaded: true,
          },
        },
      };

    case GET_POST_FAILURE:
      console.log(action);
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.id]: {
            ...state.posts[action.id],
            error: action.error,
            loading: false,
          },
        },
      };

    case SET_POST:
      return {
        ...state,
        post: action.id,
      };

    default:
      return state;
  }
}
