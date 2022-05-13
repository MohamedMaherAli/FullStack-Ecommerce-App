import axios from 'axios';

const API = axios.create({ baseURL: 'https://emerchantapp.herokuapp.com' });

//USER API
export const signUp = (formData, config) =>
  API.post('/api/users/signup', formData, config);
export const signIn = (formData, config) =>
  API.post('/api/users/signin', formData, config);

export const getUserDetails = (id, config) =>
  API.get(`/api/users/${id}`, config);
export const updateUserDetails = (formData, config) =>
  API.put('/api/users/profile', formData, config);

//USER ADMIN API
export const getUserList = (config) => API.get('/api/users/', config);

export const deleteUser = (id, config) =>
  API.delete(`/api/users/${id}`, config);

export const getUserById = (id, config) => API.get(`/api/users/${id}`, config);
export const updateUserById = (id, formData, config) =>
  API.put(`/api/users/${id}`, formData, config);

//PRODUCT API
export const getProducts = (searchKeyword) =>
  API.get(`/api/products?searchKeyword=${searchKeyword}`);

export const categoryProductList = (category, pageNumber) =>
  API.get(`/api/products/category/${category}?page=${pageNumber}`);

export const getSingleProduct = (id) => API.get(`/api/products/${id}`);
export const updateProductReview = (id, formData, config) =>
  API.post(`/api/products/${id}/reviews`, formData, config);

//PRODUCT ADMIN API
export const deleteProductById = (id, config) =>
  API.delete(`/api/products/${id}`, config);

export const createNewProduct = (formData, config) =>
  API.post(`/api/products/new`, formData, config);

export const updateProduct = (id, formData, config) =>
  API.put(`api/products/${id}`, formData, config);

//ORDER API
export const addOrders = (orderData, config) =>
  API.post('/api/orders', orderData, config);

export const OrderDetails = (id, config) =>
  API.get(`/api/orders/${id}`, config);

export const updateOrderToPaid = (id, paymentResult, config) =>
  API.put(`/api/orders/${id}/pay`, paymentResult, config);

export const getLoggedInUserOrders = (config) =>
  API.get('/api/orders/myorders', config);

//ORDER ADMIN API
export const getAllOrders = (config) => API.get('/api/orders/', config);

export const updateToDelivered = (id, config) =>
  API.put(`/api/orders/${id}/deliver`, config);
