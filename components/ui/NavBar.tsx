import { useMemo, useContext } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

import { UiContext } from '../../context';


export const NavBar = () => {

  const { asPath } = useRouter();

  const menuSelected = useMemo(() => {
    if (asPath.includes('women')) {
        return 'women';
    } else if (asPath.includes('men')) {
        return 'men';
    } else if (asPath.includes('kid')) {
        return 'kid';
    } else {
        return '';
    }
  }, [asPath]);


  const { toogleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' align='center'>
                    <Typography variant='h6'>Teslo |</Typography>
                    <Typography sx={{ ml: 0.5}}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1} />

            <Box sx={{
                display: { xs: 'none', sm: 'block' },
            }}>
                <NextLink href='/category/men' passHref>
                    <Link>
                        <Button 
                            color={menuSelected === 'men' ? 'secondary' : 'info'}
                        >Men</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/women' passHref>
                    <Link>
                        <Button
                            color={menuSelected === 'women' ? 'secondary' : 'info'}
                        >Women</Button>
                    </Link>
                </NextLink>
                <NextLink href='/category/kids' passHref>
                    <Link>
                        <Button
                            color={menuSelected === 'kid' ? 'secondary' : 'info'}
                        >Kids</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={1} />

            <IconButton>
                <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref>
                <Link>
                <IconButton>
                    <Badge badgeContent={2} color='secondary'>
                        <ShoppingCartOutlined />
                    </Badge>
                </IconButton>
                </Link>
            </NextLink>

            <Button
                onClick={() => toogleSideMenu()}
            >Menu</Button>

        </Toolbar>
    </AppBar>
  )
}
