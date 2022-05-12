import { Box, Button, Typography } from '@mui/material';
import { createTheme } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import logo from '../../logo/notFound.svg';

function FourOFour() {
  const navigate = useNavigate();
  const theme = createTheme();
  return (
    <>
      <Box sx={{ marginTop: theme.spacing(15), textAlign: 'center' }}>
        <Typography variant='h2' sx={{ fontSize: { md: '40px', xs: '30px' } }}>
          <span style={{ color: 'red' }}> 404 &nbsp;</span>Not Found
        </Typography>
        <Typography
          variant='body2'
          sx={{ fontSize: '20px', marginTop: theme.spacing(1) }}
        >
          The page you are tying to reach is not found
        </Typography>
        <Box>
          <Box
            component='img'
            src={logo}
            sx={{ maxWdith: '200px', maxHeight: '300px' }}
          />
        </Box>
        <Button
          variant='outlined'
          size='large'
          color='secondary'
          sx={{
            textTransform: 'none',
            // marginTop: theme.spacing(3),
            fontSize: '20px',
          }}
          onClick={() => navigate('/')}
        >
          Back Home
        </Button>
      </Box>
    </>
  );
}

export default FourOFour;
