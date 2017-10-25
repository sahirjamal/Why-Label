import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import Cart from './cart';
import checkoutReducer from './checkoutReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  Cart,
  checkoutReducer
})

export default rootReducer