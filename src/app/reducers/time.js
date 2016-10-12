import { SET_TIME } from 'app/actions/time';


const initialState = {
  timestamp: null,
};

export default function timeReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TIME:
      return {
        ...state,
        timestamp: action.timestamp,
      };

    default:
      return state;
  }
}
