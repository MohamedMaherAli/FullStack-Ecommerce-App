import { Routes, Route } from 'react-router-dom';
import SignIn from './components/auth/siginIn';
import SignUp from './components/auth/signUp';
import NavBar from './components/navbar/Navbar';
import FourOFour from './components/404/404';
import Home from './components/screens/HomeScreen';
import ProductScreen from './components/screens/ProductScreen';
import CartScreen from './components/screens/CartScreen';
import { Container, Box, CssBaseline } from '@mui/material';

function App() {
  const userToken = JSON.parse(localStorage.getItem('User'))?.token;
  return (
    <div className='App' style={{ width: '100%', height: '100%' }}>
      <CssBaseline />
      <NavBar />
      <Box
        component='div'
        sx={{
          backgroundColor: '#F3F4F6',
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth='xl'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/auth/signin' element={<SignIn />} />
            <Route path='/auth/signup' element={<SignUp />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='*' element={<FourOFour />} />
          </Routes>
        </Container>
      </Box>
    </div>
  );
}

export default App;
