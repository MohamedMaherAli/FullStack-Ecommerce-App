import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { createTheme } from '@mui/system';
import logo from '../../logo/emerchant.svg';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Link } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';

const drawerWidth = 260;

function DashboardScreen(props) {
  const navigate = useNavigate();
  const theme = createTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  //gathering loading values to render it in only this component
  const userListState = useSelector((state) => state.userListReducer);
  const deleteUser = useSelector((state) => state.userListReducer);
  const getUser = useSelector((state) => state.userGetReducer);
  const updateUser = useSelector((state) => state.userUpdateReducer);
  const productList = useSelector((state) => state.productListReducer);
  const productDelete = useSelector((state) => state.productDeleteReducer);
  const productCreate = useSelector((state) => state.productCreateReducer);
  const productDetails = useSelector((state) => state.productDetailsReducer);
  const ordersList = useSelector((state) => state.orderListReducer);

  const { loading: loadingDeleteUser } = deleteUser;
  const { loading: loadingUserList } = userListState;
  const { loading: loadingGetUser } = getUser;
  const { loading: loadingUpdateUser } = updateUser;
  const { loading: loadingProductList } = productList;
  const { loading: loadingProductDelete } = productDelete;
  const { loading: loadingProductCreate } = productCreate;
  const { loading: loadingProductDetails } = productDetails;
  const { loading: loadingOrdersList } = ordersList;
  const loading =
    loadingOrdersList ||
    loadingProductDetails ||
    loadingProductCreate ||
    loadingProductDelete ||
    loadingUserList ||
    loadingDeleteUser ||
    loadingGetUser ||
    loadingUpdateUser ||
    loadingProductList;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <div>
        <List
          sx={{
            '& .MuiListItem-root': {
              marginY: theme.spacing(5),
              height: '100%',
            },
            '& .MuiIconButton-root': {
              '&:hover': {
                color: '#42a5f5',
              },
            },
            '& .MuiTypography-root': {
              fontWeight: 'bold',
              fontSize: {
                lg: '20px',
                xs: '17px',
              },
            },
          }}
        >
          <ListItem
            sx={{
              marginY: theme.spacing(2),
              marginLeft: theme.spacing(2),
            }}
          >
            <Box
              component='img'
              src={logo}
              sx={{ maxWidth: '50%', maxHeight: '100%' }}
            />
          </ListItem>
          <ListItem>
            <IconButton
              disableRipple
              onClick={() => {
                navigate('/admin/dashboard/');
                if (mobileOpen) {
                  handleDrawerToggle();
                }
              }}
            >
              <HomeOutlinedIcon sx={{ fontSize: { md: 35, sx: 30 } }} />
              <Typography variant='h5' sx={{ marginLeft: theme.spacing(1) }}>
                Home
              </Typography>
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton
              disableRipple
              onClick={() => {
                navigate('/admin/dashboard/orders');
                if (mobileOpen) {
                  handleDrawerToggle();
                }
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: { md: 35, sx: 30 } }} />
              <Typography variant='h5' sx={{ marginLeft: theme.spacing(1) }}>
                Orders
              </Typography>
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton
              disableRipple
              onClick={() => {
                navigate('/admin/dashboard/users');
                if (mobileOpen) {
                  handleDrawerToggle();
                }
              }}
            >
              <PersonOutlinedIcon sx={{ fontSize: { md: 35, sx: 30 } }} />
              <Typography variant='h5' sx={{ marginLeft: theme.spacing(1) }}>
                Users
              </Typography>
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton
              disableRipple
              onClick={() => {
                navigate('/admin/dashboard/products');
                if (mobileOpen) {
                  handleDrawerToggle();
                }
              }}
            >
              <Inventory2OutlinedIcon sx={{ fontSize: { md: 35, sx: 30 } }} />
              <Typography variant='h5' sx={{ marginLeft: theme.spacing(1) }}>
                Products
              </Typography>
            </IconButton>
          </ListItem>
        </List>
      </div>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position='absolute'
        sx={{
          left: 0,
          right: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'transparent',
          borderBottom: '3px dashed #E4E6EA',
          height: '70px',
          [theme.breakpoints.down('md')]: {
            height: '60px',
          },
        }}
      >
        <Grid container>
          <Grid item xs={2} md={9}>
            {''}
          </Grid>
          <Grid item xs={10} md={3}>
            <Typography
              sx={{
                color: 'black',
                paddingTop: '15px',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              Explore: <Link href='/'> eMerchant Store</Link>
            </Typography>
          </Grid>
        </Grid>
        <Toolbar>
          <IconButton
            color='primary'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              mt: 2,
              display: { sm: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderTopRightRadius: '50px',
              borderBottomRightRadius: '50px',
              background: '#EFF5F8',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 285,
              background: '#EFF5F8',
              overflowX: 'hidden',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginX: theme.spacing(2),
        }}
      >
        {loading && <LinearProgress />}
        <Box sx={{ marginTop: theme.spacing(15) }}>{props.component}</Box>
      </Box>
    </Box>
  );
}

export default DashboardScreen;
