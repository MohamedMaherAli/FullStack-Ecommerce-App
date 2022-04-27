import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userGetReducer,
  userUpdateReducer,
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
  userGetReducer,
  userUpdateReducer,
  userDeleteReducer,
  userListReducer,
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
