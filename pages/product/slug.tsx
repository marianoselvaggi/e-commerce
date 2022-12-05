import { Grid, Box, Typography, Button, Chip } from '@mui/material';
import { useRouter } from 'next/router';
import { ShopLayout } from '../../components/layouts/';
import { ProductSelectorSize, ProductSlideshow } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { useProducts } from '../../hooks/useProducts';

const SlugPage = () => {

  const router = useRouter();
  const slug = router.query['slug'] || '';

  const { products } = useProducts(`/products?slug=${slug}`);
  const product = products[0];
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
        <Grid container spacing={2}>
            <Grid item xs={ 12 } sm={ 7 }>
                <ProductSlideshow images={product.images} />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Box display='flex' flexDirection='column'>
                    <Typography variant='h1' component={'h1'}>{product.title}</Typography>
                    <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>
                
                    <Box sx={{ my: 3 }}>
                        <Typography variant='subtitle2'>Quantity</Typography>
                        <ItemCounter />
                        <ProductSelectorSize 
                            // selectedSize={'XS'}
                            sizes={product.sizes} 
                        />
                    </Box>

                    <Button color='secondary' className='circular-btn'>
                        Add to the cart
                    </Button>

                    {/* <Chip label='The product is not available' color='error' variant='outlined' /> */}

                    <Box sx={{ mt: 3 }}>
                        <Typography variant='subtitle2'>Description</Typography>
                        <Typography variant='body2'>{product.description}</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SlugPage;
