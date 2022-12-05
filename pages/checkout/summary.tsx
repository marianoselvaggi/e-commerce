import NextLink from 'next/link';
import { Link, Card, CardContent, Divider, Grid, Typography, Box, Button } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList } from '../../components/cart/CartList';
import { OrderSummary } from '../../components/cart/OrderSummary';

const SummaryPage = () => {
  return (
    <ShopLayout title={'Order summart'} pageDescription={'Summary'}>
        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList editable={false} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Card className='summary-card'>
                <CardContent>
                  <Typography variant='h2'>Order</Typography>
                  
                  <Divider sx={{ mb: 1 }} />

                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Address delivery</Typography>
                        <NextLink href='/checkout/address' passHref>
                            <Link underline='always' sx={{ justifyContent: 'end' }}>
                                Edit Address
                            </Link>
                        </NextLink>
                    </Box>

                    
                    <Typography>Mariano Selvaggi</Typography>
                    <Typography>Valle 151</Typography>
                    <Typography>Caballito, CABA</Typography>
                    <Typography>Argentina</Typography>
                    <Typography>+5491128123131</Typography>

                    <Divider sx={{ mt: 1}} />

                    <Box sx={{ textAlign: 'right' }}>
                        <NextLink href='/cart' passHref>
                            <Link underline='always'>
                                Edit cart
                            </Link>
                        </NextLink>
                    </Box>

                  <OrderSummary />

                  <Box>
                    <Button color='secondary' className='circular-btn' fullWidth sx={{
                      my: 2
                    }}>Confirm order</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
        </Grid>
        
    </ShopLayout>
  )
}

export default SummaryPage;
