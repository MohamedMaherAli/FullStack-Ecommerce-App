import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './user';
import { productListReducer, productDetailsReducer } from './products';
import { cartReducer } from './cart';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
} from './order';

export default combineReducers({
  myOrderListReducer,
  orderPayReducer,
  orderDetailsReducer,
  userUpdateProfileReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  productListReducer,
  productDetailsReducer,
  cartReducer,
  orderCreateReducer,
});
