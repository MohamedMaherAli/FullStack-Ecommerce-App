import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Alert, Paper } from '@mui/material';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { updateUserById, getUserById } from '../../actions/user';
import { Box } from '@mui/system';
import { Snackbar } from '@mui/material';

const theme = createTheme();

export default function AdminUserEditScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userData = useSelector((state) => state.userGetReducer);
  const { loading, error, user } = userData;

  const updatedUserData = useSelector((state) => state.userUpdateReducer);
  const {
    loading: updateLoading,
    error: updateError,
    success,
  } = updatedUserData;

  //handle close snackbar on success
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleIsAdminChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserById(id, { name, email, isAdmin }));
  };

  useEffect(() => {
    if (user.id !== id || !user.name) {
      dispatch(getUserById(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, id, user]);

  useEffect(() => {
    if (success) {
      setOpen(true);
      setTimeout(() => setOpen(false), 2500);
    }
  }, [success]);

  if (loading) return;
  if (error) return <Alert severity='error'>{error}</Alert>;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='md'>
          <CssBaseline />
          <Paper elevation={0} sx={{ padding: theme.spacing(4) }}>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <UpgradeIcon fontSize='large' />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Update User
              </Typography>
              <Box
                component='form'
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='name'
                  label='Name'
                  name='name'
                  value={name}
                  onChange={handleNameChange}
                  autoComplete='new-name'
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete='new-email'
                />
                <FormControlLabel
                  sx={{ fontWeight: 'bold', color: 'red', fontSize: '20px' }}
                  control={
                    <Checkbox
                      value='isAdmin'
                      color='primary'
                      onChange={handleIsAdminChange}
                      sx={{ fontWeight: 'bold', fontSize: '40px' }}
                    />
                  }
                  label='Mark this user as Admin ?'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update User
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
        {success ? (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity='success'
              sx={{ width: '100%' }}
            >
              User updated successfully
            </Alert>
          </Snackbar>
        ) : null}
      </ThemeProvider>
    </>
  );
}
