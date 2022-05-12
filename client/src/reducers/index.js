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
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productUpdateReviewReducer,
  productCategoryListReducer,
} from './products';
import { cartReducer } from './cart';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  orderListReducer,
  orderUpdateToDeliveredReducer,
} from './order';

export default combineReducers({
  productCategoryListReducer,
  productUpdateReviewReducer,
  orderUpdateToDeliveredReducer,
  orderListReducer,
  productUpdateReducer,
  productCreateReducer,
  productDeleteReducer,
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
