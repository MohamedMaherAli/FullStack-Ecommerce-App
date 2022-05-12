import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILS,
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
  ORDER_UPDATE_DELIVERED_RESET,
} from '../actions/actionTypes';

export const orderCreateReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
        success: true,
      };
    case CREATE_ORDER_FAILS:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case ORDER_DETAILS_FAILS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { ...state, loading: true };
    case ORDER_PAY_SUCCESS:
      return { ...state, loading: false, success: true };
    case ORDER_PAY_FAILS:
      return { ...state, loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const myOrderListReducer = (state = { orderList: [] }, action) => {
  switch (action.type) {
    case ORDER_MY_LIST_REQUEST:
      return { ...state, loading: true };
    case ORDER_MY_LIST_SUCCESS:
      return { ...state, loading: false, orderList: action.payload };
    case ORDER_MY_LIST_FAILS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case ORDER_LIST_FAILS:
      return { ...state, loading: false, error: action.payload };
    case ORDER_UPDATE_DELIVERED_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const orderUpdateToDeliveredReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case ORDER_UPDATE_DELIVERED_REQUEST:
      return { ...state, loading: true };
    case ORDER_UPDATE_DELIVERED_SUCCESS:
      return { ...state, loading: false, success: true };
    case ORDER_UPDATE_DELIVERED_FAILS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
