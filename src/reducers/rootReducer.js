import { combineReducers } from "redux";
import { responsiveStateReducer } from 'redux-responsive';
import { routerReducer } from 'react-router-redux';
import { authedUserReducer } from './authedUserReducer';
import { garageReducer } from 'reducers/garageReducer';
import { customersReducer } from 'reducers/customersReducer';

const appReducer = combineReducers({
  authedUser: authedUserReducer,
  customers: customersReducer,
  garage: garageReducer,
  browser: responsiveStateReducer,
  router: routerReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;