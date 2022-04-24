import { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetails, updateOrderToPaid } from '../../actions/order';
import { createTheme } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/system';
import {
  CircularProgress,
  Grid,
  Paper,
  List,
  ListItem,
  Divider,
  Typography,
  Alert,
  Avatar,
  AlertTitle,
} from '@mui/material';

function OrderScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  const { order, loading, error } = useSelector(
    (state) => state.orderDetailsReducer
  );

  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPayReducer
  );

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.appendChild(script);
    };

    if (!order || successPay) {
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(updateOrderToPaid(id, paymentResult));
  };

  const theme = createTheme();

  if (loading)
    return (
      <CircularProgress
        sx={{
          marginLeft: '45%',
          marginTop: theme.spacing(3),
        }}
      />
    );
  if (error)
    return (
      <Alert severity='error' sx={{ marginTop: theme.spacing(3) }}>
        {error}
      </Alert>
    );
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} lg={8}>
          <Paper
            sx={{ marginTop: theme.spacing(3), padding: '10px' }}
            elevation={0}
          >
            <Typography variant='h5' sx={{ color: 'gray' }}>
              ORDER: #{order._id}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
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
                    <span style={{ fontWeight: 600 }}>Name</span>:
                    {order.user.name}
                  </Typography>
                  <Typography variant='body1'>
                    <span style={{ fontWeight: 600 }}>Email</span>:
                    {order.user.email}
                  </Typography>
                  <Typography variant='body1'>
                    <span style={{ fontWeight: 600 }}>Address</span>:
                    {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city} ,
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </Typography>
                  <Box component='div' sx={{ width: '100%' }}>
                    {order.isDelievered ? (
                      <>
                        <Alert severity='info'>
                          <AlertTitle>Delivered Order</AlertTitle>
                          This message to just let you know that your order —{' '}
                          <strong>is delivered on {order.delieveredAt}</strong>
                        </Alert>
                      </>
                    ) : (
                      <>
                        <Alert severity='warning'>
                          <AlertTitle>Not Delivered Order</AlertTitle>
                          This message to just let you know that your order is —{' '}
                          <strong>not delivered!</strong>
                        </Alert>
                      </>
                    )}
                  </Box>
                </ListItem>
                <Divider key={uuidv4()} />
                <ListItem key={uuidv4()}>
                  <Typography variant='h4'>Payment Method</Typography>
                  <Typography variant='body1'>
                    <span style={{ fontWeight: 600 }}>Method</span>:{' '}
                    {order.paymentMethod}
                  </Typography>
                  <Box component='div' sx={{ width: '100%' }}>
                    {order.isPaid ? (
                      <>
                        <Alert severity='info'>
                          <AlertTitle>Paid Order</AlertTitle>
                          This message to just let you know that your order —{' '}
                          <strong>is paid on {order.paidAt}</strong>
                        </Alert>
                      </>
                    ) : (
                      <>
                        <Alert severity='warning'>
                          <AlertTitle>Not Paid Order</AlertTitle>
                          This message to just let you know that your order is —{' '}
                          <strong>not paid!</strong>
                        </Alert>
                      </>
                    )}
                  </Box>
                </ListItem>
                <Divider key={uuidv4()} />
                <ListItem key={uuidv4()}>
                  <Typography variant='h4'>Order Items</Typography>
                  {order.orderItems.length === 0 ? (
                    <Alert severity='warning'>Your order is empty</Alert>
                  ) : (
                    <List>
                      {order.orderItems.map((item, idx) => (
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
                          {idx < order.orderItems.length - 1 ? (
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
                  $
                  {Math.ceil(
                    order.orderItems.reduce(
                      (acc, item) => acc + item.price * item.qty,
                      0
                    )
                  )}
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
                  ${order.shippingPrice}
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
                  ${order.taxPrice}
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
                  ${order.totalPrice}
                </Typography>
              </ListItem>
              <Divider />

              {!order.isPaid && (
                <>
                  {loadingPay && (
                    <ListItem>
                      <CircularProgress sx={{ marginLeft: '45%' }} />
                    </ListItem>
                  )}
                  {sdkReady ? (
                    <ListItem>
                      <CircularProgress sx={{ marginLeft: '45%' }} />
                    </ListItem>
                  ) : (
                    <ListItem>
                      <Box sx={{ width: '400px' }}>
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                          style={{
                            color: 'blue',
                            shape: 'pill',
                            layout: 'vertical',
                          }}
                        />
                      </Box>
                    </ListItem>
                  )}
                </>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default OrderScreen;
