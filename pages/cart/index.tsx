import { ShopLayout } from '../../components/layouts/ShopLayout';
import { Card, CardContent, Divider, Grid, Typography, Box, Button } from '@mui/material';

import { CartList } from '../../components/cart/CartList';
import { OrderSummary } from '../../components/cart/OrderSummary';

const CartPage = () => {
  return (
    <ShopLayout title={'My cart'} pageDescription={'Cart with products'}>
        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList editable/>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Card className='summary-card'>
                <CardContent>
                  <Typography variant='h2'>Order</Typography>
                  <Divider />
                  <OrderSummary />

                  <Box>
                    <Button color='secondary' className='circular-btn' fullWidth sx={{
                      my: 2
                    }}>Checkout</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
        </Grid>
        
    </ShopLayout>
  )
}

export default CartPage;
