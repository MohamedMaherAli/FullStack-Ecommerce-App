import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILS,
  ORDER_DETAILS_FAILS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAILS,
  ORDER_PAY_RESET,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_FAILS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAILS,
  ORDER_UPDATE_DELIVERED_REQUEST,
  ORDER_UPDATE_DELIVERED_SUCCESS,
  ORDER_UPDATE_DELIVERED_FAILS,
} from './actionTypes';

import * as api from '../api/index';
import axios from 'axios';

export const createOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const token = getState().userLoginReducer.userInfo.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await api.addOrders(orderData, config);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const token = getState().userLoginReducer.userInfo.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await api.OrderDetails(id, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateOrderToPaid =
  (id, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });
      const token = getState().userLoginReducer.userInfo.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await api.updateOrderToPaid(id, paymentResult, config);
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAILS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getLoggedInUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_MY_LIST_REQUEST });
    const token = getState().userLoginReducer.userInfo.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };
    const { data } = await api.getLoggedInUserOrders(config);
    dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_MY_LIST_FAILS,
      payload:
        error.respone && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const token = getState().userLoginReducer.userInfo.token;
    const config = { headers: { authorization: `Bearer ${token}` } };
    const { data } = await api.getAllOrders(config);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAILS,
      payload:
        error.response && error.respone.data.message
          ? error.respone.data.message
          : error.message,
    });
  }
};

export const updateToDelivered = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_UPDATE_DELIVERED_REQUEST });
    const token = getState().userLoginReducer.userInfo.token;
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const { data } = await api.updateToDelivered(id, config);
    dispatch({ type: ORDER_UPDATE_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_UPDATE_DELIVERED_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
