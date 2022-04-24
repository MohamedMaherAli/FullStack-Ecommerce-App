import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';
const useAuth = () => {
  const isLoggedIn =
    useSelector((state) => state.userLoginReducer.userInfo) !== null;
  return isLoggedIn;
};

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to='/user/signin' replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
