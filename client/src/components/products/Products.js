import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  CircularProgress,
  Alert,
  Typography,
  IconButton,
} from '@mui/material';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { categoryProductList } from '../../actions/product';
import { createTheme } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

function Products() {
  const dispatch = useDispatch();
  const theme = createTheme();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productCategoryListReducer);
  const { products, loading, error } = productList;
  let accessories = [];
  let groceries = [];
  let clothing = [];

  if (products) {
    accessories = products
      .filter((product) => product.mainCategory === 'accessories')
      .slice(0, 4);

    groceries = products
      .filter((product) => product.mainCategory === 'groceries')
      .slice(0, 4);

    clothing = products
      .filter((product) => product.mainCategory === 'clothing')
      .slice(0, 4);
  }

  useEffect(() => {
    dispatch(categoryProductList('all'));
  }, [dispatch]);
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
          <Grid container alignItems='stretch'>
            <Grid item xs={12} sx={{ marginTop: theme.spacing(6) }}>
              <Typography
                sx={{
                  fontSize: '35px',
                  fontWeight: '900',
                  paddingY: theme.spacing(2),
                }}
              >
                Accessories
              </Typography>
              <Grid container spacing={3}>
                {accessories.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </Grid>
              <IconButton
                disableRipple
                color='info'
                sx={{ fontSize: '17px', marginY: theme.spacing(1) }}
                onClick={() => navigate(`/category/accessories`)}
              >
                More &nbsp; <ArrowForwardIcon sx={{ fontSize: '15px' }} />
              </IconButton>
            </Grid>

            <Grid item xs={12} sx={{ marginTop: theme.spacing(6) }}>
              <Typography
                sx={{
                  fontSize: '35px',
                  fontWeight: '900',
                  paddingY: theme.spacing(2),
                }}
              >
                Groceries
              </Typography>
              <Grid container spacing={3}>
                {groceries.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </Grid>
              <IconButton
                disableRipple
                color='info'
                sx={{ fontSize: '17px', marginY: theme.spacing(1) }}
                onClick={() => navigate(`/category/groceries`)}
              >
                More &nbsp; <ArrowForwardIcon sx={{ fontSize: '15px' }} />
              </IconButton>
            </Grid>

            <Grid item xs={12} sx={{ marginTop: theme.spacing(6) }}>
              <Typography
                sx={{
                  fontSize: '35px',
                  fontWeight: '900',
                  paddingY: theme.spacing(2),
                }}
              >
                Clothing
              </Typography>
              <Grid container spacing={3}>
                {clothing.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </Grid>
              <IconButton
                disableRipple
                color='info'
                sx={{ fontSize: '17px', marginY: theme.spacing(1) }}
                onClick={() => navigate(`/category/clothing`)}
              >
                More &nbsp; <ArrowForwardIcon sx={{ fontSize: '15px' }} />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

export default Products;
