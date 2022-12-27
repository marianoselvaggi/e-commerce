import type { NextPage, GetServerSideProps } from 'next';
import { Typography } from '@mui/material';

import { getProductByTerm, getProductsByGender } from '../../database';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { IProduct } from '../../interfaces/products';
import { Box } from '@mui/system';

interface Props {
  products: IProduct[],
  foundProducts: boolean;
  search: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, search }) => {
  
  return (
    <ShopLayout title={'Teslo Search'} pageDescription={'Find the best products ever.'}>
      <Typography variant='h1' component='h1'>Search</Typography>
      {
        foundProducts
        ? <Typography variant='h2' textTransform='capitalize'>Products found for { search }</Typography>
        : <Box display='flex' my={2}>
            <Typography variant='h2'>Products not found</Typography>
            <Typography variant='h2' color='secondary' textTransform='capitalize' ml={2}>{ search }</Typography>
        </Box>
      }
      <ProductList products={products}/>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { search = '' } = params as { search: string; };
  
  if (search.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      }
    }
  }

  let products = await getProductByTerm(search);
  const foundProducts = products.length > 0;
  // TODO: return other products
  if (!foundProducts) {
    products = await getProductsByGender('men');
  }

  return {
    props: {
      products,
      foundProducts,
      search,
    }
  }
}

export default SearchPage;
