import { useContext, useState, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"

import { UiContext } from '../../context';
import { AuthContext } from '../../context/auth/AuthContext';
;

export const SideMenu = () => {
  const { isMenuOpen, toogleSideMenu }  = useContext(UiContext);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const isAdmin = useMemo(() => isLoggedIn && user?.role === 'admin', [isLoggedIn,user?.role])

  const onSearchTerm = () => {
    if (searchTerm.trim().length == 0) return;

    navigateTo(`/search/${searchTerm}`);
  }

  const navigateTo = (url: string) => {
    toogleSideMenu();
    router.push(url);
  };

  const onLogout = () => {
    logout();
  }
   
  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={() => toogleSideMenu()}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            <List>
                <ListItem>
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
                                    onClick={() => onSearchTerm()}
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                {isLoggedIn && <ListItem button>
                    <ListItemIcon>
                        <AccountCircleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Profile'} />
                </ListItem>}

                {isLoggedIn && <ListItem button>
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'My Orders'} />
                </ListItem>}


                <ListItem 
                button 
                onClick={() => navigateTo('/category/men')}
                sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Men'} />
                </ListItem>

                <ListItem 
                button
                onClick={() => navigateTo('/category/women')}
                sx={{ display: { xs: '', sm: 'none' } }}>
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Women'} />
                </ListItem>

                <ListItem 
                    button 
                    sx={{ display: { xs: '', sm: 'none' } }}
                    onClick={() => navigateTo('/category/kids')}
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Kids'} />
                </ListItem>

                {!isLoggedIn && <ListItem button onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
                    <ListItemIcon>
                        <VpnKeyOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Login'} />
                </ListItem>}

                {isLoggedIn && <ListItem button onClick={() => onLogout()}>
                    <ListItemIcon>
                        <LoginOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} />
                </ListItem>}

                {isAdmin &&
                <>
                    {/* Admin */}
                    <Divider />
                    <ListSubheader>Admin Panel</ListSubheader>

                    <ListItem button>
                        <ListItemIcon>
                            <CategoryOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Products'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Orders'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AdminPanelSettings/>
                        </ListItemIcon>
                        <ListItemText primary={'Users'} />
                    </ListItem>
                </>
                }
            </List>
        </Box>
    </Drawer>
  )
}