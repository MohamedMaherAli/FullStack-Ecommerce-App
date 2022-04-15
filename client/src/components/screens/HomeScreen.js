import React, { useEffect, useState } from 'react';
import Products from '../products/Products';
import { Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';

function Home() {
  const theme = createTheme();

  // Todo fecth products inside useEffect/ course section 3 video 3
  // useEffect(() => {
  //   dispatch(getProducts())
  // }, [])

  return (
    <>
      <Box sx={{ marginTop: theme.spacing(2) }}>
        <Products />
      </Box>
    </>
  );
}

export default Home;
