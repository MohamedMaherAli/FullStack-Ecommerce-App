import { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import {
  Grid,
  Box,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Snackbar,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserDetails } from '../../actions/user';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserOrders } from '../../actions/order';

import { StyledDataGrid } from './UserProfileScreenStyles';

function UserProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = createTheme();
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return setOpen(false);
    }

    setOpen(false);
  };

  const userLogin = useSelector((state) => state.userLoginReducer.userInfo);
  const order = useSelector((state) => state.myOrderListReducer);
  const { loading: loadingOrder, error: errorOrder, orderList } = order;

  const userDetails = useSelector((state) => state.userDetailsReducer);
  const { user, loading, error } = userDetails;

  const userUpdateProfile = useSelector(
    (state) => state.userUpdateProfileReducer
  );
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (userLogin) {
      dispatch(getLoggedInUserOrders());
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      }
    } else {
      navigate('/user/signin');
    }
  }, [userLogin, dispatch, navigate, user]);

  const columns = [
    { field: '_id', headerName: 'ID', width: 220, sortable: false },
    {
      field: 'createdAt',
      headerName: 'DATE',
      width: 130,
      renderCell: (params) => {
        return params.row.createdAt.substring(0, 10);
      },
    },
    {
      field: 'totalPrice',
      headerName: 'TOTAL',
      width: 90,
      renderCell: (params) => {
        return `$ ${params.row.totalPrice}`;
      },
    },
    {
      field: 'paidAt',
      headerName: 'PAID',
      width: 130,
      renderCell: (params) => {
        return params.row.paidAt ? (
          params.row.paidAt.substring(0, 10)
        ) : (
          <Box component='span' color='warning'>
            Not Paid
          </Box>
        );
      },
    },
    {
      field: 'isDelievered',
      headerName: 'DELIVERED',
      description: 'delievered.',
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return params.row.isDelievered ? (
          <CheckIcon />
        ) : (
          <CloseIcon sx={{ color: 'red' }} />
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: '150',
      renderCell: (params) => {
        return (
          <Button
            variant='contained'
            color='info'
            onClick={() => navigate(`/order/${params.row._id}`)}
          >
            Details
          </Button>
        );
      },
    },
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      email: Yup.string().lowercase().email(),
      password: Yup.string(),
      passwordConfirm: Yup.string().oneOf(
        [Yup.ref('password')],
        'Passwrod must match'
      ),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(false);
      dispatch(updateUserDetails(values));
      resetForm();
    },
  });

  return (
    <>
      <Grid container spacing={3} sx={{ marginTop: theme.spacing(3) }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '20px' }}>
            {error ? <Alert severity='error'>{error}</Alert> : null}
            {loading ? <CircularProgress /> : null}
            <Box component='form' onSubmit={formik.handleSubmit}>
              <Typography variant='h5' sx={{ marginY: theme.spacing(2) }}>
                User Profile
              </Typography>
              <TextField
                error={formik.touched.name && formik.errors.name ? true : false}
                margin='normal'
                fullWidth
                id='name'
                label='Name'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                autoComplete='new-email'
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : null
                }
              />
              <TextField
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                margin='normal'
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                autoComplete='new-email'
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null
                }
              />
              <TextField
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                margin='normal'
                fullWidth
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null
                }
              />
              <TextField
                error={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                    ? true
                    : false
                }
                margin='normal'
                fullWidth
                name='passwordConfirm'
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                label='Confirm Password'
                type='password'
                id='passwordConfirm'
                autoComplete='new-password'
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                    ? formik.errors.passwordConfirm
                    : null
                }
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='info'
                sx={{ marginTop: theme.spacing(1) }}
              >
                update
              </Button>
              {success ? (
                <>
                  <Snackbar open={open} autoHideDuration={6000}>
                    <Alert
                      onClose={handleClose}
                      severity='success'
                      sx={{ width: '100%' }}
                    >
                      User profile updated successfully
                    </Alert>
                  </Snackbar>
                </>
              ) : null}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          {loadingOrder ? (
            <CircularProgress /> ? (
              errorOrder
            ) : (
              <Alert severity='error'>{errorOrder}</Alert>
            )
          ) : (
            <>
              <Paper sx={{ padding: theme.spacing(1) }} elevation={0}>
                <Typography variant='h5' textAlign='center'>
                  User Orders
                </Typography>
              </Paper>
              <Paper
                style={{
                  height: 400,
                  width: '100%',
                  marginTop: theme.spacing(2),
                }}
                elevation={0}
              >
                {orderList.length > 0 ? (
                  <StyledDataGrid
                    rows={orderList}
                    getRowId={(row) => row._id}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableColumnSelector
                    disableColumnFilter
                  />
                ) : (
                  <Alert severity='info'>You Have no orders</Alert>
                )}
              </Paper>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default UserProfileScreen;
