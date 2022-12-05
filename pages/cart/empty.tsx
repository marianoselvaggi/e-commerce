import NextLink from 'next/link';
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Typography,Link } from "@mui/material";
import { ShopLayout } from "../../components/layouts";

const EmptyPage = () => {
  return (
    <ShopLayout title='Empty cart' pageDescription='There are no products inside the cart.'>
        <Box 
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'
            flexDirection={{
                xs: 'column',
                sm: 'row'
            }}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box display='flex' flexDirection='column'>
                <Typography>The cart is empty.</Typography>
                <NextLink href='/' passHref>
                    <Link>
                        Back to home
                    </Link>
                </NextLink>
            </Box>
        </Box>
    </ShopLayout>
  )
};

export default EmptyPage;
