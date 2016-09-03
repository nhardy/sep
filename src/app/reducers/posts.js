import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  SET_POST,
} from 'app/actions/postsActions';


const initialState = {
  items: [],
  id: null,
  posts: {},
};

export default function placesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
      };

    case GET_POSTS_SUCCESS:
      return {
        ...state,
        items: action.response.items,
      };

    case GET_POSTS_FAILURE:
      return {
        ...state,
      };

    case GET_POST_REQUEST:
      return {
        ...state,
      };

    case GET_POST_SUCCESS: // eslint-disable-line no-case-declarations
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.response.item.id]: action.response.item,
        },
        id: action.response.item.id,
      };

    case GET_POST_FAILURE:
      return {
        ...state,
      };

    case SET_POST:
      return {
        ...state,
        id: action.id,
      };

    default:
      return state;
  }
}
