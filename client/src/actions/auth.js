import { AUTH } from './actionTypes';
import * as api from '../api/index';
export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, payload: data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, payload: data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};
