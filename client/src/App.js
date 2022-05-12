import NavBar from './components/navbar/Navbar';
import { Container, Box, CssBaseline } from '@mui/material';
import { AppStyles } from './AppStyles';
import Views from './views';
import { useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const location = useLocation();
  const adminUrls = location.pathname.startsWith('/admin/');
  const maxWdith = adminUrls ? false : 'xl';
  return (
    <div
      className='App'
      style={{ width: '100%', height: '100%', overflow: 'auto' }}
    >
      <CssBaseline />
      <NavBar />
      <Box component='div' sx={AppStyles}>
        <Container maxWidth={maxWdith}>
          <Views />
        </Container>
      </Box>
    </div>
  );
}

export default App;
