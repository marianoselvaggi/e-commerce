import NextLink from 'next/link';

import { Typography, Grid, Link, CardActionArea, CardMedia, Button } from '@mui/material';
import { Box } from '@mui/system';

import { initialData } from '../../database';
import { ItemCounter } from '../ui';
import { FC } from 'react';

const cartProducts = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[1],
]

interface Props {
  editable: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
        {
            cartProducts.map(product => (
                <Grid spacing={2} container key={product.slug} sx={{mb:2}}>
                  <Grid item xs={3}>
                    <NextLink passHref href='/product/slug'>
                      <Link>
                        <CardActionArea>
                          <CardMedia 
                            image={`/products/${product.images[0]}`}
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
                        editable ? <ItemCounter /> : <Typography variant='h6'>3 items</Typography>
                      }
                      
                    </Box>
                  </Grid>
                  <Grid xs={2} item display={'flex'} alignItems='center' flexDirection={'column'}>
                      <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                      {
                        editable && (
                          <Button color='secondary' className='circular-btn'>remove</Button>    
                        )
                      }
                  </Grid>
                </Grid>
            ))        
        }
    </>
  )
}
