import { Routes, Route } from 'react-router-dom';
import FourOFour from './components/404/404';
import Home from './components/screens/HomeScreen';
import ProductScreen from './components/screens/ProductScreen';
import CartScreen from './components/screens/CartScreen';
import SignUp from './components/screens/SignUpScreen';
import SignIn from './components/screens/SiginInScreen';
import UserProfileScreen from './components/screens/UserProfileScreen';
import ShippingScreen from './components/screens/ShippingScreen';
import PaymentScreen from './components/screens/PaymentScreen';
import ProtectedRoutes from './middleware/ProtectedRoutes';
import PlaceOrderScreen from './components/screens/PlaceOrderScreen';
import OrderScreen from './components/screens/OrderScreen';

function Views() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/user/signin' element={<SignIn />} />
      <Route path='/user/signup' element={<SignUp />} />

      <Route element={<ProtectedRoutes />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/user/profile' element={<UserProfileScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
      </Route>

      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />}>
        <Route path=':id' element={<CartScreen />} />
      </Route>
      <Route path='*' element={<FourOFour />} />
    </Routes>
  );
}

export default Views;
