import { useEffect } from 'react';
import {
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
  Chip,
  Alert,
} from '@mui/material';
import { Box, createTheme } from '@mui/system';
import { getAllOrders } from '../../actions/order';
import { listProducts } from '../../actions/product';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

function AdminHomeScreen() {
  const dispatch = useDispatch();
  const theme = createTheme();

  const user = useSelector((state) => state.userLoginReducer);
  const { email } = user.userInfo;
  const orderList = useSelector((state) => state.orderListReducer);
  const {
    loading: loadingOrderList,
    error: errorOrderList,
    orders,
  } = orderList;

  const productList = useSelector((state) => state.productListReducer);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  let sortedOrders = [];
  let totalSales = 0;
  let totalPaidOrders = 0;
  let deliveredOrders = 0;
  let paidOrdersNotDelivered = 0;
  if (orders && orders.length > 0) {
    sortedOrders = orders
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const paidOrders = orders.filter((order) => order.isPaid === true);
    totalPaidOrders = paidOrders.length;
    totalSales = paidOrders.reduce((acc, order) => acc + order.totalPrice, 0);
    const deliverd = orders.filter((order) => order.isDelievered === true);
    deliveredOrders = deliverd.length;
    const paidNotDelivered = orders.filter(
      (order) => order.isPaid === true && order.isDelievered === false
    );
    paidOrdersNotDelivered = paidNotDelivered.length;
  }

  let outOfStockProducts = 0;
  let almostOutOfStock = 0;
  if (products && products.length > 0) {
    const outofStock = products.filter((product) => product.countInStock === 0);
    outOfStockProducts = outofStock.length;
    const almostOut = products.filter((product) => product.countInStock > 5);
    almostOutOfStock = almostOut.length;
  }

  useEffect(() => {
    dispatch(getAllOrders());

    dispatch(listProducts());
  }, [dispatch]);

  if (loadingProducts) return;
  if (loadingOrderList) return;
  if (errorProducts) return <Alert security='error'>{errorProducts}</Alert>;
  if (errorOrderList) return <Alert security='error'>{errorOrderList}</Alert>;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant='h3'
        sx={{
          fontWeight: 'bold',
          fontSize: { md: '40px', xs: '25px' },
        }}
      >
        Hello there, {email}
      </Typography>
      <Typography
        variant='p'
        sx={{ color: '#414a4c', fontSize: '20px', marginTop: '20px' }}
      >
        Here is some informarion we gathered about your store
      </Typography>
      <Divider sx={{ width: '50%', marginTop: theme.spacing(2) }} />
      <Grid container spacing={3} sx={{ marginTop: theme.spacing(2) }}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ padding: theme.spacing(3) }}>
                <Grid container spacing={3}>
                  <Grid item xs={7}>
                    <Typography variant='h5'>Sales</Typography>
                    <Typography
                      variant='h6'
                      sx={{ color: 'gray', fontSize: '15px' }}
                    >
                      Total sales
                    </Typography>
                    <Typography
                      variant='h3'
                      pt={2}
                      sx={{
                        paddingLeft: { md: 5, xs: 0 },
                        fontSize: { md: '30px', xs: '25px' },
                      }}
                    >
                      {totalSales}$
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <TrendingUpOutlinedIcon
                      color='info'
                      sx={{
                        fontSize: '80px',
                        marginTop: theme.spacing(2),
                        background: '#EFF5F8',
                        padding: theme.spacing(1),
                        borderRadius: '10px',
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ padding: theme.spacing(3) }}>
                <Grid container spacing={3}>
                  <Grid item xs={7}>
                    <Typography variant='h5'>Orders</Typography>
                    <Typography
                      variant='h6'
                      sx={{ color: 'gray', fontSize: '15px' }}
                    >
                      Total orders
                    </Typography>
                    <Typography
                      variant='h3'
                      pt={2}
                      sx={{
                        paddingLeft: { md: 5, xs: 0 },
                        fontSize: { md: '30px', xs: '25px' },
                      }}
                    >
                      {orders.length}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <QueryStatsIcon
                      color='info'
                      sx={{
                        fontSize: '80px',
                        marginTop: theme.spacing(2),
                        background: '#EFF5F8',
                        padding: theme.spacing(1),
                        borderRadius: '10px',
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* ORDER STATS */}
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ padding: theme.spacing(3) }}>
                <Typography variant='h5'>Orders info</Typography>
                <List>
                  <ListItem key={uuidv4()}>
                    <Typography
                      variant='p'
                      sx={{ fontSize: '20px', paddingY: theme.spacing(1) }}
                    >
                      <span style={{ fontWeight: 'bold' }}>
                        {totalPaidOrders} &nbsp;
                      </span>
                      orders are paid
                    </Typography>
                  </ListItem>
                  <Divider key={uuidv4()} />
                  <ListItem key={uuidv4()}>
                    <Typography
                      variant='p'
                      sx={{ fontSize: '20px', paddingY: theme.spacing(1) }}
                    >
                      <span style={{ fontWeight: 'bold' }}>
                        {deliveredOrders} &nbsp;
                      </span>
                      orders are delivered
                    </Typography>
                  </ListItem>
                  <Divider key={uuidv4()} />
                  <ListItem key={uuidv4()}>
                    <Typography
                      variant='p'
                      sx={{ fontSize: '20px', paddingY: theme.spacing(1) }}
                    >
                      <span style={{ fontWeight: 'bold' }}>
                        {paidOrdersNotDelivered} &nbsp;
                      </span>
                      orders are paid but not delivered
                    </Typography>
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* PRODUCT STATS */}
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ padding: theme.spacing(3) }}>
                <Typography variant='h5'>Products info</Typography>
                <List>
                  <ListItem key={uuidv4()}>
                    <Typography
                      variant='p'
                      sx={{ fontSize: '20px', paddingY: theme.spacing(1) }}
                    >
                      <span style={{ fontWeight: 'bold' }}>
                        {products.length} &nbsp;
                      </span>
                      Products in store
                    </Typography>
                  </ListItem>
                  <Divider key={uuidv4()} />
                  <ListItem key={uuidv4()}>
                    <Typography
                      variant='p'
                      sx={{ fontSize: '20px', paddingY: theme.spacing(1) }}
                    >
                      <span style={{ fontWeight: 'bold' }}>
                        {outOfStockProducts} &nbsp;
                      </span>
                      Products are out of stock
                    </Typography>
                  </ListItem>
                  <Divider key={uuidv4()} />
                  <ListItem key={uuidv4()}>
                    <Typography
                      variant='p'
                      sx={{ fontSize: '20px', paddingY: theme.spacing(1) }}
                    >
                      <span style={{ fontWeight: 'bold' }}>
                        {almostOutOfStock} &nbsp;
                      </span>
                      products that have less than 5 in stock
                    </Typography>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ padding: theme.spacing(3) }}>
            <List>
              <Box sx={{ marginBottom: theme.spacing(2) }}>
                <Typography variant='h5'>Activity</Typography>
              </Box>
              {sortedOrders?.map((order, idx) => (
                <>
                  <ListItem key={uuidv4()}>
                    <Box
                      component='div'
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                      }}
                    >
                      <Typography variant='p' p={1} sx={{ fontSize: '20px' }}>
                        Order &nbsp; #{order._id.substring(0, 5)}... &nbsp;
                        {order.isPaid === true ? (
                          <span style={{ color: '#2e7d32' }}>
                            is fully paid
                          </span>
                        ) : (
                          <span style={{ color: '#1976d2' }}>was placed</span>
                        )}
                      </Typography>
                      <Typography variant='p'>
                        {order.isPaid === true ? (
                          <Chip
                            color='success'
                            label={order.paidAt.substring(0, 10)}
                          />
                        ) : (
                          <Chip
                            color='info'
                            label={order.createdAt.substring(0, 10)}
                          />
                        )}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider sx={{ width: '70%' }} />
                </>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      {/* <Grid container>
        <Grid item xs={12} md={8}>
          <Paper>asdasd</Paper>
        </Grid>
        <Grid item xs={12} md={0}></Grid>
      </Grid> */}
    </Box>
  );
}

export default AdminHomeScreen;
