import { useEffect } from 'react';
import {
  Alert,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import { categoryProductList } from '../../actions/product';
import Product from '../products/Product';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/system';

function CategoryScreen(props) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = searchParams.get('page') || 1;

  const theme = createTheme();
  const category = props.category;
  const productListState = useSelector(
    (state) => state.productCategoryListReducer
  );
  const { error, loading, products, pages, page } = productListState;
  let categoryProducts = [];

  if (products) {
    categoryProducts = products.filter(
      (product) => product.mainCategory === category
    );
  }

  const handleChange = (event, value) => {
    setSearchParams({ page: value });
  };

  useEffect(() => {
    dispatch(categoryProductList(category, pageNumber));
  }, [dispatch, category, pageNumber]);

  if (loading) return <CircularProgress sx={{ marginLeft: '45%' }} />;
  if (error) return <Alert severity='error'>{error}</Alert>;
  return (
    <>
      <Typography
        sx={{
          fontSize: '35px',
          fontWeight: '900',
          paddingY: theme.spacing(4),
        }}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Typography>
      <Grid container spacing={3}>
        {categoryProducts.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: theme.spacing(5),
        }}
      >
        <Pagination
          count={pages}
          onChange={handleChange}
          page={page ? page : 1}
          color='secondary'
          variant='outlined'
          shape='rounded'
        />
      </Box>
    </>
  );
}

export default CategoryScreen;
