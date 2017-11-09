import * as types from '../actions/types';
import _ from 'underscore';

let count = 0;

const initialState = {
  products: []
};

const addToCart = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PRODUCT:
      const currentCount = [...state.products];
      currentCount.map(product => {
        if (product.image === action.product.image & product.color === action.product.color & product.size === action.product.size) {
          product.quantity += 1;
          count += 1;
        }
      });
      if (count === 0) {
        currentCount.push(action.product)
      }
      count = 0;
      return Object.assign({}, state, {products: currentCount});

      case types.REMOVE_PRODUCT:
        const currentCount1 = [...state.products];
        currentCount1.map(product => {
          if (product.image === action.product.image & product.color === action.product.color & product.size === action.product.size) {
            const currentIndex = _.indexOf(currentCount1, action.product);
            currentCount1.splice(currentIndex,1);
          }
        });
        return Object.assign({}, state, {products: currentCount1});

    default:
      return state;
  }
}

export default addToCart