import React, { useEffect } from 'react';
import { Container, Grid, CircularProgress, Alert } from '@mui/material';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/product';

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productListReducer);
  const { products, loading, error } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return (
    <>
      <Container maxWidth='xl'>
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              paddingTop: '10%',
            }}
          >
            <CircularProgress thickness={3} size='10rem' />
          </div>
        ) : error ? (
          <Alert severity='error'>{error}</Alert>
        ) : (
          <Grid container alignItems='stretch' spacing={3}>
            {products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default Products;
