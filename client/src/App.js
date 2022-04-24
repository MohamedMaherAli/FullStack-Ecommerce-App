import NavBar from './components/navbar/Navbar';
import { Container, Box, CssBaseline } from '@mui/material';
import { AppStyles } from './AppStyles';
import Views from './views';

function App() {
  return (
    <div className='App' style={{ width: '100%', height: '100%' }}>
      <CssBaseline />
      <NavBar />
      <Box component='div' sx={AppStyles}>
        <Container maxWidth='xl'>
          <Views />
        </Container>
      </Box>
    </div>
  );
}

export default App;
