import {
  PRODUCT_LIST_FAILS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILS,
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILS,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILS,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_REVIEW_REQUEST,
  PRODUCT_UPDATE_REVIEW_SUCCESS,
  PRODUCT_UPDATE_REVIEW_FAILS,
  PRODUCT_UPDATE_REVIEW_RESET,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAILS,
} from '../actions/actionTypes';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload.data };
    case PRODUCT_LIST_FAILS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload.data };
    case PRODUCT_DETAILS_FAILS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true, success: false };
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case PRODUCT_DELETE_FAILS:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case PRODUCT_DELETE_RESET:
      return { success: false, error: null };
    default:
      return state;
  }
};

export const productCreateReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case PRODUCT_CREATE_FAILS:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return { success: false, error: null };
    default:
      return state;
  }
};

export const productUpdateReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case PRODUCT_UPDATE_FAILS:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { ...state, success: false, loading: false };
    default:
      return state;
  }
};

export const productUpdateReviewReducer = (
  state = { loading: false, succcess: false },
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_UPDATE_REVIEW_SUCCESS:
      return { ...state, loading: false, success: true };
    case PRODUCT_UPDATE_REVIEW_FAILS:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_UPDATE_REVIEW_RESET:
      return { ...state, loading: false, success: false };
    default:
      return state;
  }
};

export const productCategoryListReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
        loading: false,
      };
    case PRODUCT_CATEGORY_LIST_FAILS:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
