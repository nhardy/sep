import {
  SET_ROUTE_ERROR,
  CLEAR_ROUTE_ERROR,
} from 'app/actions/routeError';


const initialState = null;

export default function routeErrorReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ROUTE_ERROR:
      return {
        route: {
          status: action.status,
        },
      };

    case CLEAR_ROUTE_ERROR:
      return null;

    default:
      return state;
  }
}
