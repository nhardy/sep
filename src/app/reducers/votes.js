import { merge } from 'lodash-es';

import {
  GET_VOTES_REQUEST,
  GET_VOTES_SUCCESS,
  GET_VOTES_FAILURE,
  VOTE_REQUEST,
  VOTE_SUCCESS,
  VOTE_FAILURE,
  UNVOTE_REQUEST,
  UNVOTE_SUCCESS,
  UNVOTE_FAILURE,
  GET_MY_VOTES_REQUEST,
  GET_MY_VOTES_SUCCESS,
  GET_MY_VOTES_FAILURE,
} from 'app/actions/votes';


const initialState = {
  posts: {},
};

export default function votesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_VOTES_REQUEST:
    case VOTE_REQUEST:
    case UNVOTE_REQUEST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.id]: {
            ...state.posts[action.id],
            error: null,
            loading: true,
          },
        },
      };

    case GET_VOTES_SUCCESS:
    case VOTE_SUCCESS:
    case UNVOTE_SUCCESS:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.id]: {
            ...state.posts[action.id],
            error: null,
            loading: false,
            loaded: true,
            ...action.response,
          },
        },
      };

    case GET_VOTES_FAILURE:
    case VOTE_FAILURE:
    case UNVOTE_FAILURE:
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

    case GET_MY_VOTES_SUCCESS:
      return {
        ...state,
        posts: merge({}, state.posts, action.response.votes),
      };

    case GET_MY_VOTES_REQUEST:
    case GET_MY_VOTES_FAILURE:
    default:
      return state;
  }
}
