import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from './actionTypes';
import * as api from '../api/index';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await api.getSingleProduct(id);
    const product = { ...data };
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: product.data._id,
        price: product.data.price,
        name: product.data.name,
        image: product.data.image,
        countInStock: product.data.countInStock,
        category: product.data.category,
        qty,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cartReducer.cartItems)
    );
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const saveShippinhAddress = (formData) => (dispatch, getstate) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: formData });
  localStorage.setItem('shippingAddress', JSON.stringify(formData));
};

export const savePaymentMethod = (formData) => (dispatch, getState) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: formData });
  localStorage.setItem('paymentMethod', JSON.stringify(formData));
};
