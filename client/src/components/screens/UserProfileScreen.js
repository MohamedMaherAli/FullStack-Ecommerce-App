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
import { createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserDetails } from '../../actions/user';
import { useNavigate } from 'react-router-dom';

function UserProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return setOpen(false);
    }

    setOpen(false);
  };

  const userLogin = useSelector((state) => state.userLoginReducer.userInfo);

  const userDetails = useSelector((state) => state.userDetailsReducer);
  const { user, loading, error } = userDetails;

  const userUpdateProfile = useSelector(
    (state) => state.userUpdateProfileReducer
  );
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (userLogin) {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      }
    } else {
      navigate('/user/signin');
    }
  }, [userLogin, dispatch, navigate, user]);

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

  const theme = createTheme();
  return (
    <>
      <Grid container spacing={3} sx={{ marginTop: theme.spacing(3) }}>
        <Grid item xs={12} xl={4}>
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
        <Grid item xs={12} xl={8}>
          ORDERS
        </Grid>
      </Grid>
    </>
  );
}

export default UserProfileScreen;
