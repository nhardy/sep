import {
  GET_VOTES_REQUEST,
  GET_VOTES_SUCCESS,
  GET_VOTES_FAILURE,
  VOTE_REQUEST,
  VOTE_SUCCESS,
  VOTE_FAILURE,
} from 'app/actions/votes';


const initialState = {
  posts: {},
};

export default function votesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_VOTES_REQUEST:
    case VOTE_REQUEST:
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

    default:
      return state;
  }
}
