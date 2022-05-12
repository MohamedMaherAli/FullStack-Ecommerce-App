import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/system';
import { Snackbar, Alert } from '@mui/material';
import { createNewProduct } from '../../actions/product';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_CREATE_RESET } from '../../actions/actionTypes';

const Input = styled('input')({
  display: 'none',
});

function AdminCreateProductScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const theme = createTheme();

  const [onSale, setOnSale] = useState(false);

  const handleOnSaleChange = () => {
    setOnSale(!onSale);
  };

  const createProductStats = useSelector((state) => state.productCreateReducer);
  const { success, error } = createProductStats;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (success || error) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        dispatch({ type: PRODUCT_CREATE_RESET });
      }, 2500);
    }
  }, [success, error, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      brand: '',
      description: '',
      mainCategory: '',
      category: '',
      countInStock: '',
      image: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'name must be at least 3 characters')
        .required('Name is required'),
      price: Yup.number()
        .min(1, 'price cannot be less than 1')
        .required('Price is required'),
      brand: Yup.string().required('Brand is required'),
      description: Yup.string().required('Description is required'),
      mainCategory: Yup.string().required('Please select a main category'),
      category: Yup.string().required('Please provide a category name'),
      countInStock: Yup.number()
        .min(1, 'Cant be less than 1')
        .required('Count in stock is required'),
      image: Yup.string().required('image is required'),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(false);
      dispatch(createNewProduct({ ...values, onSale }));
      resetForm();
    },
  });

  const handleInputChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      formik.setFieldValue('image', reader.result);
    };
  };

  return (
    <>
      <Box sx={{ marginBottom: theme.spacing(4) }}>
        <Button
          variant='oulined'
          color='primary'
          startIcon={<ArrowBackIcon />}
          size='large'
          sx={{
            fontSize: '20px',
            textTransform: 'none',
            background: '#F6F9FB',
            color: 'gray',
            marginBottom: theme.spacing(7),
          }}
          onClick={() => navigate('/admin/dashboard/products')}
        >
          Products
        </Button>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { md: '45px', xs: '20px' },
            marginBottom: theme.spacing(2),
          }}
        >
          New Product
        </Typography>
        <Paper elevation={0} sx={{ padding: theme.spacing(3) }}>
          <Box
            component='form'
            sx={{ '& .MuiTextField-root': { marginBottom: theme.spacing(2) } }}
            onSubmit={formik.handleSubmit}
          >
            <Typography
              variant='body1'
              sx={{
                fontWeight: 'bold',
                marginBottom: theme.spacing(3),
                fontSize: { md: '20px', xs: '15px' },
              }}
            >
              Product information
            </Typography>
            <TextField
              label='Name'
              name='name'
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name ? true : false}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : null
              }
            />
            <TextField
              multiline
              rows='4'
              label='Description'
              name='description'
              value={formik.values.description}
              onChange={formik.handleChange}
              fullWidth
              error={
                formik.touched.description && formik.errors.description
                  ? true
                  : false
              }
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : null
              }
            />
            <TextField
              label='Price'
              name='price'
              fullWidth
              variant='filled'
              type='number'
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && formik.errors.price ? true : false}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.price && formik.errors.price
                  ? formik.errors.price
                  : null
              }
            />
            <TextField
              label='Brand'
              name='brand'
              fullWidth
              value={formik.values.brand}
              onChange={formik.handleChange}
              error={formik.touched.brand && formik.errors.brand ? true : false}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.brand && formik.errors.brand
                  ? formik.errors.brand
                  : null
              }
            />
            <FormControl fullWidth>
              <InputLabel>Main Category</InputLabel>
              <Select
                fullWidth
                label='Main Category'
                name='mainCategory'
                sx={{ marginBottom: theme.spacing(2) }}
                value={formik.values.mainCategory}
                onChange={formik.handleChange}
                error={
                  formik.touched.mainCategory && formik.errors.mainCategory
                    ? true
                    : false
                }
                onBlur={formik.handleBlur}
              >
                <MenuItem value='accessories'>Accessories</MenuItem>
                <MenuItem value='groceries'>Groceries</MenuItem>
                <MenuItem value='clothing'>Clothing</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label='Sub category'
              name='category'
              fullWidth
              value={formik.values.category}
              onChange={formik.handleChange}
              error={
                formik.touched.category && formik.errors.category ? true : false
              }
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.category && formik.errors.category
                  ? formik.errors.category
                  : null
              }
            />
            <TextField
              label='Count in stock'
              name='countInStock'
              fullWidth
              variant='filled'
              type='number'
              value={formik.values.countInStock}
              onChange={formik.handleChange}
              error={
                formik.touched.countInStock && formik.errors.countInStock
                  ? true
                  : false
              }
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.countInStock && formik.errors.countInStock
                  ? formik.errors.countInStock
                  : null
              }
            />
            <Box sx={{ marginBottom: theme.spacing(2) }}>
              <Typography sx={{ fontWeight: 'bold' }}>
                Set product on sale{' '}
                <Switch
                  onChange={handleOnSaleChange}
                  name='onSale'
                  checked={onSale}
                />
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Stack>
                <label
                  htmlFor='contained-button-file'
                  style={{ width: '200px' }}
                >
                  <Input
                    type='file'
                    id='contained-button-file'
                    accept='image/png, image/jpeg'
                    name='image'
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                  />
                  <Button
                    disableElevation
                    color='secondary'
                    variant='contained'
                    component='span'
                    endIcon={<CameraAltOutlinedIcon />}
                    size='large'
                    sx={{
                      textTransform: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    Choose image
                  </Button>
                  {formik.values.image !== '' ? (
                    <>
                      <Avatar
                        alt={formik.values.name}
                        src={formik.values.image}
                        sx={{
                          padding: '2px',
                          [theme.breakpoints.down('md')]: {
                            display: 'none',
                          },
                        }}
                      />
                    </>
                  ) : null}
                  {formik.errors.image ? (
                    <FormHelperText sx={{ color: 'red' }}>
                      {formik.errors.image}
                    </FormHelperText>
                  ) : null}
                </label>
              </Stack>
              <Button
                disableElevation
                type='submit'
                endIcon={<SendIcon />}
                variant='contained'
                size='large'
                sx={{ textTransform: 'none', fontWeight: 'bold' }}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Paper>
        {error ? (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity='warning'
              sx={{ width: '100%' }}
            >
              {error}
            </Alert>
          </Snackbar>
        ) : (
          <></>
        )}
        {success && (
          <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity='info'
                sx={{ width: '100%' }}
              >
                Product created successfully
              </Alert>
            </Snackbar>
          </>
        )}
      </Box>
    </>
  );
}

export default AdminCreateProductScreen;
