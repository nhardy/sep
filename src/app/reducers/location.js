import {
  GET_LOCATION,
  SET_LOCATION,
} from 'app/actions/location';


const initialState = {
  latitude: null,
  longitude: null,
  loading: false,
  error: null,
};

export default function locationReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_LOCATION:
      return {
        ...state,
        loading: true,
      };

    case SET_LOCATION:
      return {
        ...state,
        ...action.location,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
}
