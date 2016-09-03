import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

// import custom reducers here
import posts from './posts';


export default combineReducers({
  reduxAsyncConnect,
  routing: routerReducer,
  posts,
});
