import * as types from '../actions/types';
import _ from 'underscore';

const initialState = {
  products: [
    {
      image: 'https://cdn.shopify.com/s/files/1/2477/5058/files/section_04_product_04_gold_pattern_bangle.jpg?1407742444019020188',
      name: 'Superpowered Bangel',
      price: 100,
      color: 'Purple',
      size: 'Small',
      quantity: 1
    },
    {
      image: 'https://cdn.shopify.com/s/files/1/2477/5058/files/section_04_product_04_gold_pattern_bangle.jpg?1407742444019020188',
      name: 'Superpowered Bangel',
      price: 100,
      color: 'Purple',
      size: 'Medium',
      quantity: 1
    }
  ]
};

const addToCart = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_PRODUCT:
      const currentProducts = [...state.products];
      if (_.contains(currentProducts, action.product)) {
        const currentIndex = _.indexOf(currentProducts, action.product);
        currentProducts.splice(currentIndex,1);
      } else {
        currentProducts.push(action.product);
      }
      return Object.assign({}, state, {products: currentProducts});

    case types.ADD_PRODUCT:
      const currentCount = [...state.products];
      currentCount.map(product => {
        if (product.image === action.product.image) {
          product.quantity += 1;
        }
        // if ((product.name === action.product.name) & (product.price === action.product.price) & 
        //     (product.color === action.product.color) & (product.size === action.product.price)) {
        //       product.quantity += 1;
        //     }
        else {
          currentCount.push(action.product);
        }
      });
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