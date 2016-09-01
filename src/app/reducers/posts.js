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
      const newState = {
        ...state,
      };
      const item = newState.items.filter((i) => i.id === action.response.item.id);
      if (item.length) {
        newState.items = newState.items.map((i) => {
          if (i.id === action.response.item.id) return action.response.item;
          return i;
        });
      } else {
        newState.items = [...newState.items, action.response.item];
      }
      return newState;

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
