import { useEffect } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippinhAddress } from '../../actions/cart';
import { useNavigate } from 'react-router-dom';
import ChekoutStepper from '../checkout/CheckoutSteps';

function ShippingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartReducer);
  const { shippingAddress } = cart;
  const { cartItems } = useSelector((state) => state.cartReducer);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: shippingAddress?.address || '',
      city: shippingAddress?.city || '',
      postalCode: shippingAddress?.postalCode || '',
      country: shippingAddress?.country || '',
    },
    validationSchema: Yup.object({
      address: Yup.string()
        .min(4, 'cannot be less than 4 characters')
        .required('Address Required'),
      city: Yup.string().required('City Required'),
      postalCode: Yup.number().required('Postal code required'),
      country: Yup.string().required('Country is required'),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(false);
      dispatch(saveShippinhAddress(values));
      resetForm();
      navigate('/payment');
    },
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const theme = createTheme();
  return (
    <>
      <Paper sx={{ marginTop: theme.spacing(3), padding: theme.spacing(3) }}>
        <ChekoutStepper step={1} />
      </Paper>
      <Paper
        sx={{ marginTop: theme.spacing(3), padding: theme.spacing(3) }}
        elevation={0}
      >
        <Box
          component='form'
          sx={{ '& .MuiTextField-root': { m: 1 } }}
          onSubmit={formik.handleSubmit}
        >
          <Typography
            variant='h4'
            sx={{
              fontWeight: 'bold',
              marginY: theme.spacing(3),
              letterSpacing: theme.spacing(0.5),
            }}
          >
            Shipping
          </Typography>
          <TextField
            error={
              formik.touched.address && formik.errors.address ? true : false
            }
            helperText={
              formik.touched.address && formik.errors.address
                ? formik.errors.address
                : null
            }
            label='Address'
            name='address'
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            autoFocus
            autoComplete='off'
          />
          <TextField
            error={formik.touched.city && formik.errors.city ? true : false}
            helperText={
              formik.touched.city && formik.errors.city
                ? formik.errors.city
                : null
            }
            label='City'
            name='city'
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            autoComplete='off'
          />
          <TextField
            error={
              formik.touched.postalCode && formik.errors.postalCode
                ? true
                : false
            }
            helperText={
              formik.touched.postalCode && formik.errors.postalCode
                ? formik.errors.postalCode
                : null
            }
            label='Postal code'
            name='postalCode'
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            autoComplete='off'
          />
          <TextField
            error={
              formik.touched.country && formik.errors.country ? true : false
            }
            helperText={
              formik.touched.country && formik.errors.country
                ? formik.errors.country
                : null
            }
            label='Country'
            name='country'
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            autoComplete='off'
          />
          <Button type='submit' variant='contained'>
            Continue
          </Button>
        </Box>
      </Paper>
    </>
  );
}

export default ShippingScreen;
