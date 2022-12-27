import { FC, useState, useMemo } from 'react';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Chip } from '@mui/material';
import { IProduct } from '../../interfaces';
import NextLink from 'next/link';

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHovered 
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`
  }, [isHovered, product.images]);

  return (
    <Grid 
      item xs={6} 
      sm={4}
      onMouseLeave={ () => setIsHovered(false) }
      onMouseEnter={ () => setIsHovered(true) }
    >
      <NextLink href={`/product/${product.slug}`} passHref>
        <Link>
          <Card>
            <CardActionArea>
                {
                  product.inStock === 0 && (
                  <Chip 
                    color='secondary'
                    label='Out of stock'
                    sx={{ position: 'absolute', zIndex: 99, marginTop: 2, marginLeft: 2 }}
                  />)
                }
                <CardMedia 
                    component='img'
                    className='fadeInd'
                    image={productImage}
                    alt={product.title}
                    onLoad={() => setIsLoaded(true)}
                />
            </CardActionArea>
          </Card>
        </Link>
      </NextLink>

        <Box sx={{ mt: 1, display: isLoaded ? 'block' : 'none' }} className='fadeIn'>
          <Typography fontWeight={700}>{ product.title }</Typography>
          <Typography fontWeight={500}>${ product.price }</Typography>
        </Box>
    </Grid>
  )
}
