import { AUTH } from "../actions/actionTypes";
const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("User", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    default:
      return state;
  }
};

export default authReducer;
