import * as types from '../actions/types';
import _ from 'underscore';
import stateList from '../components/stateList';

const initialState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  emailAddress: '',
  shippingAddress: '',
  shippingAddress2: '',
  usCity: '',
  usStates: stateList,
  selectedState: null,
  zipCode: '',
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.FIRST_NAME:
      return Object.assign({}, state, {firstName: action.name});

    case types.LAST_NAME:
      return Object.assign({}, state, {lastName: action.name});

    case types.PHONE_NUMBER:
      return Object.assign({}, state, {phoneNumber: action.number});

    case types.EMAIL_ADDRESS:
      return Object.assign({}, state, {emailAddress: action.email});

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

export default checkoutReducer;
