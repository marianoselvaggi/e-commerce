import type { NextPage } from 'next'
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { Loading } from '../../components/ui';

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout title={'Teslo women'} pageDescription={'Find the best products ever for women.'}>
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

export default WomenPage;
