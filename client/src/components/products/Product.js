import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip, Grid, Rating } from '@mui/material';
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
            image={product.image}
            alt={product.name}
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
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ fontWeight: 'bold', fontSize: '17px' }}
            >
              {product.price}$
              {product.onSale === true ? (
                <Chip
                  label='SALE'
                  sx={{
                    marginLeft: '70%',
                    background: 'red',
                    color: 'white',
                    padding: '0',
                  }}
                />
              ) : null}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

//Rating compontn should take Numreviews, overAll rating of the product "like how many stars"
