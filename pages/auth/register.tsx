import NextLink from 'next/link';
import { Box, Grid, TextField, Typography, Button, Link } from '@mui/material';
import AuthLayout from '../../components/layouts/AuthLayout';

const RegisterPage = () => {
  return (
    <AuthLayout title='Sign up'>
        <Box sx={{ width: 350, padding: '10 20 px' }}>
            <Grid container>
                <Grid item xs={12} mb={3}>
                    <Typography variant='h1' component='h1'>Sign up</Typography>
                </Grid>

                <Grid item xs={12} my={2}>
                    <TextField 
                        label='Fullname'
                        variant='filled'
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} my={2}>
                    <TextField 
                        label='Email'
                        type='email'
                        variant='filled'
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} my={2}>
                    <TextField 
                        label='Password'
                        type='password'
                        variant='filled'
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} my={2}>
                    <Button
                        color='secondary'
                        className='circular-btn'
                        fullWidth
                    >
                        Sign up
                    </Button>
                </Grid>

                <Grid item xs={12} my={2} textAlign='end'>
                    <NextLink href='/auth/login' passHref>
                        <Link>
                            Login
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default RegisterPage;