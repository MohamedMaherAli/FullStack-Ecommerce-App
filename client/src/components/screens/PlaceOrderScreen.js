import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  List,
  ListItem,
  Divider,
  Typography,
  Alert,
  Avatar,
  Button,
  CircularProgress,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import ChekoutStepper from '../checkout/CheckoutSteps';
import { Box } from '@mui/system';
import { createOrder } from '../../actions/order';

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cartReducer
  );

  //Calc Prices
  const itemPrices = Math.ceil(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = itemPrices > 100 ? 0 : 20;
  const taxPrice = 0.15 * itemPrices;
  const total = itemPrices + shippingPrice + taxPrice;

  const orderState = useSelector((state) => state.orderCreateReducer);
  const { error, loading, success, order } = orderState;

  //dispatching an action
  const handleSubmitOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice: total,
      })
    );
  };

  useEffect(() => {
    if (!cartItems || !shippingAddress || !paymentMethod) {
      navigate('/payment');
    }
    if (success === true) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, cartItems, shippingAddress, paymentMethod, success, order]);

  const theme = createTheme();
  return (
    <>
      <Paper sx={{ marginTop: theme.spacing(3), padding: theme.spacing(3) }}>
        <ChekoutStepper step={3} />
      </Paper>
      <Grid container spacing={5}>
        <Grid item xs={12} lg={8}>
          <Paper
            sx={{ marginTop: theme.spacing(3), padding: '20px' }}
            elevation={0}
          >
            <Box
              sx={{
                '& .MuiTypography-h4': {
                  md: {
                    fontWeight: 'Bold',
                    letterSpacing: theme.spacing(0.5),
                    marginY: theme.spacing(1),
                  },
                  xs: {
                    fontSize: '25px',
                    fontWeight: 'Bold',
                    marginBottom: theme.spacing(2),
                  },
                },
                '& .MuiTypography-body1': {
                  color: 'grey',
                  marginBottom: theme.spacing(1),
                },
                '& .MuiListItem-root': {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '100%',
                },
                '& .MuiList-root': {
                  width: '100%',
                },
              }}
            >
              <List>
                <ListItem key={uuidv4()}>
                  <Typography variant='h4'>Shipping</Typography>
                  <Typography variant='body1'>
                    <span style={{ fontWeight: 600 }}>Address</span>:
                    {shippingAddress.address}, {shippingAddress.city} ,
                    {shippingAddress.postalCode}, {shippingAddress.country}
                  </Typography>
                </ListItem>
                <Divider key={uuidv4()} />
                <ListItem key={uuidv4()}>
                  <Typography variant='h4'>Payment Method</Typography>
                  <Typography variant='body1'>
                    <span style={{ fontWeight: 600 }}>Method</span>:{' '}
                    {paymentMethod}
                  </Typography>
                </ListItem>
                <Divider key={uuidv4()} />
                <ListItem key={uuidv4()}>
                  <Typography variant='h4'>Order Items</Typography>
                  {cartItems.length === 0 ? (
                    <Alert severity='warning'>Your cart is empty</Alert>
                  ) : (
                    <List>
                      {cartItems.map((item, idx) => (
                        <>
                          <ListItem key={uuidv4()}>
                            <Grid container alignItems='center'>
                              <Grid
                                item
                                xs={12}
                                md={1}
                                sx={{ margixY: { xs: '10px', md: '0' } }}
                              >
                                <Avatar alt={item.name} src='' />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography variant='body1'>
                                  <Link
                                    to={`/product/${item.product}`}
                                    style={{ textDecoration: 'none' }}
                                  >
                                    {item.name}
                                  </Link>
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <Typography variant='body2'>
                                  {item.qty} x {Math.ceil(item.price)} = $
                                  {Math.ceil(item.qty * item.price)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItem>
                          {idx < cartItems.length - 1 ? (
                            <Divider key={uuidv4()} />
                          ) : null}
                        </>
                      ))}
                    </List>
                  )}
                </ListItem>
              </List>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper
            sx={{ marginTop: theme.spacing(3), padding: '20px' }}
            elevation={0}
          >
            <List>
              <ListItem key={uuidv4()}>
                <Typography
                  variant='h4'
                  textAlign='center'
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { md: '30px', xs: '20px' },
                    marginBottom: theme.spacing(2),
                    letterSpacing: { md: theme.spacing(0.25) },
                  }}
                >
                  Order Summary
                </Typography>
              </ListItem>
              <Divider />
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                key={uuidv4()}
              >
                <Typography variant='body2' sx={{ fontSize: '17px' }}>
                  Items price
                </Typography>
                <Typography variant='body2' fontWeight='bold'>
                  ${itemPrices}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                key={uuidv4()}
              >
                <Typography variant='body2' sx={{ fontSize: '17px' }}>
                  Shipping
                </Typography>
                <Typography variant='body2' fontWeight='bold'>
                  ${shippingPrice}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                key={uuidv4()}
              >
                <Typography variant='body2' sx={{ fontSize: '17px' }}>
                  Tax
                </Typography>
                <Typography variant='body2' fontWeight='bold'>
                  ${taxPrice}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                key={uuidv4()}
              >
                <Typography variant='body2' sx={{ fontSize: '17px' }}>
                  Total
                </Typography>
                <Typography variant='body2' fontWeight='bold'>
                  ${total}
                </Typography>
              </ListItem>
              <Divider />
              {error ? (
                <ListItem key={uuidv4()}>
                  <Alert severity='error' key={uuidv4()}>
                    {error}
                  </Alert>
                </ListItem>
              ) : null}
              {loading ? (
                <ListItem>
                  <CircularProgress sx={{ marginX: 'auto' }} />
                </ListItem>
              ) : null}
              <ListItem key={uuidv4()}>
                <Button
                  key={uuidv4()}
                  disabled={cartItems.length === 0}
                  variant='contained'
                  sx={{
                    padding: theme.spacing(2),
                    marginTop: theme.spacing(2),
                    fontWeight: 'bold',
                  }}
                  size='large'
                  fullWidth
                  onClick={handleSubmitOrder}
                >
                  Place Order
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default PlaceOrderScreen;
