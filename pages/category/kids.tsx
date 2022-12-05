import type { NextPage } from 'next'
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { Loading } from '../../components/ui';

const KidsPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout title={'Teslo Kids'} pageDescription={'Find the best products ever for kids.'}>
      <Typography variant='h1' component='h1'>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All products</Typography>
      {
        isLoading
        ? <Loading />
        : <ProductList products={products}/>
      }     
    </ShopLayout>
  )
}

export default KidsPage;
