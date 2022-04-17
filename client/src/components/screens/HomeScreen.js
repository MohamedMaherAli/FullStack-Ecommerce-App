import React from 'react';
import Products from '../products/Products';
import { Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';

function Home() {
  const theme = createTheme();
  return (
    <>
      <Box sx={{ marginTop: theme.spacing(2) }}>
        <Products />
      </Box>
    </>
  );
}

export default Home;
