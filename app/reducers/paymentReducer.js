import * as types from '../actions/types';
import _ from 'underscore';
import stateList from '../components/stateList';

const initialState = {
  shippingAddress: '',
  shippingAddress2: '',
  usCity: '',
  usStates: stateList,
  selectedState: 'Alabama',
  zipCode: '',
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SHIPPING_ADDRESS:
      return Object.assign({}, state, {shippingAddress: action.address});

    case types.SHIPPING_ADDRESS2:
      return Object.assign({}, state, {shippingAddress2: action.address2});

    case types.US_CITY:
      return Object.assign({}, state, {usCity: action.city}); 
    
    case types.SELECTED_STATE:
      return Object.assign({}, state, {selectedState: action.state}); 

    case types.ZIP_CODE:
      return Object.assign({}, state, {zipCode: action.zip}); 
      
    default:
      return state;
  }
};

export default paymentReducer;
