import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cart';
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Box, textAlign } from '@mui/system';
import { createTheme } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';

function CartScreen() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [search] = useSearchParams();
  const qty = Number(search.get('qty'));
  const cart = useSelector((state) => state.cartReducer);
  const cartItems = cart.cartItems;
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeCardHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const theme = createTheme();
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} md={8} mt={7}>
          <List>
            <ListItem>
              <Box>
                <Link to='/' style={{ textDecoration: 'none' }}>
                  Browse products
                </Link>
              </Box>
            </ListItem>
            <ListItem>
              <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                Your cart
              </Typography>
            </ListItem>
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item, idx) => (
                <>
                  <ListItem
                    key={uuidv4()}
                    width='100%'
                    sx={{ marginY: '20px' }}
                  >
                    <Box
                      component='div'
                      width='100%'
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        [theme.breakpoints.down('md')]: {
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                      }}
                    >
                      <Box
                        component='img'
                        sx={{
                          width: '250px',
                          height: '250px',
                          backgroundColor: 'white',
                        }}
                        src='https://demo.saleor.io/_next/image?url=https%3A%2F%2Fdemo.saleor.io%2Fmedia%2Fproducts%2Fsaleordemoproduct_cuschion01.png&w=1920&q=75'
                      />
                      <Box
                        sx={{
                          flexGrow: '.75',
                          [theme.breakpoints.down('md')]: {
                            marginTop: '10px',
                            marginBottom: '10px',
                          },
                        }}
                      >
                        <Typography
                          gutterBottom
                          sx={{
                            fontWeight: 'bold',
                            [theme.breakpoints.down('md')]: {
                              textAlign: 'center',
                            },
                          }}
                          variant='h6'
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            [theme.breakpoints.down('md')]: {
                              textAlign: 'center',
                            },
                          }}
                        >
                          Category: {item.category}
                        </Typography>
                        <Button
                          variant='text'
                          sx={{
                            paddingLeft: 0,
                            color: '#ef5350',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            marginTop: theme.spacing(2),
                            textTransform: 'none',
                            '&:hover': { backgroundColor: 'transparent' },
                            [theme.breakpoints.down('md')]: {
                              width: '100%',
                            },
                          }}
                          disableRipple
                          endIcon={<ClearIcon />}
                          onClick={() => removeCardHandler(item.product)}
                        >
                          Remove
                        </Button>
                      </Box>
                      <Box>
                        <Box>
                          <FormControl sx={{ width: '100%' }}>
                            <InputLabel id='quantity'>Quantity</InputLabel>
                            <Select
                              labelId='quantity'
                              value={item.qty}
                              label='Quantity'
                              fullWidth
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value)
                                  )
                                )
                              }
                            >
                              {[...Array(item.countInStock).keys()].map(
                                (x, idx) => (
                                  <MenuItem value={x + 1} key={uuidv4()}>
                                    {x + 1}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            fontSize: '20px',
                            lineHeight: '40px',
                          }}
                        >
                          Price:{' '}
                          <span style={{ color: '#4caf50' }}>
                            {Math.ceil(item.price * item.qty)}$
                          </span>
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                  {idx < cartItems.length - 1 && (
                    <Divider variant='middle' key={uuidv4()} />
                  )}
                </>
              ))}
          </List>
        </Grid>
        <Grid item xs={12} md={4} mt={10}>
          <Paper elevation={0} sx={{ backgroundColor: 'rgb(249,250,251)' }}>
            <List>
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography
                  gutterBottom
                  sx={{ fontSize: '20px', color: '#4B5563' }}
                >
                  Subtotal
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: 'bold', fontSize: '20px' }}
                >
                  {cartItems.reduce((acc, item) => (acc = item.qty), 0)} items
                </Typography>
              </ListItem>
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography
                  gutterBottom
                  sx={{ fontSize: '20px', color: '#4B5563' }}
                >
                  Shipping
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: 'bold', fontSize: '20px' }}
                >
                  50$
                </Typography>
              </ListItem>
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography
                  gutterBottom
                  sx={{ fontSize: '20px', color: '#4B5563' }}
                >
                  Tax
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: 'bold', fontSize: '20px' }}
                >
                  10$
                </Typography>
              </ListItem>
              <Divider />
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>
                  Total
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>
                  150$
                </Typography>
              </ListItem>
            </List>
          </Paper>
          <Button
            fullWidth
            size='large'
            elevation={0}
            disabled={cartItems.length === 0}
            variant='contained'
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              marginTop: theme.spacing(5),
              pading: theme.spacing(2),
              fontSize: '20px',
            }}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default CartScreen;
