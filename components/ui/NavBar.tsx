import { useMemo, useContext, useState } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

import { UiContext } from '../../context';


export const NavBar = () => {

  const { asPath, push } = useRouter();

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

  const [searchTerm, setSearchTerm] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length == 0) return;

    navigateTo(`/search/${searchTerm}`);
  }

  const navigateTo = (url: string) => {
    toogleSideMenu();
    push(url);
  };

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

             {/* desktop screens */}
            {
                searchVisible 
                ? 
                <Input
                   autoFocus
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                   type='text'
                   placeholder="Search..."
                   endAdornment={
                       <InputAdornment position="end">
                           <IconButton
                               onClick={() => setSearchVisible(false)}
                           >
                               <ClearOutlined />
                           </IconButton>
                       </InputAdornment>
                   }
               />
               : 
                <IconButton 
                    onClick={() => setSearchVisible(true)}>
                    <SearchOutlined />
                </IconButton>
            }

            {/* small screens */}

            <IconButton className='fadeIn' sx={{
                display: { xs: 'block', sm: 'none' },
            }}
                onClick={() => toogleSideMenu()}
            >
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
