import React from 'react';
import { Container, Grid } from '@mui/material';
import Product from './Product';
function Products() {
  return (
    <>
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </Grid>
      </Container>
    </>
  );
}

export default Products;
