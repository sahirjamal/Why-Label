import * as types from './types';
import { push } from 'react-router-redux';

// Routes Function
export function navigate(route){
  return push(route)
}

// Cart Functions
export function addProduct(product) {
  return {
    type: types.ADD_PRODUCT,
    product
  }
}

export function removeProduct(product) {
  return {
    type: types.REMOVE_PRODUCT,
    product
  }
}

// Checkout Functions

export function firstName(name) {
  return {
    type: types.FIRST_NAME,
    name
  }
}

export function lastName(name) {
  return {
    type: types.LAST_NAME,
    name
  }
}

export function phoneNumber(number) {
  return {
    type: types.PHONE_NUMBER,
    number
  }
}

export function emailAddress(email) {
  return {
    type: types.EMAIL_ADDRESS,
    email
  }
}

export function shippingAddress(address) {
  return {
    type: types.SHIPPING_ADDRESS,
    address
  }
}

export function shippingAddress2(address2) {
  return {
    type: types.SHIPPING_ADDRESS2,
    address2
  }
}

export function usCity(city) {
  return {
    type: types.US_CITY,
    city
  }
}

export function selectedState(state) {
  return {
    type: types.SELECTED_STATE,
    state
  }
}

export function zipCode(zip) {
  return {
    type: types.ZIP_CODE,
    zip
  }
}

// Selected Results Function

// export function toggleSelectedList(place) {
//   return {
//     type: types.TOGGLE_LIST,
//     place
//   }
// }

// export function addEmail(email) {
//   return {
//     type: types.ADD_EMAIL,
//     email
//   }
// }