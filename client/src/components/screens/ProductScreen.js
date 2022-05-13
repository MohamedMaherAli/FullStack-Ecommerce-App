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
  Paper,
  Chip,
  TextField,
  Divider,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { productDetails, updateProductReview } from '../../actions/product';
import { PRODUCT_UPDATE_REVIEW_RESET } from '../../actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function ProductScreen() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');
  const [qty, setQty] = useState(1);

  const { product, loading, error } = useSelector(
    (state) => state.productDetailsReducer
  );

  const productReviewState = useSelector(
    (state) => state.productUpdateReviewReducer
  );

  const userLoggedIn = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoggedIn;
  const {
    loading: loadingUpdateReview,
    success: successProductReview,
    error: errorProductReview,
  } = productReviewState;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductReview(id, { rating: value, comment }));
  };

  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch]);

  useEffect(() => {
    if (successProductReview) {
      setValue(0);
      setComment('');
      dispatch({ type: PRODUCT_UPDATE_REVIEW_RESET });
    }
    dispatch(productDetails(id));
  }, [dispatch, successProductReview]);

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
          <Grid item xs={12} md={8}>
            <Box
              component='img'
              alt='pillow'
              src={product.image}
              sx={{
                objectFit: 'contain',
                width: '100%',
                maxHeight: { xs: 360, md: 600 },
                maxWidth: { xs: 360, md: 600 },
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ marginTop: theme.spacing(4) }}>
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
                  readOnly
                  value={product.rating}
                  sx={{ marginLeft: '-4px' }}
                />
                <Typography>({product.numReviews} reviews)</Typography>
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
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                marginTop: theme.spacing(3),
                padding: theme.spacing(2),
              }}
            >
              <Typography
                variant='h2'
                sx={{
                  fontSize: { md: '30px', xs: '20px' },
                  fontWeight: 'bold',
                  letterSpacing: '4px',
                  marginBottom: theme.spacing(3),
                }}
              >
                Reviews
              </Typography>
              {product.reviews.length === 0 ? (
                <>
                  <Alert severity='info'>No reviews for this product</Alert>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      padding: theme.spacing(2),
                      borderRadius: '10px',
                      backgroundColor: '#F3F4F6',
                    }}
                  >
                    {product.reviews.map((review, idx) => (
                      <>
                        <Box key={uuidv4()}>
                          <Typography>{review.name}</Typography>
                          <Rating
                            readOnly
                            value={review.rating}
                            sx={{ marginLeft: '-4px' }}
                          />
                          <Typography>{review.comment}</Typography>
                          <Chip
                            label={review.createdAt.substring(0, 10)}
                            color='info'
                            sx={{ marginTop: '5px', padding: '2px' }}
                          />
                        </Box>
                        {idx < product.reviews.length - 1 ? (
                          <Divider
                            key={uuidv4()}
                            sx={{ marginY: theme.spacing(1) }}
                          />
                        ) : null}
                      </>
                    ))}
                  </Box>
                </>
              )}
              {userInfo ? (
                <Paper
                  elevation={3}
                  sx={{
                    padding: theme.spacing(3),
                    marginTop: theme.spacing(3),
                    backgroundColor: '#F3F4F6',
                  }}
                >
                  <Box
                    component='form'
                    sx={{ marginTop: theme.spacing(2) }}
                    onSubmit={handleSubmit}
                  >
                    <Typography
                      variant='h3'
                      sx={{
                        fontSize: { md: '25px', xs: '15px' },
                        fontWeight: 'bold',
                        letterSpacing: '2px',
                        marginBottom: theme.spacing(3),
                      }}
                    >
                      Submit a Review
                    </Typography>
                    {loadingUpdateReview ? (
                      <CircularProgress
                        sx={{ marginLeft: '45%', display: 'block' }}
                      />
                    ) : null}
                    {errorProductReview ? (
                      <Alert
                        severity='error'
                        sx={{ marginY: theme.spacing(1) }}
                      >
                        {errorProductReview}
                      </Alert>
                    ) : null}
                    {successProductReview ? (
                      <Alert
                        severity='success'
                        sx={{ marginY: theme.spacing(1) }}
                      >
                        Review submitted
                      </Alert>
                    ) : null}
                    <Rating
                      name='simple-controlled'
                      value={value}
                      sx={{ marginLeft: '-4px' }}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                    <TextField
                      onChange={(e) => setComment(e.target.value)}
                      label='Comment'
                      fullWidth
                      sx={{ display: 'block' }}
                    />
                    <Button
                      variant='contained'
                      disableElevation
                      type='submit'
                      disabled={loadingUpdateReview}
                      sx={{
                        marginTop: theme.spacing(2),
                        textTransform: 'none',
                        fontWeight: 'bold',
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Paper>
              ) : (
                <>
                  <Alert severity='info'>
                    Please log in to submit a review
                  </Alert>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default ProductScreen;
