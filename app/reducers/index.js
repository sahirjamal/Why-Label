import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import cartReducer from './cartReducer';
import checkoutReducer from './checkoutReducer';
import paymentReducer from './paymentReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  cartReducer,
  checkoutReducer,
  paymentReducer
})

export default rootReducer