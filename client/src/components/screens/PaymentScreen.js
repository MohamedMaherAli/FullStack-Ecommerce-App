import { useState, useEffect } from 'react';
import { Button, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChekoutStepper from '../checkout/CheckoutSteps';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Typography } from '@mui/material';
import { savePaymentMethod } from '../../actions/cart';

function PaymentScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cartReducer);

  const [paymentMethod, setPaymentMethod] = useState('payPal');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const theme = createTheme();
  return (
    <>
      <Paper sx={{ marginTop: theme.spacing(3), padding: theme.spacing(3) }}>
        <ChekoutStepper step={2} />
      </Paper>
      <Paper
        sx={{ marginTop: theme.spacing(3), padding: theme.spacing(3) }}
        elevation={0}
      >
        <Typography
          variant='h4'
          sx={{
            fontWeight: 'bold',
            marginY: theme.spacing(3),
            letterSpacing: theme.spacing(0.5),
          }}
        >
          Payment Method
        </Typography>
        <Box component='form' onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel id='radio-buttons-group-label'>Select Method</FormLabel>

            <RadioGroup
              aria-labelledby='radio-buttons-group-label'
              defaultValue='payPal'
              name='radio-buttons-group'
            >
              <FormControlLabel
                onChange={(e) => setPaymentMethod(e.target.value)}
                value='payPal'
                control={<Radio />}
                label='PayPal or Credit Card'
              />
              <FormControlLabel
                onChange={(e) => setPaymentMethod(e.target.value)}
                value='stripe'
                control={<Radio />}
                label='Stripe (coming soon)'
                disabled
              />
              <FormControlLabel
                value='other'
                control={<Radio />}
                label='Other (coming soon)'
                disabled
              />
            </RadioGroup>
            <Button type='submit' variant='contained'>
              Continue
            </Button>
          </FormControl>
        </Box>
      </Paper>
    </>
  );
}

export default PaymentScreen;
