import NextLink from 'next/link';
import { CartContext } from '../../context/cart/';

import { Typography, Grid, Link, CardActionArea, CardMedia, Button } from '@mui/material';
import { Box } from '@mui/system';

import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { ICartProduct } from '../../interfaces/cart';

interface Props {
  editable: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateProductInCart, deleteProductInCart } = useContext(CartContext);

  const updateProductValue = (product: ICartProduct, newValue: number) => {
    product.quantity = newValue;
    updateProductInCart(product);
  }

  return (
    <>
        {
            cart.map(product => (
                <Grid spacing={2} container key={product.slug + product.size} sx={{mb:2}}>
                  <Grid item xs={3}>
                    <NextLink passHref href={`/product/${product.slug}`}>
                      <Link>
                        <CardActionArea>
                          <CardMedia 
                            image={`/products/${product.image}`}
                            component='img'
                            sx={{ borderRadius: '5px' }}
                          />
                        </CardActionArea>
                      </Link>
                    </NextLink>
                  </Grid>
                  <Grid item xs={7}>
                    <Box display={'flex'} flexDirection='column'>
                      <Typography variant='body1'>{ product.title }</Typography>
                      <Typography variant='body1'>Size <strong>M</strong></Typography>

                      {
                        editable 
                        ? (
                          <ItemCounter maxValue={10} currentValue={product.quantity} onValueUpdated={(value: number) => updateProductValue(product,value)} /> 
                        )
                        : <Typography variant='h6'>{ product.quantity } product{product.quantity > 1 ? 's' : ''}</Typography>
                      }
                      
                    </Box>
                  </Grid>
                  <Grid xs={2} item display={'flex'} alignItems='center' flexDirection={'column'}>
                      <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                      {
                        editable && (
                          <Button color='secondary' className='circular-btn' onClick={() => deleteProductInCart(product)}>remove</Button>    
                        )
                      }
                  </Grid>
                </Grid>
            ))        
        }
    </>
  )
}
