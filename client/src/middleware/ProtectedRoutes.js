import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';
const useAuth = () => {
  const isLoggedIn =
    useSelector((state) => state.userLoginReducer.userInfo) !== null;
  return isLoggedIn;
};

const useAdmin = () => {
  const isAdmin = useSelector(
    (state) => state.userLoginReducer.userInfo.isAdmin
  );
  return isAdmin;
};

export const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to='/user/signin' replace state={{ from: location }} />
  );
};

export const ProtectedAdminRoutes = () => {
  const isAuth = useAuth();
  const isAdmin = useAdmin();
  return isAdmin && isAuth ? <Outlet /> : <Navigate to='/user/signin' />;
};
