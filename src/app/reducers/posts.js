import last from 'lodash/last';

import {
  CLEAR_POST,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from 'app/actions/posts';


const initialState = {
  items: [],
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
      console.log(action);
      return {
        ...state,
        post: last(action.headers.location.split('/')),
      };

    case ADD_POST_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
}
