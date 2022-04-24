import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('User')) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('User')).token
    }`;
  }
  return req;
});

//USER API
export const signUp = (formData, config) =>
  API.post('/api/users/signup', formData, config);
export const signIn = (formData, config) =>
  API.post('/api/users/signin', formData, config);

export const getUserDetails = (id, config) =>
  API.get(`/api/users/${id}`, config);
export const updateUserDetails = (formData, config) =>
  API.put('/api/users/profile', formData, config);

//PRODUCT API
export const getProducts = () => API.get('/api/products');
export const getSingleProduct = (id) => API.get(`/api/products/${id}`);

//ORDER API
export const addOrders = (orderData, config) =>
  API.post('/api/orders', orderData, config);

export const OrderDetails = (id, config) =>
  API.get(`/api/orders/${id}`, config);

export const updateOrderToPaid = (id, paymentResult, config) =>
  API.put(`/api/orders/${id}/pay`, paymentResult, config);

export const getLoggedInUserOrders = (config) =>
  API.get('/api/orders/myorders', config);
