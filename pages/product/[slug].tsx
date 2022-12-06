import { Grid, Box, Typography, Button } from '@mui/material';
import { NextPage } from 'next';
// import { useRouter } from 'next/router';
import { ShopLayout } from '../../components/layouts';
import { ProductSelectorSize, ProductSlideshow } from '../../components/products';
import { ItemCounter } from '../../components/ui';
// import { useProducts } from '../../hooks/useProducts';
import { IProduct } from '../../interfaces/products';
import { getProductBySlug, getProductsSlugs } from '../../database';

interface Props {
    product: IProduct,
}

const ProductPage:NextPage<Props> = ({ product }) => {

//   const router = useRouter();
//   const slug = router.query['slug'] || '';
//   const { products: product, isLoading } = useProducts(`/products?slug=${slug}`);

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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// import { GetServerSideProps } from 'next'
// import { getProduct, getProductBySlug, getProductsSlugs } from '../../database/products/get';

// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//     const product = await getProduct(ctx.query['slug'] as string);

//     if (!product) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             }
//         }
//     }
    
//     return {
//         props: {
//             product,
//         },
//     }
// }

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
import { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await getProductsSlugs();

    return {
        paths: products.map((product) => {
            return {
                params: {
                    slug: product.slug,
                }
            }
        }),
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const slug = ctx.params as { slug: string };

    const product = await getProductBySlug(slug.slug);

    if (!product) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            product,
        },
        revalidate: 60 * 60 * 24,
    }
}

export default ProductPage;
