import type { NextPage } from 'next'
import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks/';
import { Loading } from '../components/ui/';

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products');

  return (
    <ShopLayout title={'Teslo Home'} pageDescription={'Find the best products ever.'}>
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

export default HomePage;
