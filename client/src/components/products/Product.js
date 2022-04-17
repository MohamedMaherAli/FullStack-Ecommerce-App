import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

//name/ category/ price

export default function Product({ product }) {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} lg={4} xl={3}>
      <Card
        sx={{
          maxWidth: 345,
          padding: '7px',
          height: '100%',
        }}
      >
        <CardActionArea onClick={() => navigate(`/product/${product._id}`)}>
          <CardMedia
            component='img'
            height='240'
            image='https://demo.saleor.io/_next/image?url=https%3A%2F%2Fdemo.saleor.io%2Fmedia%2Fproducts%2Fsaleordemoproduct_cuschion01.png&w=1920&q=75'
            alt='green iguana'
            sx={{
              objectFit: 'contain',
              width: '100%',
              height: '15rem',
              backgroundColor: '#fafafa',
            }}
          />
          <CardContent>
            <Typography gutterBottom variant='h6' component='div'>
              {product.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {product.category}
            </Typography>
            <Rating
              readOnly
              value={product.rating}
              sx={{ marginLeft: '-4px' }}
            />
            <Typography variant='body2' color='text.secondary'>
              {product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

//Rating compontn should take Numreviews, overAll rating of the product "like how many stars"
