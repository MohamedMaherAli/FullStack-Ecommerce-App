import { combineReducers } from 'redux';
import authReducer from './auth';
import { productListReducer, productDetailsReducer } from './products';
import { cartReducer } from './cart';

export default combineReducers({
  authReducer,
  productListReducer,
  productDetailsReducer,
  cartReducer,
});
