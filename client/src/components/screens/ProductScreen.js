import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Rating,
  List,
  ListItem,
  Button,
  CircularProgress,
  Alert,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { productDetails } from '../../actions/product';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProductScreen() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(2);
  const [qty, setQty] = useState(1);

  const { product, loading, error } = useSelector(
    (state) => state.productDetailsReducer
  );

  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const theme = createTheme();
  return (
    <>
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
        <Grid container columnSpacing={3}>
          <Grid item xs={12} xl={8}>
            <Box
              component='img'
              alt='pillow'
              src='https://demo.saleor.io/_next/image?url=https%3A%2F%2Fdemo.saleor.io%2Fmedia%2Fproducts%2Fsaleordemoproduct_cuschion01.png&w=1920&q=75'
              sx={{
                objectFit: 'contain',
                width: '100%',
                maxHeight: { xs: 360, md: 1000 },
                maxWidth: { xs: 360, md: 1000 },
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
              }}
            ></Box>
          </Grid>
          <Grid item xs={12} xl={4} sx={{ marginTop: theme.spacing(4) }}>
            <List>
              <ListItem>
                <Typography
                  variant='h1'
                  sx={{
                    fontSize: '2.25rem',
                    lineHeight: ' 2.5rem',
                    fontWeight: '700',
                  }}
                >
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='h2'
                  sx={{
                    fontWeight: '700',
                    lineHeight: '1.75rem',
                    fontSize: '1.25rem',
                  }}
                >
                  Price: {product.price}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                  {product.description}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: '500',
                    fontSize: '1.125rem',
                    lineHeight: '1.75rem',
                  }}
                >
                  {product.category}
                </Typography>
              </ListItem>
              <ListItem>
                {/* Add some logic here to say in stock or out of stock */}
                <Typography variant='h6' sx={{ fontWeight: '700' }}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </Typography>
              </ListItem>
              <ListItem>
                <Rating
                  name='simple-controlled'
                  value={value}
                  sx={{ marginLeft: '-4px' }}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </ListItem>
              {product.countInStock > 0 && (
                <ListItem>
                  <FormControl fullWidth>
                    <InputLabel id='quantity'>Quantity</InputLabel>
                    <Select
                      labelId='quantity'
                      label='Quantity'
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <MenuItem value={x + 1} key={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ListItem>
              )}
              <ListItem>
                <Button
                  variant='contained'
                  fullWidth
                  size='large'
                  sx={{ fontWeight: 'bold' }}
                  disabled={product.countInStock <= 0}
                  onClick={addToCartHandler}
                >
                  ADD TO CART
                </Button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default ProductScreen;
