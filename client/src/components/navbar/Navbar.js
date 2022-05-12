import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Badge } from '@mui/material';
import { createTheme } from '@mui/system';
import logo from '../../logo/emerchant.svg';
import logoMobile from '../../logo/emerchant.svg';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { logout } from '../../actions/user';
import { Link } from '@mui/material';

const pages = ['Accessories', 'Groceries', 'Clothing'];

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const adminUrls = location.pathname.startsWith('/admin/');

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigationToSignInPage = () => navigate('/user/signin');

  const settings = [
    {
      name: 'Profile',
      handle: () => {
        navigate('/user/profile');
      },
    },
    {
      name: 'Logout',
      handle: () => {
        dispatch(logout(navigate));
      },
    },
  ];

  const theme = createTheme();

  const adminColor = adminUrls ? '#EFF5F8' : '#F9FAFB';

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const user = useSelector((state) => state.userLoginReducer.userInfo);
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const NumberItemsInCart = cartItems.reduce((acc, curr) => acc + curr.qty, 0);

  const navBarSideIconStyles = {
    fontSize: '30px',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
    },
  };
  return adminUrls ? null : (
    <>
      <Box
        sx={{
          wdith: '100%',
          height: '70px',
          width: '100%',
          backgroundColor: adminColor,
          display: 'flex',
          borderBottom: '3px dashed #E4E6EA',
          [theme.breakpoints.down('md')]: {
            height: '60px',
          },
        }}
      >
        <Container maxWidth='xl'>
          <Grid container>
            <Grid item xs={2} sm={4} md={9}></Grid>
            <Grid item xs={10} sm={8} md={3} sx={{ margin: 'auto' }}>
              {adminUrls ? (
                ''
              ) : (
                <Typography
                  sx={{
                    margin: 'auto',
                    color: 'black',
                    paddingTop: '15px',
                    fontWeight: 'bold',
                    fontSize: {
                      md: '20px',
                      sx: '10px',
                    },
                  }}
                >
                  Explore:{' '}
                  {adminUrls ? (
                    <>
                      <Link href='/'> eMerchant Store</Link>
                    </>
                  ) : (
                    <>
                      <Link href='/admin/dashboard'>
                        {' '}
                        eMerchant admin dashboard
                      </Link>
                    </>
                  )}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
      {!adminUrls ? (
        <>
          <AppBar
            position='static'
            sx={{ backgroundColor: 'white' }}
            elevation={0}
          >
            <Container maxWidth='xl'>
              <Toolbar disableGutters sx={{ color: 'black' }}>
                <IconButton disableRipple onClick={() => navigate('/')}>
                  <Box
                    component='img'
                    src={logo}
                    sx={{
                      objectFit: 'cover',
                      height: '25px',
                      maxwidth: '120px',
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                    }}
                  />
                </IconButton>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size='large'
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={handleOpenNavMenu}
                    color='inherit'
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id='menu-appbar'
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {/* ssssssssssssssssssssssss */}
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Button
                          textAlign='center'
                          sx={{ color: 'black', textTransform: 'none' }}
                          onClick={() =>
                            navigate(`/category/${page.toLowerCase()}`)
                          }
                        >
                          {page}
                        </Button>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

                <IconButton
                  disableRipple
                  onClick={() => navigate('/')}
                  sx={{ marginRight: { md: '0px', xs: '20%' } }}
                >
                  <Box
                    component='img'
                    src={logoMobile}
                    sx={{
                      maxHeight: '40px',
                      maxWidth: '90px',
                      display: { xs: 'flex', md: 'none' },
                      marginRight: '30%',
                    }}
                  />
                </IconButton>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      disableRipple
                      onClick={() => {
                        navigate(`/category/${page.toLowerCase()}`);
                        handleCloseNavMenu();
                      }}
                      sx={{
                        my: 2,
                        color: 'black',
                        display: 'block',
                        textTransform: 'none',
                        fontSize: '15px',
                      }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>

                <Box
                  sx={{
                    flexGrow: 0,
                    display: 'flex',
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '100px',
                  }}
                >
                  <Box>
                    <Tooltip title={user ? 'Open Profile' : 'sign in'}>
                      <IconButton
                        onClick={
                          user
                            ? handleOpenUserMenu
                            : handleNavigationToSignInPage
                        }
                        sx={{ p: 0 }}
                        disableRipple
                      >
                        <AccountCircleOutlinedIcon sx={navBarSideIconStyles} />{' '}
                        {user ? (
                          <Typography
                            fontSize='medium'
                            sx={{ display: { md: 'inline', xs: 'none' } }}
                          >
                            {user.name}
                          </Typography>
                        ) : null}
                        {!user ? (
                          <Typography
                            fontSize='medium'
                            sx={{ display: { md: 'inline', xs: 'none' } }}
                          >
                            Log in
                          </Typography>
                        ) : null}
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box>
                    <Tooltip title='Open Cart'>
                      <IconButton
                        onClick={() => navigate('/cart')}
                        disableRipple
                      >
                        <StyledBadge
                          fontSize='medium'
                          badgeContent={NumberItemsInCart || 0}
                          color='primary'
                        >
                          <ShoppingCartIcon sx={navBarSideIconStyles} />
                        </StyledBadge>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box>
                    <Tooltip title='Search Products'>
                      <IconButton
                        disableRipple
                        onClick={() => navigate('/search')}
                      >
                        <SearchOutlinedIcon sx={navBarSideIconStyles} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id='menu-appbar'
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem
                          key={uuidv4()}
                          onClick={() => {
                            handleCloseUserMenu();
                            setting.handle();
                          }}
                        >
                          <Typography textAlign='center'>
                            {setting.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </>
      ) : null}
    </>
  );
};
export default NavBar;
