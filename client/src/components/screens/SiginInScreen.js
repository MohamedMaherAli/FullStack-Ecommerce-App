import { useFormik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Alert, CircularProgress } from '@mui/material';
// import Link from "@mui/material/Link";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { signIn } from '../../actions/user';
import { useEffect } from 'react';

//Just for early testing
const userEmails = ['1@gmail.com', '2@gmail.com', '3@gmail.com'];

const theme = createTheme();
export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, userInfo } = useSelector(
    (state) => state.userLoginReducer
  );
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .notOneOf(userEmails, 'Email already Registered')
        .lowercase()
        .email()
        .required('Email Required'),
      password: Yup.string().required('Password Required'),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(false);
      dispatch(signIn(values, navigate, location));
      resetForm();
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {error ? <Alert severity='error'>{error}</Alert> : null}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <VpnKeyIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          {loading ? <CircularProgress /> : null}
          <Box
            component='form'
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={formik.touched.email && formik.errors.email ? true : false}
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              autoComplete='new-email'
              autoFocus
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
            />
            <TextField
              error={
                formik.touched.password && formik.errors.password ? true : false
              }
              margin='normal'
              required
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
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              disabled={formik.isSubmitting || !formik.isValid}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to='/user/signup'>Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
