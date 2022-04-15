import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Rating,
  List,
  ListItem,
  Button,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';

function ProductScreen() {
  const theme = createTheme();
  const [value, setValue] = React.useState(2);
  const inStock = false;

  // TODO WHEN WE FINISH DATABASE AND ADD PRODUCT PAGE
  // const[product, setProduct] = useState('')
  // useEffect(() => {
  //   const comingProduct =  dispatch(getProductById(_Id))
  //   setProduct(comingProduct);
  // })

  return (
    <>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} xl={8}>
          <Box
            component='img'
            alt='pillow'
            src='https://demo.saleor.io/_next/image?url=https%3A%2F%2Fdemo.saleor.io%2Fmedia%2Fproducts%2Fsaleordemoproduct_cuschion01.png&w=1920&q=75'
            sx={{
              objectFit: 'contain',
              width: '100%',
              maxHeight: { xs: 360, md: 1000 },
              maxWidth: { xs: 360, md: 1000 },
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }}
          ></Box>
        </Grid>
        <Grid item xs={12} xl={4} sx={{ marginTop: theme.spacing(4) }}>
          <List>
            <ListItem>
              <Typography
                variant='h1'
                sx={{
                  fontSize: '2.25rem',
                  lineHeight: ' 2.5rem',
                  fontWeight: '700',
                }}
              >
                Colored Parrot Cushion
              </Typography>
            </ListItem>
            <ListItem>
              <Typography
                variant='h2'
                sx={{
                  fontWeight: '700',
                  lineHeight: '1.75rem',
                  fontSize: '1.25rem',
                }}
              >
                Price: $3.50
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                this item is made out of silk, unique and perfect for sleep, if
                you wanna have a perfect night sleep, dont hesitate and get this
                pillow addiction
              </Typography>
            </ListItem>
            <ListItem>
              <Typography
                variant='h4'
                sx={{
                  fontWeight: '500',
                  fontSize: '1.125rem',
                  lineHeight: '1.75rem',
                }}
              >
                Category
              </Typography>
            </ListItem>
            <ListItem>
              {/* Add some logic here to say in stock or out of stock */}
              <Typography variant='h6' sx={{ fontWeight: '700' }}>
                {inStock ? 'In Stock' : 'Out of Stock'}
              </Typography>
            </ListItem>
            <ListItem>
              <Rating
                name='simple-controlled'
                value={value}
                sx={{ marginLeft: '-4px' }}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </ListItem>
            <ListItem>
              <Button
                variant='contained'
                fullWidth
                size='large'
                sx={{ fontWeight: 'bold' }}
                disabled={!inStock}
              >
                ADD TO CART
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}

export default ProductScreen;
