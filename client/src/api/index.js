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

//AUTH API
export const signUp = (formData) => API.post('/api/auth/signup', formData);
export const signIn = (formData) => API.post('/api/auth/signin', formData);

//PRODUCT API
export const getProducts = () => API.get('/api/products');
export const getSingleProduct = (id) => API.get(`/api/products/${id}`);
