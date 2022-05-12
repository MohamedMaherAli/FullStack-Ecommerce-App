import {
  Alert,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Box, createTheme } from '@mui/system';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { listProducts } from '../../actions/product';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../products/Product';

function SearchScreen() {
  const dispatch = useDispatch();
  const theme = createTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('name') || '';

  const handleSearch = (event) => {
    const name = event.target.value;
    if (name) {
      setSearchParams({ name });
    } else {
      setSearchParams({});
    }
  };

  const productState = useSelector((state) => state.productListReducer);
  const { loading, products, error } = productState;

  console.log(products);

  useEffect(() => {
    dispatch(listProducts(searchTerm));
  }, [dispatch, searchTerm]);

  return (
    <>
      <Typography
        variant='h1'
        sx={{
          fontSize: { md: '30px', xs: '20px' },
          marginTop: theme.spacing(3),
          letterSpacing: '2px',
        }}
      >
        Search
      </Typography>

      <TextField
        label='What are you looking for ?'
        sx={{ width: { lg: '50%', xs: '100%' }, marginY: theme.spacing(2) }}
        value={searchTerm}
        onChange={handleSearch}
      />
      <Box sx={{ marginTop: theme.spacing(3) }}>
        {loading ? <CircularProgress sx={{ marginLeft: '45%' }} /> : null}
        {error ? <Alert severity='warning'>{error}</Alert> : null}
        {searchTerm === '' ? null : (
          <>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
}

export default SearchScreen;
